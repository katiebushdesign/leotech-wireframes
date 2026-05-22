# Copy pipeline output (committed in client wireframe repos)

This folder holds **parser output** from `make parse-copy`. In **client** repos (e.g. `leotech-wireframes`), commit `pages/` and `nav/` so anyone cloning the repo has the same structured copy without re-exporting the Google Doc.

| Path | Git in client repos |
|------|---------------------|
| `source/*.docx` | Ignored — export from Google Doc locally when refreshing copy |
| `pages/*.json` | **Tracked** — one JSON file per copy-doc page table |
| `nav/*.json` | **Tracked** — mega menu tables from the doc (if any) |

After copy doc changes: export `.docx` to `source/`, run `make parse-copy`, commit updated JSON, then update HTML.
