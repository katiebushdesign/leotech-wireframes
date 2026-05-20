# Assembling pages (agents)

How to turn `content/pages/*.json` into repo-root HTML **without** custom build scripts.

## Default workflow

1. `make parse-copy` — structured JSON per page (including `items` for vertical hub rows).
2. For each page in `site-map.yaml`, open or create the HTML file at `path`.
3. Per section: pick block ID from [block-mapping.md](./block-mapping.md).
4. Copy markup from `blocks/<id>.html`, replace `{{placeholders}}`, expand `<!-- repeat -->` for lists.
5. `make validate-blocks` · `make sync` (if nav changed).

## Do not

| Avoid | Do instead |
|-------|------------|
| New `build-pages.py` / `build-html.py` at repo root | Kit scripts live in `.wireframe-kit/scripts/` only; extend `parse-copy-docx.py` if parsing is wrong |
| Regex over full `raw` for vertical cards | Use `section.items` from JSON |
| Duplicating `heading` / `sub` inside the card grid | `topic-block`: H2 + sub once, then cards from `items` |

If you need bulk HTML generation, propose an **optional** script under `.wireframe-kit/scripts/` in a PR — do not bypass blocks or the parser.

## Verticals page (`topic-block`)

Copy doc rows: Corporate, Hospitality, Retail, etc. Parser emits:

```json
{
  "label": "**Corporate**",
  "heading": "LED for the environments that represent the business.",
  "sub": "Boardrooms, conference rooms…",
  "items": [
    { "title": "Conferencing system integration", "body": "LED systems specified…" },
    { "title": "Content for the corporate audience", "body": "Brand-led motion design…" },
    { "title": "Quiet, continuous operation", "body": "Hardware engineered…" }
  ]
}
```

Fill `blocks/topic-block.html`:

- `{{heading}}` ← `heading`
- `{{sub}}` ← `sub` (omit sub paragraph if empty)
- Repeat `<!-- repeat:cards -->` for each `items[]` entry
- Alternate `tone`: white / grey per section index
- Set `anchor_id` when the page uses in-page anchors (e.g. `corporate`, `hospitality`)

## Checklist before preview

- [ ] No section headline duplicated in the first card
- [ ] Card count matches `items.length`
- [ ] Team notes stripped ([notes-and-cues.md](./notes-and-cues.md))
- [ ] `make validate-blocks` passes
