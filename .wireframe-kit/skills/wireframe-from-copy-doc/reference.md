# Parsed page JSON shape (from parse-copy-docx.py)

## Page file: `content/pages/solutions-high-impact.json`

```json
{
  "title": "SOLUTIONS: High Impact Installations",
  "slug": "solutions/high-impact",
  "path": "solutions/high-impact.html",
  "sections": [
    {
      "label": "Hero",
      "label_notes": [],
      "meta_row": false,
      "heading": "LED projects that define the space they live in",
      "paragraphs": [],
      "items": [],
      "ctas": []
    },
    {
      "label": "Note, do not fold this into the hero",
      "meta_row": true,
      "instruction": "do not fold into hero",
      "paragraphs": ["Some installations call for more than..."],
      "ctas": [{ "label": "Talk to our team →", "href": "../company/contact.html" }]
    },
    {
      "label": "What we build",
      "heading": "Every environment, every form factor.",
      "items": [
        { "title": "Curved and architectural LED", "body": "Curved, wrapped..." }
      ],
      "content_notes": ["these should be photos, not just boxes with copy"]
    }
  ]
}
```

## Section list item (from docx bullet + bold)

```json
{ "title": "Define the vision", "body": "212Visual works with the lead firm..." }
```

## CTA (from hyperlink in cell)

```json
{ "label": "Start a conversation →", "href": "../become-a-partner.html" }
```

## Nav: `content/nav/mega-menus.json`

Mega menu tables only — structure varies; used for manual or future nav sync. Do not merge into page body JSON.
