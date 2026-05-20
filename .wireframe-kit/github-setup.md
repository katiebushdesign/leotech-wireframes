# GitHub repository setup (KBD)

Standard hosting for client wireframe previews.

| Item | Value |
|------|--------|
| Organization | `katiebushdesign` |
| Repo name | `{clientname}-wireframes` |
| Example | `212-visual-wireframes` → https://github.com/katiebushdesign/212-visual-wireframes |
| Preview URL | `https://katiebushdesign.github.io/{clientname}-wireframes/` |
| Pages source | Branch `main`, folder `/` (repo root HTML) |

## Client name (repo slug)

Slugified client name used in the repo (usually matches the project folder name):

- `212-visual` → `212-visual-wireframes`
- `Acme Health` → `acme-health-wireframes`

Confirm with the user before creating the repo.

## Prerequisites

- [GitHub CLI](https://cli.github.com/) (`gh`) logged in with rights to create repos in `katiebushdesign`
- Local repo has at least one commit on `main`
- User has approved creating the remote repo and pushing (do not push without asking)

## Automated setup

From repo root:

```bash
# Preview actions
.wireframe-kit/scripts/setup-github-repo.sh --slug acme --name "Acme Corp" --dry-run

# Create repo, set origin, push main, enable Pages, patch client.yaml
.wireframe-kit/scripts/setup-github-repo.sh --slug acme --name "Acme Corp" --yes
```

Or: `make setup-github SLUG=acme NAME="Acme Corp"`

## Manual equivalent

```bash
SLUG=acme
REPO="${SLUG}-wireframes"
ORG=katiebushdesign

gh repo create "${ORG}/${REPO}" --public --description "Visual wireframes — Acme Corp"
git remote add origin "https://github.com/${ORG}/${REPO}.git"   # or set-url
git push -u origin main

gh api --method POST "repos/${ORG}/${REPO}/pages" \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/
```

Set `.wireframe-kit/config/client.yaml`:

```yaml
github_org: katiebushdesign
github_repo: acme-health-wireframes
preview_base_url: https://katiebushdesign.github.io/acme-health-wireframes/
```

## Existing project

If `origin` already points at the correct `{clientname}-wireframes` repo, only verify Pages is enabled (`gh api repos/katiebushdesign/REPO/pages`) and `preview_base_url` in `client.yaml`.

## New project from starter

1. Clone or copy `wireframe-kit-starter` into a new folder (or use GitHub template).
2. Fill `client.yaml` / `site-map.yaml`.
3. Initial commit (user must approve).
4. Run `setup-github-repo.sh --slug …`.
5. Continue copy parse + HTML build; push again when ready.
