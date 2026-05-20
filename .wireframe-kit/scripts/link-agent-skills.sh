#!/usr/bin/env bash
# Link .wireframe-kit/skills into tool-specific discovery paths.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
KIT_SKILLS="$REPO_ROOT/.wireframe-kit/skills"
# Relative from .cursor/skills (etc.) → repo-root/.wireframe-kit/skills
SKILLS_REL="../.wireframe-kit/skills"

if [[ ! -d "$KIT_SKILLS" ]]; then
  echo "Missing $KIT_SKILLS" >&2
  exit 1
fi

link_dir() {
  local target="$1"
  local parent
  parent="$(dirname "$target")"
  mkdir -p "$parent"
  if [[ -e "$target" && ! -L "$target" ]]; then
    echo "Refusing to replace non-symlink: $target" >&2
    exit 1
  fi
  rm -f "$target"
  ln -sfn "$SKILLS_REL" "$target"
  echo "linked $target -> $SKILLS_REL"
}

link_dir "$REPO_ROOT/.agents/skills"
link_dir "$REPO_ROOT/.cursor/skills"
link_dir "$REPO_ROOT/.claude/skills"

echo "Done. Canonical: $KIT_SKILLS"
