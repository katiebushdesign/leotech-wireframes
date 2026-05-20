# Copy doc → block mapping

Infer block from **column A label** + **shape of column B**. Canonical definitions: [`blocks/registry.json`](blocks/registry.json).

Normalize labels: lowercase; strip `kill eyebrow`, `note to…`, `kbd team:` from label text.

## Label → block

| Column A (contains) | Block ID |
|---------------------|----------|
| hero (homepage / first table on index) | `hero-landing` |
| hero, overview (inner page) | `hero-page` |
| key questions | `section-qa` |
| who we serve | `cards-grid-linked` |
| how we work, services, partner, why us | `cards-grid` |
| what we build, what we provide, what's in every system | `cards-grid-media` (note: photos) else `cards-grid` |
| turnkey, hardware, named section + bullets | `cards-grid` |
| partner tiers, tiers | `tiers` |
| cta, cta band | `cta-band` |
| footer (page bottom row) | `cta-band` |
| contact, get in touch | `split-content` |
| verticals / industry names (stacked hub) | `topic-block` (repeat per row) |

## Shape fallback

| Shape in column B | Block |
|-----------------|--------|
| First section: short title + long prose + links | `hero-page` (merge meta row per notes) |
| H2 + bullets, titles end with `?` | `section-qa` |
| H2 + sub + bullets with `→` links | `cards-grid-linked` |
| H2 + bullets (bold title) | `cards-grid` or `cards-grid-media` by count/note |
| 3 tier names + feature lists | `tiers` |
| Short title + sub + one CTA | `cta-band` |

## Parameters (agent sets when filling template)

| Block | Common params |
|-------|----------------|
| `cards-grid` | `tone`: white/grey (alternate by section index), `columns`: 3 or 4, `card_class`: `card` or `card-grey` |
| `cards-grid-media` | `columns`: 3, `tone`: white/grey |
| `cards-grid-linked` | `columns`: 3, `inline_cta` if catchall copy at end of row |
| `topic-block` | `tone`: alternate white/grey, `anchor_id` optional |

## Meta rows

Column A is only a note (“do not fold into hero”) → apply to adjacent block; do not render as its own section. See [notes-and-cues.md](./notes-and-cues.md).

## Shell

Not from copy doc: nav, breadcrumb crumbs (from `config/site-map.yaml`), site footer, scripts.
