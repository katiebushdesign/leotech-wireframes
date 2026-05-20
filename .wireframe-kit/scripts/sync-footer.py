#!/usr/bin/env python3
"""Sync footer link columns across all pages to match header nav."""
from pathlib import Path
import re

KIT_ROOT = Path(__file__).resolve().parent.parent
root = KIT_ROOT.parent  # repo root (HTML pages)

SOLUTIONS = [
    ("solutions/index.html", "Solutions Overview"),
    ("solutions/high-impact.html", "High-impact installations"),
    ("solutions/pre-configured.html", "Pre-configured systems"),
    ("solutions/support.html", "Support & Oversight"),
    ("solutions/content.html", "Content services"),
    ("solutions/sales-enablement.html", "Sales enablement"),
    ("solutions/212care.html", "212Care"),
]

WHO_WE_SERVE = [
    ("who-we-serve/av-integrators.html", "AV Integrators"),
    ("who-we-serve/it-msps.html", "IT & Managed Service Providers"),
    ("who-we-serve/marketing-firms.html", "Marketing & Advertising Firms"),
    ("who-we-serve/design-agencies.html", "Brand & Design Agencies"),
    ("who-we-serve/architects.html", "Architects & Design Firms"),
    ("who-we-serve/engineering-firms.html", "Engineering & Consulting Firms"),
]

PARTNER = [
    ("partner-program/index.html", "Program Overview"),
    ("partner-program/portal.html", "Partner Portal"),
    ("partner-program/academy.html", "Academy Overview"),
    ("partner-program/certifications.html", "Certification Tracks"),
    ("partner-program/index.html#registered", "Registered"),
    ("partner-program/index.html#certified", "Certified"),
    ("partner-program/index.html#elite", "Elite"),
    ("become-a-partner.html", "Become a partner"),
]

VERTICALS = [
    ("verticals/corporate.html", "Corporate"),
    ("verticals/education-healthcare.html", "Education & Healthcare"),
    ("verticals/hospitality.html", "Hospitality"),
    ("verticals/houses-of-worship.html", "Houses of Worship"),
    ("verticals/retail.html", "Retail & Brand Experience"),
    ("verticals/events.html", "Events & Tradeshows"),
]

COMPANY = [
    ("company/about.html", "About 212"),
    ("company/team.html", "People"),
    ("company/careers.html", "Careers"),
    ("company/case-studies.html", "Case Studies"),
    ("verticals/index.html", "Verticals"),
    ("company/contact.html", "Contact Us"),
]

LOGO_COL = (
    '<div><div class="footer-logo" role="img" aria-label="212 Visual"></div>'
    '<div class="footer-tagline">The extra degree in LED. Hardware, content, training, and care: '
    "built for the people who build.</div></div>"
)

FOOTER_INNER_PATTERN = re.compile(
    r'<div class="footer-inner">.*?</div>\s*<div class="footer-bottom">',
    re.DOTALL,
)

ROOT_FILES = {"index.html", "become-a-partner.html"}
SKIP = {"nav.html"}


def col(title: str, links: list, prefix: str) -> str:
    items = "".join(
        f'<a href="{prefix}{href}" class="footer-link">{label}</a>' for href, label in links
    )
    return f'<div><div class="footer-col-title">{title}</div>{items}</div>'


def footer_inner_block(prefix: str = "") -> str:
    return (
        '  <div class="footer-inner">\n    '
        + LOGO_COL
        + col("Solutions", SOLUTIONS, prefix)
        + col("Who we serve", WHO_WE_SERVE, prefix)
        + col("Partner program", PARTNER, prefix)
        + col("Verticals", VERTICALS, prefix)
        + col("Company", COMPANY, prefix)
        + "\n  </div>"
    )


def update_footer_html() -> None:
    path = root / "footer.html"
    text = path.read_text()
    pattern = re.compile(r"<footer class=\"footer\">.*?</footer>", re.DOTALL)
    footer = (
        '<footer class="footer">\n'
        + footer_inner_block("")
        + '\n  <div class="footer-bottom">\n'
        + '    <div class="footer-bottom-text">© 2025 212Visual. All rights reserved.</div>\n'
        + '    <div class="footer-bottom-text">Privacy Policy · Terms of Use</div>\n'
        + "  </div>\n</footer>"
    )
    path.write_text(pattern.sub(footer, text, count=1))


def main() -> None:
    updated = []
    for path in sorted(root.rglob("*.html")):
        if ".wireframe-kit" in path.parts or path.name in SKIP:
            continue
        text = path.read_text()
        if "footer-inner" not in text:
            continue
        rel = path.relative_to(root).as_posix()
        prefix = "../" if "/" in rel and rel not in ROOT_FILES else ""
        replacement = footer_inner_block(prefix) + '\n  <div class="footer-bottom">'
        new_text, n = FOOTER_INNER_PATTERN.subn(replacement, text, count=1)
        if n == 0:
            print(f"skip (no match): {rel}")
            continue
        if new_text != text:
            path.write_text(new_text)
            updated.append(rel)

    update_footer_html()
    print(f"Updated {len(updated)} files")
    for f in updated:
        print(f"  {f}")


if __name__ == "__main__":
    main()
