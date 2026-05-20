#!/usr/bin/env bash
# Create katiebushdesign/{clientname}-wireframes, set origin, push main, enable GitHub Pages.
set -euo pipefail

ORG="${GITHUB_ORG:-katiebushdesign}"
BRANCH="${GITHUB_PAGES_BRANCH:-main}"
PAGES_PATH="${GITHUB_PAGES_PATH:-/}"
REPO_SUFFIX="wireframes"

usage() {
  cat <<'EOF'
Usage: setup-github-repo.sh --slug <client-slug> [options]

  --slug <name>     Client name slug → repo <name>-wireframes (e.g. 212-visual)
  --name <name>     Human client name for description (default: slug)
  --dry-run         Print actions only
  --yes             Skip confirmation prompt
  -h, --help        This help

Requires: gh CLI authenticated with permission to create repos in katiebushdesign.

Preview URL: https://katiebushdesign.github.io/<name>-wireframes/
EOF
}

slugify() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g'
}

SLUG=""
CLIENT_NAME=""
DRY_RUN=0
ASSUME_YES=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --slug) SLUG="$2"; shift 2 ;;
    --name) CLIENT_NAME="$2"; shift 2 ;;
    --dry-run) DRY_RUN=1; shift ;;
    --yes) ASSUME_YES=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 1 ;;
  esac
done

if [[ -z "$SLUG" ]]; then
  echo "error: --slug is required" >&2
  usage >&2
  exit 1
fi

SLUG="$(slugify "$SLUG")"
if [[ -z "$SLUG" ]]; then
  echo "error: slug is empty after normalization" >&2
  exit 1
fi

REPO_NAME="${SLUG}-${REPO_SUFFIX}"
FULL_REPO="${ORG}/${REPO_NAME}"
PREVIEW_URL="https://${ORG}.github.io/${REPO_NAME}/"

if [[ -z "$CLIENT_NAME" ]]; then
  CLIENT_NAME="$SLUG"
fi

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$REPO_ROOT"

run() {
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[dry-run] $*"
  else
    "$@"
  fi
}

echo "Organization:  $ORG"
echo "Repository:    $FULL_REPO"
echo "Pages branch:  $BRANCH (path: $PAGES_PATH)"
echo "Preview URL:   $PREVIEW_URL"
echo "Working dir:   $REPO_ROOT"
echo

if [[ "$ASSUME_YES" -ne 1 && "$DRY_RUN" -ne 1 ]]; then
  read -r -p "Create/update remote and enable GitHub Pages? [y/N] " ans
  case "$ans" in
    [yY]|[yY][eE][sS]) ;;
    *) echo "Aborted."; exit 0 ;;
  esac
fi

if ! command -v gh >/dev/null 2>&1; then
  echo "error: gh CLI not found. Install: https://cli.github.com/" >&2
  exit 1
fi

if [[ "$DRY_RUN" -ne 1 ]]; then
  gh auth status >/dev/null 2>&1 || {
    echo "error: gh not authenticated. Run: gh auth login" >&2
    exit 1
  }
fi

if [[ ! -d .git ]]; then
  echo "Initializing git repository..."
  run git init -b "$BRANCH"
fi

if ! git rev-parse HEAD >/dev/null 2>&1; then
  echo "error: no commits yet. Ask the user to approve an initial commit, then re-run." >&2
  exit 1
fi

if gh repo view "$FULL_REPO" >/dev/null 2>&1; then
  echo "Repository $FULL_REPO already exists."
else
  echo "Creating public repository $FULL_REPO ..."
  run gh repo create "$FULL_REPO" \
    --public \
    --description "Visual wireframes — ${CLIENT_NAME}"
fi

current_origin="$(git remote get-url origin 2>/dev/null || true)"
target_origin="https://github.com/${FULL_REPO}.git"

if [[ -z "$current_origin" ]]; then
  run git remote add origin "$target_origin"
elif [[ "$current_origin" != "$target_origin" ]]; then
  echo "Updating origin: $current_origin -> $target_origin"
  run git remote set-url origin "$target_origin"
fi

echo "Pushing $BRANCH to origin..."
if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "[dry-run] git push -u origin $BRANCH"
else
  git push -u origin "$BRANCH" 2>/dev/null || git push -u origin HEAD:"$BRANCH"
fi

pages_enabled() {
  gh api "repos/${FULL_REPO}/pages" >/dev/null 2>&1
}

if pages_enabled; then
  echo "GitHub Pages already enabled for $FULL_REPO"
else
  echo "Enabling GitHub Pages (legacy, $BRANCH @ $PAGES_PATH)..."
  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[dry-run] gh api POST repos/${FULL_REPO}/pages build_type=legacy branch=$BRANCH path=$PAGES_PATH"
  else
    gh api --method POST "repos/${FULL_REPO}/pages" \
      -f build_type=legacy \
      -f "source[branch]=$BRANCH" \
      -f "source[path]=$PAGES_PATH"
  fi
fi

CONFIG="$REPO_ROOT/.wireframe-kit/config/client.yaml"
if [[ -f "$CONFIG" && "$DRY_RUN" -ne 1 ]]; then
  python3 - "$CONFIG" "$ORG" "$REPO_NAME" "$PREVIEW_URL" "$CLIENT_NAME" <<'PY'
import re, sys
path, org, repo, preview, name = sys.argv[1:6]
text = open(path).read()

def set_key(key, val, body):
    pat = rf"^({re.escape(key)}:).*"
    repl = rf"\1 {val}"
    if re.search(pat, body, re.M):
        return re.sub(pat, repl, body, count=1, flags=re.M)
    return body.rstrip() + f"\n{key}: {val}\n"

for k, v in [
    ("client_name", name),
    ("github_org", org),
    ("github_repo", repo),
    ("preview_base_url", preview),
]:
    text = set_key(k, v, text)
open(path, "w").write(text)
print(f"Updated {path}")
PY
fi

echo
echo "Done."
echo "  Repo:    https://github.com/${FULL_REPO}"
echo "  Preview: ${PREVIEW_URL}"
echo "  Pages may take 1–3 minutes after the first push."
