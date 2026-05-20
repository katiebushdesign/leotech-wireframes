# AI instructions (canonical)

**Agent-agnostic.** Root stubs (`AGENTS.md`, `CLAUDE.md`) and skills in `.wireframe-kit/skills/` point here.

Kit docs: [README.md](./README.md) · [workflow.md](./workflow.md) · [copy-doc-format.md](./copy-doc-format.md)

---

## New session: create wireframe

If the user wants to **start or onboard** a wireframe project (no prior context), load skill **`create-wireframe`** first. It defines intake questions and the execution order below. Do not skip intake.

**Order:** `make link-skills` → config (`client.yaml`, `site-map.yaml`) → GitHub repo + Pages ([github-setup.md](./github-setup.md), `make setup-github`) → `make parse-copy` (if docx) → build HTML → `make validate-blocks` → `make sync` (if applicable) → **`make serve`** → push.

**KBD GitHub:** `katiebushdesign/{clientname}-wireframes` → `https://katiebushdesign.github.io/{clientname}-wireframes/`

---

## Repository role

HTML marketing wireframes at **repo root**; this kit directory holds workflow, config, and generated JSON.

Copy: **Google Doc** (one table per page). Layout: HTML + optional `.wireframe-kit/blocks/` templates.

**Config:** `.wireframe-kit/config/client.yaml`, `.wireframe-kit/config/site-map.yaml`

**Do not commit** unless the user explicitly asks.

---

## Commands

```bash
make parse-copy    # .wireframe-kit/content/pages/*.json
make sync          # nav + footer on site HTML
make link-skills   # symlink skills for Cursor / Claude / OpenClaw
make setup-github  # SLUG=clientname — katiebushdesign repo + Pages (see github-setup.md)
make serve         # local preview http://localhost:8765/ (background; make serve-stop)
```

---

## Task: Apply copy from doc

### Inputs

- `.docx` export → `python3 .wireframe-kit/scripts/parse-copy-docx.py <file.docx>`
- Or existing `.wireframe-kit/content/pages/*.json`
- HTML paths from `.wireframe-kit/config/site-map.yaml`

### Rules

1. **Docx or JSON only** — not plain text export.
2. Map sections via [block-mapping.md](./block-mapping.md); fill `blocks/*.html` per [registry.json](blocks/registry.json).
3. Column A = section intent; column B = publishable copy.
4. Strip **team notes** per [notes-and-cues.md](./notes-and-cues.md).
5. Card count = bullets in column B (bold = title).
6. **Revision** = patch repo-root HTML. **Greenfield** = assemble from blocks.

### Per-page algorithm

1. Match table title → `site-map.yaml` → path under repo root.
2. Per section row: label + content; handle meta rows.
3. Map → block; apply notes.
4. `make sync` if nav/footer IA changed.

### Response

Pages touched, section→block map, notes applied/flagged, scripts run.

---

## Task: HTML blocks / structure

1. Read `blocks/registry.json` and the matching `blocks/<id>.html`.
2. Replace `{{placeholders}}`; expand `<!-- repeat -->` sections per list length.
3. See [block-mapping.md](./block-mapping.md). CSS: `css/style.css` at repo root.

Shell: nav → breadcrumb → sections → `cta-band` → footer. Use `../` one level down from root.

**Do not** invent new section DOM; add a block file + registry entry if a layout is missing.

**Styling:** Only classes from `css/style.css`. Resolve all `{{placeholders}}` to real class names (see `blocks/registry.json` → `resolved_classes`). Run `make validate-blocks` after assembly.

**Do not** invent frameworks or duplicate nav by hand.

---

## JSON shape

See `.wireframe-kit/skills/wireframe-from-copy-doc/reference.md`.

---

## Tool entry points

| Type | Location |
|------|----------|
| Procedures | `.wireframe-kit/AI-INSTRUCTIONS.md` |
| Skills | `.wireframe-kit/skills/*/SKILL.md` (start: `create-wireframe`) |
| Stubs | repo root `AGENTS.md`, `CLAUDE.md` |

[agent-integrations.md](./agent-integrations.md)
