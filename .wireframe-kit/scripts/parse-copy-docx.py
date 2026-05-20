#!/usr/bin/env python3
"""Parse KBD copy doc .docx export into content/pages/*.json and content/nav/."""
from __future__ import annotations

import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

KIT_ROOT = Path(__file__).resolve().parent.parent
REPO_ROOT = KIT_ROOT.parent
NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
NOTE_RE = re.compile(
    r"^\s*(note\b|note to\b|\(note\b|kill\b|kbd team\b)",
    re.I,
)
MEGA_RE = re.compile(r"MEGA\s*MENU", re.I)


def cell_text(cell: ET.Element) -> str:
    parts: list[str] = []
    for p in cell.findall(".//w:p", NS):
        runs = []
        for r in p.findall(".//w:r", NS):
            t = "".join(x.text or "" for x in r.findall("w:t", NS))
            if not t:
                continue
            if r.find("w:rPr/w:b", NS) is not None:
                runs.append(f"**{t}**")
            else:
                runs.append(t)
        line = "".join(runs).strip()
        if line:
            parts.append(line)
    return "\n".join(parts)


def cell_paragraphs(cell: ET.Element) -> list[dict]:
    """Paragraphs and list items with optional bold title prefix."""
    out: list[dict] = []
    for p in cell.findall(".//w:p", NS):
        is_list = p.find(".//w:numPr", NS) is not None
        title_parts: list[str] = []
        body_parts: list[str] = []
        after_bold = False
        for r in p.findall(".//w:r", NS):
            t = "".join(x.text or "" for x in r.findall("w:t", NS))
            if not t:
                continue
            bold = r.find("w:rPr/w:b", NS) is not None
            if bold and not after_bold:
                title_parts.append(t)
            else:
                after_bold = True
                body_parts.append(t)
        title = "".join(title_parts).strip()
        body = "".join(body_parts).strip()
        text = (title + " " + body).strip() if title and not body else title or body
        if not text:
            continue
        if is_list and title:
            out.append({"type": "item", "title": title, "body": body})
        else:
            out.append({"type": "p", "text": text, "is_list": is_list})
    return out


def clean_title(title: str) -> str:
    return re.sub(r"\*+", "", title).strip()


def slugify(title: str) -> str:
    s = clean_title(title).lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s[:80] or "page"


def load_site_map() -> dict[str, str]:
    path = KIT_ROOT / "config" / "site-map.yaml"
    if not path.exists():
        return {}
    mapping: dict[str, str] = {}
    text = path.read_text()
    try:
        import yaml  # type: ignore

        data = yaml.safe_load(text) or {}
        for entry in data.get("pages", []):
            mapping[entry["title"].lower()] = entry["path"]
        return mapping
    except ImportError:
        pass
    # Fallback: `- title: Foo` / `path: bar.html` pairs without PyYAML
    titles: list[str] = []
    for line in text.splitlines():
        m = re.match(r'\s*-\s*title:\s*(.+)$', line)
        if m:
            titles.append(m.group(1).strip().strip('"').lower())
            continue
        m = re.match(r"\s*path:\s*(.+)$", line)
        if m and titles:
            mapping[titles.pop(0)] = m.group(1).strip()
    return mapping


def match_path(title: str, site_map: dict[str, str]) -> str | None:
    key = title.strip().lower()
    if key in site_map:
        return site_map[key]
    for t, p in site_map.items():
        if key in t or t in key:
            return p
    return None


def parse_section_cell(text: str, paragraphs: list[dict]) -> dict:
    items = [x for x in paragraphs if x["type"] == "item"]
    plain = [x["text"] for x in paragraphs if x["type"] == "p" and not x.get("is_list")]
    content_notes = [
        m.group(0)
        for line in text.splitlines()
        for m in [re.search(r"(?i)(note to\b.*?$|kill eyebrow.*?$|\(note to team[^)]*\))", line)]
        if m
    ]
    heading = plain[0] if plain else ""
    body_paras = plain[1:] if len(plain) > 1 else []
    return {
        "heading": heading,
        "paragraphs": body_paras,
        "items": items,
        "content_notes": content_notes,
        "raw": text,
    }


def parse_table(tbl: ET.Element, site_map: dict[str, str]) -> dict | None:
    rows = tbl.findall("w:tr", NS)
    if not rows:
        return None
    r0_cells = rows[0].findall("w:tc", NS)
    title = clean_title(cell_text(r0_cells[0]).strip())
    if not title:
        return None
    if MEGA_RE.search(title):
        return {"type": "mega_menu", "title": title, "rows": len(rows)}

    # Page table: row0 merged title, then 2-col sections
    if len(r0_cells) > 1:
        return None

    sections = []
    for row in rows[1:]:
        cells = row.findall("w:tc", NS)
        if len(cells) < 2:
            continue
        label = cell_text(cells[0]).strip()
        paras = cell_paragraphs(cells[1])
        content = parse_section_cell(cell_text(cells[1]), paras)
        meta = bool(NOTE_RE.search(label)) and len(label) < 120
        sections.append(
            {
                "label": label,
                "meta_row": meta and not content["items"] and not content["heading"],
                "instruction": label if meta else None,
                **content,
            }
        )

    path = match_path(title, site_map)
    return {
        "type": "page",
        "title": title,
        "slug": slugify(title),
        "path": path,
        "sections": sections,
    }


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: parse-copy-docx.py <path-to.docx>", file=sys.stderr)
        sys.exit(1)

    docx = Path(sys.argv[1])
    if not docx.is_file():
        print(f"File not found: {docx}", file=sys.stderr)
        sys.exit(1)

    site_map = load_site_map()
    pages_dir = KIT_ROOT / "content" / "pages"
    nav_dir = KIT_ROOT / "content" / "nav"
    pages_dir.mkdir(parents=True, exist_ok=True)
    nav_dir.mkdir(parents=True, exist_ok=True)

    z = zipfile.ZipFile(docx)
    root = ET.fromstring(z.read("word/document.xml"))
    body = root.find(".//w:body", NS)
    if body is None:
        sys.exit("No document body")

    pages: list[dict] = []
    megas: list[dict] = []
    for tbl in body.findall("w:tbl", NS):
        parsed = parse_table(tbl, site_map)
        if not parsed:
            continue
        if parsed["type"] == "mega_menu":
            megas.append(parsed)
        else:
            pages.append(parsed)

    for page in pages:
        out = pages_dir / f"{page['slug']}.json"
        out.write_text(json.dumps(page, indent=2) + "\n")
        print(f"page: {page['title']} -> {out.relative_to(KIT_ROOT)}")

    mega_path = nav_dir / "mega-menus.json"
    mega_path.write_text(json.dumps({"menus": megas}, indent=2) + "\n")
    print(f"nav: {len(megas)} mega menu tables -> {mega_path.relative_to(KIT_ROOT)}")


if __name__ == "__main__":
    main()
