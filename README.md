# HTML wireframe starter

A minimal repo for **client wireframe previews** (GitHub Pages or static host). Copy workflow, blocks, and agent tooling live in [`.wireframe-kit/`](.wireframe-kit/).

## Quick start

```bash
make link-skills      # once — Cursor / Claude / OpenClaw skill symlinks
cp .wireframe-kit/config/client.yaml.example .wireframe-kit/config/client.yaml
# Edit client.yaml + site-map.yaml, add pages under repo root
make validate-blocks  # block classes exist in css/style.css
```

## Layout

| Path | Purpose |
|------|---------|
| `.wireframe-kit/` | Kit: blocks, scripts, skills, copy pipeline, docs |
| `css/style.css` | Default wireframe theme (all block classes) |
| `index.html` | Starter shell — replace with your pages |
| `AGENTS.md` / `CLAUDE.md` | Agent entry points |

## New client from this branch

1. Use this branch as template (GitHub “Use this template” or clone `-b wireframe-kit-starter`).
2. Fill `.wireframe-kit/config/client.yaml` and `site-map.yaml`.
3. Add HTML pages at repo root; assemble sections from `.wireframe-kit/blocks/`.
4. Export copy doc → `make parse-copy` → agent applies JSON to pages.
5. `make setup-github SLUG=212-visual` — repo `katiebushdesign/{clientname}-wireframes` + GitHub Pages on `main`.

## Docs

See [`.wireframe-kit/README.md`](.wireframe-kit/README.md) and [`.wireframe-kit/AI-INSTRUCTIONS.md`](.wireframe-kit/AI-INSTRUCTIONS.md).
