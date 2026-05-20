# Agent integrations

One kit directory + minimal repo-root stubs.

## Architecture

```
repo-root/
  index.html, solutions/, css/     ← client site
  AGENTS.md, CLAUDE.md, Makefile   ← thin pointers
  .cursor/skills ──┐
  .claude/skills ──┼──► .wireframe-kit/skills/
  .agents/skills ──┘

.wireframe-kit/
  AI-INSTRUCTIONS.md               ← canonical procedures
  config/  scripts/  blocks/  content/  skills/
```

After clone: `make link-skills` (from repo root).

## Agent Skills standard

[Agent Skills](https://agentskills.io/) — same `SKILL.md` in `.wireframe-kit/skills/`, symlinked for each tool.

| Tool | Project path | Points to |
|------|--------------|-----------|
| Cursor | `.cursor/skills` | `.wireframe-kit/skills` |
| Claude Code | `.claude/skills` | `.wireframe-kit/skills` |
| OpenClaw / Hermes | `.agents/skills` | `.wireframe-kit/skills` |

## Entry points

| Tool | File |
|------|------|
| Cursor / generic | `AGENTS.md` |
| Claude Code | `CLAUDE.md` |
| Copilot | `.github/copilot-instructions.md` |
| All | `.wireframe-kit/AI-INSTRUCTIONS.md` |

## New client

```bash
cp -R .wireframe-kit/ $NEW_REPO/
cp AGENTS.md CLAUDE.md Makefile $NEW_REPO/
cp -R .github/copilot-instructions.md $NEW_REPO/.github/
cd $NEW_REPO && make link-skills
```

## Commands

```bash
make parse-copy
make sync
make link-skills
```
