const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType, WidthType, BorderStyle } = require('docx');
const cheerio = require('cheerio');

// Read and parse HTML files
const pages = [
  { file: 'index.html', title: 'Homepage' },
  { file: 'become-a-partner.html', title: 'Become a Partner' },
  { file: 'company/about.html', title: 'About 212Visual' },
  { file: 'company/team.html', title: 'Our Team' },
  { file: 'company/careers.html', title: 'Careers' },
  { file: 'company/case-studies.html', title: 'Case Studies' },
  { file: 'company/contact.html', title: 'Contact' },
  { file: 'solutions/index.html', title: 'Solutions Overview' },
  { file: 'solutions/high-impact.html', title: 'High-Impact Installations' },
  { file: 'solutions/pre-configured.html', title: 'Pre-configured Systems' },
  { file: 'solutions/support.html', title: 'Support & Oversight' },
  { file: 'solutions/content.html', title: 'Content Services' },
  { file: 'solutions/sales-enablement.html', title: 'Sales Enablement' },
  { file: 'solutions/212care.html', title: '212Care' },
  { file: 'who-we-serve/index.html', title: 'Who We Serve' },
  { file: 'who-we-serve/av-integrators.html', title: 'AV Integrators' },
  { file: 'who-we-serve/it-msps.html', title: 'IT & MSPs' },
  { file: 'who-we-serve/marketing-firms.html', title: 'Marketing Firms' },
  { file: 'who-we-serve/design-agencies.html', title: 'Design Agencies' },
  { file: 'who-we-serve/architects.html', title: 'Architects' },
  { file: 'who-we-serve/engineering-firms.html', title: 'Engineering Firms' },
  { file: 'partner-program/index.html', title: 'Partner Program' },
  { file: 'partner-program/academy.html', title: '212 Academy' },
  { file: 'partner-program/certifications.html', title: 'Certifications' },
  { file: 'partner-program/portal.html', title: 'Partner Portal' },
  { file: 'verticals/index.html', title: 'Verticals Overview' },
  { file: 'verticals/corporate.html', title: 'Corporate' },
  { file: 'verticals/hospitality.html', title: 'Hospitality' },
  { file: 'verticals/retail.html', title: 'Retail & Brand' },
  { file: 'verticals/education-healthcare.html', title: 'Education & Healthcare' },
  { file: 'verticals/houses-of-worship.html', title: 'Houses of Worship' },
  { file: 'verticals/events.html', title: 'Events & Trade Shows' }
];

const docChildren = [];

// Title page
docChildren.push(
  new Paragraph({
    text: '212Visual Site Copy Inventory',
    heading: HeadingLevel.HEADING_1,
    spacing: { after: 120 }
  }),
  new Paragraph({
    text: 'All copy organized by page with CTAs, mega menu items, and content sections',
    spacing: { after: 240 }
  })
);

// Process each page
pages.forEach(page => {
  const filePath = path.join(__dirname, page.file);

  try {
    const html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html);

    // Add page heading
    docChildren.push(
      new Paragraph({
        text: page.title,
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 }
      })
    );

    // Extract hero section
    const heroTag = $('.hero-tag span').text().trim();
    const heroH1 = $('.hero-h1').text().trim();
    const heroSub = $('.hero-sub').text().trim();

    if (heroH1) {
      docChildren.push(
        new Paragraph({
          text: 'HERO',
          bold: true,
          spacing: { before: 120, after: 80 }
        })
      );

      if (heroTag) {
        docChildren.push(
          new Paragraph({
            text: `Tag: ${heroTag}`,
            spacing: { after: 60 }
          })
        );
      }

      docChildren.push(
        new Paragraph({
          text: `Headline: ${heroH1}`,
          spacing: { after: 60 }
        }),
        new Paragraph({
          text: `Subheading: ${heroSub}`,
          spacing: { after: 120 }
        })
      );
    }

    // Extract CTAs
    const ctas = [];
    $('.btn-red, .btn-outline-white, .btn-outline-dark, .btn-white').each((i, el) => {
      const text = $(el).text().trim();
      if (text) ctas.push(text);
    });

    if (ctas.length > 0) {
      docChildren.push(
        new Paragraph({
          text: 'CALLS TO ACTION',
          bold: true,
          spacing: { before: 120, after: 80 }
        })
      );
      ctas.forEach(cta => {
        docChildren.push(
          new Paragraph({
            text: `• ${cta}`,
            spacing: { after: 40 }
          })
        );
      });
      docChildren.push(new Paragraph({ text: '', spacing: { after: 60 } }));
    }

    // Extract mega menu items if on homepage
    if (page.file === 'index.html') {
      const megaItems = [];
      $('.mega-item-title').each((i, el) => {
        const title = $(el).text().trim();
        const desc = $(el).next('.mega-item-desc').text().trim();
        if (title) megaItems.push({ title, desc });
      });

      if (megaItems.length > 0) {
        docChildren.push(
          new Paragraph({
            text: 'MEGA MENU ITEMS',
            bold: true,
            spacing: { before: 120, after: 80 }
          })
        );
        megaItems.forEach(item => {
          docChildren.push(
            new Paragraph({
              text: item.title,
              bold: true,
              spacing: { after: 40 }
            }),
            new Paragraph({
              text: item.desc,
              spacing: { after: 60 }
            })
          );
        });
      }
    }

    // Extract main sections
    const sections = [];
    $('.sec-eyebrow').each((i, el) => {
      const eyebrow = $(el).text().trim();
      const heading = $(el).closest('.sec-header-row').find('.sec-h2, .sec-h2-white').text().trim();
      const subtext = $(el).closest('.sec-header-row').find('.sec-sub, .sec-sub-white').text().trim();

      if (eyebrow || heading) {
        sections.push({ eyebrow, heading, subtext });
      }
    });

    if (sections.length > 0) {
      docChildren.push(
        new Paragraph({
          text: 'CONTENT SECTIONS',
          bold: true,
          spacing: { before: 120, after: 80 }
        })
      );

      sections.forEach(section => {
        if (section.eyebrow) {
          docChildren.push(
            new Paragraph({
              text: section.eyebrow.toUpperCase(),
              italics: true,
              spacing: { after: 40 }
            })
          );
        }
        if (section.heading) {
          docChildren.push(
            new Paragraph({
              text: section.heading,
              bold: true,
              spacing: { after: 40 }
            })
          );
        }
        if (section.subtext) {
          docChildren.push(
            new Paragraph({
              text: section.subtext,
              spacing: { after: 80 }
            })
          );
        }
      });
    }

    // Extract card content
    const cards = [];
    $('.card-title, .serve-title').each((i, el) => {
      const title = $(el).text().trim();
      const desc = $(el).closest('.card, .serve-card').find('.card-desc, .serve-desc').text().trim();
      if (title && desc) cards.push({ title, desc });
    });

    if (cards.length > 0) {
      docChildren.push(
        new Paragraph({
          text: 'CARDS & COMPONENTS',
          bold: true,
          spacing: { before: 120, after: 80 }
        })
      );
      cards.forEach(card => {
        docChildren.push(
          new Paragraph({
            text: card.title,
            bold: true,
            spacing: { after: 40 }
          }),
          new Paragraph({
            text: card.desc,
            spacing: { after: 60 }
          })
        );
      });
    }

    docChildren.push(new Paragraph({ text: '', spacing: { after: 120 } }));

  } catch (error) {
    console.log(`Skipping ${page.file}: ${error.message}`);
  }
});

// Create document
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Arial', size: 22 }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: 12240,  // US Letter
          height: 15840
        },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: docChildren
  }]
});

// Generate file
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('212Visual_Copy_Inventory.docx', buffer);
  console.log('Document created: 212Visual_Copy_Inventory.docx');
});
