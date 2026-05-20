# Team notes and agent cues

Notes in the copy doc are **first-class**. They are not published HTML; they steer the agent.

## Note locations

| Where | Example | Handling |
|-------|---------|----------|
| Column A only | `HeroKill eyebrow` | Label = `Hero`; strip `Kill eyebrow` from label; record note |
| Column A, whole row | `Note, do not fold this into the hero…` | Meta row: apply rule to **previous** or **next** section |
| Column B, inline | `(note to team, kill eyebrow)` | Strip from HTML; keep in build log |
| Column B, own paragraph | `Note to KBD team: this section is net new` | Strip; triggers **greenfield section** or **replace** behavior |

## Note types

### Structural

- “Do not fold into hero” → two rows become one `page-hero` **or** hero + following `section-prose` — follow literal instruction.
- “New section” / “net new” / “replaces content samples” → don’t assume old HTML; build or replace block.
- “4 cards” / “photos not boxes” → pick block variant + wireframe placeholders; optional comment in HTML.

### Editorial (revision)

- “Kill eyebrow” / “kill the pills” → remove `.hero-tag`, pills, eyebrow elements on that page.
- “combining team & careers” → IA change; update nav + `site-map.yaml`, not copy only.

### Nav / IA

- “Remove this from the mega menu” → update nav config, not page body.
- Mega menu tables → always nav pipeline.

### Design (wireframe stage)

- “should be photos” → keep `img-placeholder` or similar; don’t swap in stock images unless asked.
- “Pair with large image” → use block variant with media column.

## Greenfield vs revision

Same note text can mean different things:

| Note | Greenfield (new page) | Revision (existing HTML) |
|------|------------------------|---------------------------|
| `Kill eyebrow` | Never add eyebrow | Remove eyebrow from DOM |
| `net new` | Add section from blocks | Replace or insert section; flag if block missing |
| `note to team, this is the headline` | Use B text as `h2`, no eyebrow | Change heading level/class; remove eyebrow |
| `do not fold into hero` | Merge rows when assembling | Split/merge DOM to match |

When unsure, prefer **literal reading of the note** over guessing from old HTML.

## Agent output

After a copy pass, briefly list:

- Sections updated
- Notes applied (stripped)
- Ambiguous notes flagged for human review

Optional: write stripped notes to `.wireframe-kit/content/notes/<slug>.md` for audit trail.
