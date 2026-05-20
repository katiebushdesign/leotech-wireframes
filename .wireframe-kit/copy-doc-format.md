# Copy doc format (Google Docs)

Canonical example: link in `.wireframe-kit/config/client.yaml`.

## Document structure

1. **Optional preamble** — project title, mega menu section (plain text or tables).
2. **Mega menu tables** — multi-column grids; row 0 = `SOLUTIONS MEGA MENU`, etc.
3. **Page tables** — one table per wireframe page.

## Page table layout

| Row | Column A | Column B |
|-----|----------|----------|
| 0 (merged) | **Page title** — matches `site-map.yaml` title, e.g. `SOLUTIONS: High Impact Installations` |
| 1…n | Section label | Section content |

### Column A (section label)

Human name for the section. Examples: `Hero`, `What we build`, `Key Questions`, `CTA Band`, `Footer`.

May include **team cues** appended or on their own row:

- `Note to KBD team: …`
- `Kill eyebrow`
- `(note to team, this is the headline)`
- `KBD team: new design structure: 4 cards`

Parser and agent treat these as **meta**, not body copy.

### Column B (content)

- **Hero**: often headline in first paragraph; body/CTAs may be **next row** (see split-hero below).
- **Section heading**: first paragraph(s) before a list.
- **Repeatables**: Google Docs **bulleted lists** — card count = number of bullets (do not label Card 1, Card 2).
- **Card title + body**: use **bold** for title, normal text for description (parser splits on bold runs).
- **CTAs**: short line with **hyperlink**; often ends with `→` or `»`.

### Split hero (common)

| A | B |
|---|---|
| `Hero` | Headline only |
| `Note, do not fold…` / empty | Lead paragraph + CTA links |

Agent merges into one `page-hero` block unless a note says to keep separate sections.

## Mega menu tables

Not page body. Export to `.wireframe-kit/content/nav/mega-menus.json` for `make sync` / manual nav update.

Structure: header row + grid of columns; cells contain title+description (often concatenated in export — parser uses cell boundaries).

## Export requirements

| Format | Use |
|--------|-----|
| **`.docx`** | **Required** for automation — preserves tables, `w:numPr` lists, bold, links |
| `.txt` | Human read only; **do not** use for parsing |
| PDF | Not supported |

## Writer guidelines (paste into doc intro)

1. One **table per page**; page name in the top row.
2. Each **section** = one table row; section name in the left column.
3. Put **features/steps/cards** as a **bullet list** in the right column (bold the card title).
4. Put **buttons** on their own line as a **link** (e.g. `Become a partner →`).
5. Put **internal team notes** in the left column or in italics — we won’t publish them.
6. Don’t worry about layout; we map sections to the wireframe.
