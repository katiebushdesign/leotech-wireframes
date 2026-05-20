# Generated content (not client-specific in git)

This folder holds **parser output** from `make parse-copy`. It should be empty in the starter template except `.gitkeep` files.

| Path | Git |
|------|-----|
| `source/*.docx` | Ignored — export from Google Doc here |
| `pages/*.json` | Ignored — generated per client |
| `nav/*.json` | Ignored — generated mega menus |

After cloning the starter, run `make parse-copy` once you have a copy doc. Do not commit 212 (or other client) JSON into `wireframe-kit-starter`.

To clear leftover local files:

```bash
rm -f .wireframe-kit/content/pages/*.json \
      .wireframe-kit/content/nav/*.json \
      .wireframe-kit/content/source/*.docx
```
