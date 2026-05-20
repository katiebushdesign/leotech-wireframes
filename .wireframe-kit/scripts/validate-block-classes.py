#!/usr/bin/env python3
"""Verify block templates only use CSS classes defined in css/style.css."""
from __future__ import annotations

import re
import sys
from pathlib import Path

KIT_ROOT = Path(__file__).resolve().parent.parent
REPO_ROOT = KIT_ROOT.parent
BLOCKS_DIR = KIT_ROOT / "blocks"
STYLE_CSS = REPO_ROOT / "css" / "style.css"

# Placeholders agents must resolve before publishing HTML
RESOLVED_ALIASES = {
    "section-white": "section-white",
    "section-grey": "section-grey",
    "section-{{tone}}": "section-white",  # either white or grey
    "grid-3": "grid-3",
    "grid-4": "grid-4",
    "grid-{{columns}}": "grid-3",
    "card": "card",
    "card-grey": "card-grey",
    "{{card_class}}": "card",
}
ALLOWED_BTN = frozenset(
    {"btn-red", "btn-outline-white", "btn-outline-dark", "btn-white", "tier-btn", "red"}
)
SKIP_TOKENS = re.compile(r"[{}#/:]|if |repeat:|endif")


def load_css_classes(path: Path) -> set[str]:
    text = path.read_text()
    return set(re.findall(r"\.([a-zA-Z][\w-]*)", text))


def classes_from_attr(value: str) -> list[str]:
    value = re.sub(r"\{\{[^}]+\}\}", " ", value)
    out: list[str] = []
    for c in value.split():
        if not c or SKIP_TOKENS.search(c):
            continue
        if "{" in c or "}" in c or c.endswith("-"):
            continue
        if c in RESOLVED_ALIASES:
            out.append(RESOLVED_ALIASES[c])
        else:
            out.append(c)
    return out


def extract_html_classes(block_path: Path) -> set[str]:
    text = block_path.read_text()
    found: set[str] = set()
    for match in re.finditer(r'class="([^"]*)"', text):
        for cls in classes_from_attr(match.group(1)):
            if cls in ALLOWED_BTN or cls == "red":
                continue
            found.add(cls)
    return found


def main() -> int:
    if not STYLE_CSS.is_file():
        print(f"Missing {STYLE_CSS}", file=sys.stderr)
        return 1

    css_classes = load_css_classes(STYLE_CSS)
    errors: list[str] = []

    for block_file in sorted(BLOCKS_DIR.glob("*.html")):
        used = extract_html_classes(block_file)
        missing = sorted(used - css_classes)
        for cls in missing:
            errors.append(f"{block_file.name}: .{cls} not in css/style.css")

    if errors:
        print("Block class validation FAILED:\n")
        for line in errors:
            print(f"  {line}")
        print(f"\nDefined in style.css: {len(css_classes)} classes")
        print("Fix: add CSS rules or change the block template.")
        return 1

    n = len(list(BLOCKS_DIR.glob("*.html")))
    print(f"OK — {n} blocks; all static classes exist in css/style.css")
    return 0


if __name__ == "__main__":
    sys.exit(main())
