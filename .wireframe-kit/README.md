# Wireframe kit

Everything for **copy doc → HTML wireframe → deploy** lives in this directory. The rest of the repo is the client site (HTML, CSS, assets).

## Layout

```
.wireframe-kit/
  AI-INSTRUCTIONS.md    ← agents: canonical procedures
  README.md             ← you are here
  workflow.md  github-setup.md  copy-doc-format.md  block-mapping.md  notes-and-cues.md
  agent-integrations.md
  config/               client.yaml, site-map.yaml
  skills/               create-wireframe, wireframe-from-copy-doc, wireframe-html-blocks
  scripts/              parse-copy-docx, setup-github-repo, sync-nav, sync-footer, link-agent-skills
  blocks/               section HTML templates (placeholders)
  content/              parser output (pages/*.json, nav/, source/*.docx)
  Makefile
```

## Repo root (minimal)

| File | Purpose |
|------|---------|
| `AGENTS.md` | Pointer for Cursor / generic agents |
| `CLAUDE.md` | Pointer for Claude Code |
| `.github/copilot-instructions.md` | Pointer for Copilot |
| `Makefile` | Delegates to `.wireframe-kit/Makefile` |
| `.cursor/skills` etc. | Symlinks → `.wireframe-kit/skills` |

## Commands (from repo root)

```bash
make link-skills   # once after clone
make parse-copy    # docx → .wireframe-kit/content/pages/
make sync          # nav + footer across site HTML
```

## New client

**Agents:** say *create wireframes* or load `/create-wireframe` — the skill walks through intake then runs the pipeline.

1. Copy the entire `.wireframe-kit/` folder into the new repo.
2. Copy root stubs: `AGENTS.md`, `CLAUDE.md`, `Makefile`, `.github/copilot-instructions.md`.
3. Run `make link-skills`.
4. Fill `.wireframe-kit/config/client.yaml` and `site-map.yaml`.
5. Add site HTML at repo root.

## Agents

Read **`AI-INSTRUCTIONS.md`** first. Tool-specific discovery: [agent-integrations.md](./agent-integrations.md).
