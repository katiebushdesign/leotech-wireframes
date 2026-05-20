# Workflow: copy doc → wireframe → deploy

## Overview

```mermaid
flowchart LR
  A[Google Doc copy] --> B[Export docx]
  B --> C[parse-copy-docx.py]
  C --> D[content/pages JSON]
  D --> E[Agent maps to blocks]
  E --> F[HTML pages]
  F --> G[sync-nav / sync-footer]
  G --> H[GitHub Pages]
  H --> I[Client review + Marker.io]
```

## Phase 1 — Setup (once per client)

1. Create repo from static HTML wireframe base + this kit.
2. Fill `.wireframe-kit/config/client.yaml` (copy doc URL, GitHub Pages base URL).
3. Build `.wireframe-kit/config/site-map.yaml`: map **copy doc table titles** → paths at repo root (`solutions/high-impact.html`).
4. Extract recurring sections into `.wireframe-kit/blocks/*.html` with `{{placeholders}}`.
5. Document any client-only blocks in `block-mapping.md`.

## Phase 2 — Copy doc (writers + strategists)

- One Google Doc; **one table per page** (see [copy-doc-format.md](./copy-doc-format.md)).
- Separate **mega menu tables** at top of doc (or linked doc).
- Writers use normal Docs: bullets, bold, hyperlinks — no markdown, no `Title:` fields.

## Phase 3 — Ingest

1. Export doc as **`.docx`** (Drive API or Download).
2. Save to `.wireframe-kit/content/source/copy.docx` (gitignored if large).
3. Run from repo root: `make parse-copy`
4. Output: `.wireframe-kit/content/pages/<slug>.json` + `.wireframe-kit/content/nav/mega-menus.json`.

## Phase 4 — Build / update HTML (agent)

Load skill **wireframe-from-copy-doc**.

For each page JSON:

1. Resolve slug from `site-map.yaml`.
2. For each section, map label + content shape → block (see [block-mapping.md](./block-mapping.md)).
3. Apply team-note rules ([notes-and-cues.md](./notes-and-cues.md)).
4. If page exists: **patch** copy in place; if greenfield: assemble from `blocks/`.
5. Run `make sync` if nav or IA changed.

## Phase 5 — Review & deploy

1. Push to branch; GitHub Pages preview URL to client.
2. Marker.io (or similar) on preview for pin feedback.
3. Copy changes loop: update Google Doc → re-export → parse → agent patch (structure changes are explicit: new row / new block).

## Greenfield vs revision

| Mode | Copy doc signals | Agent behavior |
|------|------------------|----------------|
| **Greenfield** | New table, empty repo page | Assemble full page from blocks + shell |
| **Revision** | Same table; changed right column | Update text/CTAs/lists in existing HTML |
| **Structural** | New row, new left label, “new section” notes | Add block section; may need new `blocks/*.html` |

Notes in the left or right column apply in **both** modes — they are instructions, not published copy.

## What we do not automate (yet)

- Figma ↔ HTML
- Full CMS
- Auto-deploy on every Google Doc edit (optional later: Drive webhook + CI)
