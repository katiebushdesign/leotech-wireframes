/* ── MEGA MENU + FOOTER SHARED JS ── */
/* Include this script in every page */

const NAV_HTML = `
<nav class="navbar">
  <a href="index.html" class="nav-logo" aria-label="212 Visual — Home"></a>
  <div class="nav-links">
    <div class="nav-item">
      <button class="nav-btn" data-menu="solutions">Solutions
        <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l4 4 4-4"/></svg>
      </button>
    </div>
    <div class="nav-item">
      <button class="nav-btn" data-menu="serve">Who we serve
        <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l4 4 4-4"/></svg>
      </button>
    </div>
    <div class="nav-item">
      <button class="nav-btn" data-menu="partner">Partner program
        <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l4 4 4-4"/></svg>
      </button>
    </div>
    <div class="nav-item">
      <button class="nav-btn" data-menu="verticals">Verticals
        <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l4 4 4-4"/></svg>
      </button>
    </div>
    <div class="nav-item">
      <button class="nav-btn" data-menu="company">Company
        <svg viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l4 4 4-4"/></svg>
      </button>
    </div>
  </div>
  <a href="become-a-partner.html" class="nav-cta">Become a partner</a>
</nav>

<div class="mega-overlay" id="mega-overlay"></div>

<div class="mega-panel" id="mega-solutions">
  <div class="mega-eyebrow">Solutions</div>
  <div class="mega-grid mega-4">
    <div class="mega-col">
      <div class="mega-col-label">How we work with you</div>
      <a href="solutions-installations.html" class="mega-item">
        <div class="mega-item-title">High-impact installations</div>
        <div class="mega-item-desc">Complex LED projects co-delivered — you own the client, we carry the complexity</div>
      </a>
      <a href="solutions-systems.html" class="mega-item">
        <div class="mega-item-title">Pre-configured systems</div>
        <div class="mega-item-desc">Engineered packages for common environments — quote fast, install right</div>
      </a>
      <a href="solutions-enablement.html" class="mega-item">
        <div class="mega-item-title">Sales enablement</div>
        <div class="mega-item-desc">Tools and materials to help you win more LED business and close bigger deals</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-col-label">Content & creative</div>
      <a href="solutions-content.html" class="mega-item">
        <div class="mega-item-title">Content services</div>
        <div class="mega-item-desc">Motion graphics engineered for the exact wall — not adapted from generic video</div>
      </a>
      <a href="solutions-content.html#ongoing" class="mega-item">
        <div class="mega-item-title">Ongoing content programs</div>
        <div class="mega-item-desc">Campaign refreshes, template systems, and real-time data displays</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-col-label">Ongoing care</div>
      <a href="solutions-212care.html" class="mega-item">
        <div class="mega-item-title">212Care</div>
        <div class="mega-item-desc">Proactive monitoring and SLA-backed service — before your client notices a problem</div>
      </a>
      <a href="partner-academy.html" class="mega-item">
        <div class="mega-item-title">212 Academy</div>
        <div class="mega-item-desc">Role-based certification that builds your team's LED capability — project by project</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-feature">
        <div class="mega-feature-eyebrow">The 212 difference</div>
        <div class="mega-feature-title">At 211°, water is hot. At 212°, it boils.</div>
        <div class="mega-feature-desc">One extra degree of preparation, precision, and care — in hardware, content, training, and support. That's what separates a vendor from a true partner.</div>
        <div class="mega-feature-link">See how it works →</div>
      </div>
    </div>
  </div>
</div>

<div class="mega-panel" id="mega-serve">
  <div class="mega-eyebrow">Who we serve</div>
  <div class="mega-grid mega-4">
    <div class="mega-col">
      <div class="mega-col-label">Technology & integration</div>
      <a href="serve-integrators.html" class="mega-item">
        <div class="mega-item-title">AV integrators</div>
        <div class="mega-item-desc">Everything you need to grow a profitable LED practice — and never say no to a project</div>
      </a>
      <a href="serve-msp.html" class="mega-item">
        <div class="mega-item-title">IT & managed service providers</div>
        <div class="mega-item-desc">Add visual systems to your portfolio without building LED expertise from scratch</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-col-label">Creative & marketing</div>
      <a href="serve-marketing.html" class="mega-item">
        <div class="mega-item-title">Marketing & advertising firms</div>
        <div class="mega-item-desc">Bring LED into experiential campaigns with a technical partner who executes what you envision</div>
      </a>
      <a href="serve-agencies.html" class="mega-item">
        <div class="mega-item-title">Brand & design agencies</div>
        <div class="mega-item-desc">Deliver immersive environments your clients will remember — and talk about</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-col-label">Design & construction</div>
      <a href="serve-architects.html" class="mega-item">
        <div class="mega-item-title">Architects & design firms</div>
        <div class="mega-item-desc">Specify LED with confidence — full CAD documentation and engineering support included</div>
      </a>
      <a href="serve-engineering.html" class="mega-item">
        <div class="mega-item-title">Engineering & consulting firms</div>
        <div class="mega-item-desc">Technical partnership for LED on complex commercial projects — concept through commissioning</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-feature">
        <div class="mega-feature-eyebrow">Not on this list?</div>
        <div class="mega-feature-title">If you deliver visual experiences to clients, you belong here.</div>
        <div class="mega-feature-desc">We work with anyone specifying, designing, or delivering LED for commercial environments. Your role doesn't have to fit a category.</div>
        <div class="mega-feature-link">Start a conversation →</div>
      </div>
    </div>
  </div>
</div>

<div class="mega-panel" id="mega-partner">
  <div class="mega-eyebrow">Partner program</div>
  <div class="mega-grid mega-4">
    <div class="mega-col">
      <div class="mega-col-label">Program</div>
      <a href="partner-program.html" class="mega-item">
        <div class="mega-item-title">Program overview</div>
        <div class="mega-item-desc">Protected pricing, project registration, and a dedicated account manager — from day one</div>
      </a>
      <a href="partner-portal.html" class="mega-item">
        <div class="mega-item-title">Partner portal</div>
        <div class="mega-item-desc">Login to access pricing, kit catalog, calculators, spec sheets, and order tracking</div>
      </a>
      <a href="become-a-partner.html" class="mega-item">
        <div class="mega-item-title">Become a partner</div>
        <div class="mega-item-desc">No hard sell — just a real conversation about your business and what's possible</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-col-label">212 Academy</div>
      <a href="partner-academy.html" class="mega-item">
        <div class="mega-item-title">Academy overview</div>
        <div class="mega-item-desc">Role-based training and certification that builds your team's LED capability for good</div>
      </a>
      <a href="partner-academy.html#tracks" class="mega-item">
        <div class="mega-item-title">Certification tracks</div>
        <div class="mega-item-desc">Installer, engineer, sales consultant, and service technician paths</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-col-label">Partner tiers</div>
      <a href="partner-program.html#tiers" class="mega-item">
        <div class="mega-item-title">Registered</div>
        <div class="mega-item-desc">Base pricing, portal access, and technical support — the starting point</div>
      </a>
      <a href="partner-program.html#tiers" class="mega-item">
        <div class="mega-item-title">Certified</div>
        <div class="mega-item-desc">Better margins, priority engineering support, and demo kit access</div>
      </a>
      <a href="partner-program.html#tiers" class="mega-item">
        <div class="mega-item-title">Elite</div>
        <div class="mega-item-desc">Best margins, MDF, exclusive SKUs, beta access, and co-marketing</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-feature">
        <div class="mega-feature-eyebrow">Our promise</div>
        <div class="mega-feature-title">We will never sell directly to your clients. Ever.</div>
        <div class="mega-feature-desc">We came from the integrator side of this business. We know what it feels like when a supplier goes around you. Your client relationship is yours — protected, always.</div>
        <div class="mega-feature-link">Learn about the program →</div>
      </div>
    </div>
  </div>
</div>

<div class="mega-panel" id="mega-verticals">
  <div class="mega-eyebrow">Verticals</div>
  <div class="mega-grid mega-4">
    <div class="mega-col">
      <div class="mega-col-label">Commercial</div>
      <a href="vertical-corporate.html" class="mega-item">
        <div class="mega-item-title">Corporate</div>
        <div class="mega-item-desc">Boardrooms, lobbies, experience centers, and brand feature walls</div>
      </a>
      <a href="vertical-retail.html" class="mega-item">
        <div class="mega-item-title">Retail & brand experience</div>
        <div class="mega-item-desc">Flagship stores, showrooms, pop-ups, and digital merchandising</div>
      </a>
      <a href="vertical-events.html" class="mega-item">
        <div class="mega-item-title">Events & trade shows</div>
        <div class="mega-item-desc">Portable and modular LED for activations, launches, and live events</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-col-label">Hospitality & culture</div>
      <a href="vertical-hospitality.html" class="mega-item">
        <div class="mega-item-title">Hospitality</div>
        <div class="mega-item-desc">Hotels, resorts, restaurants — LED that defines a guest experience</div>
      </a>
      <a href="vertical-worship.html" class="mega-item">
        <div class="mega-item-title">Houses of worship</div>
        <div class="mega-item-desc">Stage backdrops, IMAG displays, and lobby screens for congregations of all sizes</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-col-label">Institutional</div>
      <a href="vertical-education.html" class="mega-item">
        <div class="mega-item-title">Education & healthcare</div>
        <div class="mega-item-desc">Campus commons, lecture halls, hospital lobbies, and donor recognition displays</div>
      </a>
      <a href="vertical-industrial.html" class="mega-item">
        <div class="mega-item-title">Industrial & manufacturing</div>
        <div class="mega-item-desc">KPI dashboards, plant floor signage, and brand experience centers</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-feature">
        <div class="mega-feature-eyebrow">Every space is different</div>
        <div class="mega-feature-title">LED solutions designed around how the space is used.</div>
        <div class="mega-feature-desc">We don't sell a product and leave you to figure out the environment. Our solutions are built around who's in the space, what it needs to do, and what success looks like for your client.</div>
        <div class="mega-feature-link">Discuss your vertical →</div>
      </div>
    </div>
  </div>
</div>

<div class="mega-panel" id="mega-company">
  <div class="mega-eyebrow">Company</div>
  <div class="mega-grid mega-3">
    <div class="mega-col">
      <div class="mega-col-label">About us</div>
      <a href="about.html" class="mega-item">
        <div class="mega-item-title">About 212Visual</div>
        <div class="mega-item-desc">Built by AV professionals who lived the challenges of LED from the integrator's side</div>
      </a>
      <a href="about.html#team" class="mega-item">
        <div class="mega-item-title">Our team</div>
        <div class="mega-item-desc">Decades of combined experience from both sides of the AV industry</div>
      </a>
      <a href="careers.html" class="mega-item">
        <div class="mega-item-title">Careers</div>
        <div class="mega-item-desc">Join the team building the LED partner the industry deserves</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-col-label">Resources</div>
      <a href="case-studies.html" class="mega-item">
        <div class="mega-item-title">Case studies</div>
        <div class="mega-item-desc">Real installations. Real partners. Real results.</div>
      </a>
      <a href="verticals.html" class="mega-item">
        <div class="mega-item-title">Verticals</div>
        <div class="mega-item-desc">LED by industry — corporate, hospitality, retail, education, and more</div>
      </a>
      <a href="contact.html" class="mega-item">
        <div class="mega-item-title">Contact</div>
        <div class="mega-item-desc">Talk to our team about your project, your practice, or your next move</div>
      </a>
    </div>
    <div class="mega-col">
      <div class="mega-feature">
        <div class="mega-feature-eyebrow">The 212° philosophy</div>
        <div class="mega-feature-title">At 211°, water is hot. At 212°, it boils. That one degree changes everything.</div>
        <div class="mega-feature-desc">We named this company after that principle because it's how we operate — one extra degree of preparation, precision, and care in everything we do.</div>
        <div class="mega-feature-link">Our story →</div>
      </div>
    </div>
  </div>
</div>
`;

const FOOTER_HTML = `
<div class="footer-cta">
  <div>
    <div class="footer-cta-h2">Ready to show up bigger for your clients?</div>
    <div class="footer-cta-sub">Let's talk about what you're building — no hard sell, just a real conversation.</div>
  </div>
  <a href="become-a-partner.html" class="btn-white">Become a partner</a>
</div>
<footer class="footer">
  <div>
    <div class="footer-logo">212 VISUAL</div>
    <div class="footer-tagline">The extra degree in LED. Hardware, content, training, and care — built for everyone who builds.</div>
  </div>
  <div>
    <div class="footer-col-title">Solutions</div>
    <a href="solutions-installations.html" class="footer-link">High-impact installations</a>
    <a href="solutions-systems.html" class="footer-link">Pre-configured systems</a>
    <a href="solutions-content.html" class="footer-link">Content services</a>
    <a href="solutions-212care.html" class="footer-link">212Care</a>
    <a href="solutions-enablement.html" class="footer-link">Sales enablement</a>
  </div>
  <div>
    <div class="footer-col-title">Who we serve</div>
    <a href="serve-integrators.html" class="footer-link">AV integrators</a>
    <a href="serve-msp.html" class="footer-link">IT & MSPs</a>
    <a href="serve-marketing.html" class="footer-link">Marketing firms</a>
    <a href="serve-agencies.html" class="footer-link">Brand & design</a>
    <a href="serve-architects.html" class="footer-link">Architects</a>
  </div>
  <div>
    <div class="footer-col-title">Partner program</div>
    <a href="partner-program.html" class="footer-link">Overview</a>
    <a href="partner-academy.html" class="footer-link">212 Academy</a>
    <a href="partner-portal.html" class="footer-link">Portal login</a>
    <a href="become-a-partner.html" class="footer-link">Become a partner</a>
  </div>
  <div>
    <div class="footer-col-title">Company</div>
    <a href="about.html" class="footer-link">About</a>
    <a href="case-studies.html" class="footer-link">Case studies</a>
    <a href="verticals.html" class="footer-link">Verticals</a>
    <a href="careers.html" class="footer-link">Careers</a>
    <a href="contact.html" class="footer-link">Contact</a>
  </div>
</footer>
<div class="footer-bottom">
  <div class="footer-bottom-text">© 2025 212Visual. All rights reserved.</div>
  <div class="footer-bottom-text">Privacy policy · Terms of use</div>
</div>
`;

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  const overlay = document.getElementById('mega-overlay');
  let current = null;

  document.querySelectorAll('.nav-btn[data-menu]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = 'mega-' + btn.dataset.menu;
      const panel = document.getElementById(id);
      if (current === id) {
        closeAll();
      } else {
        closeAll();
        panel.classList.add('open');
        btn.classList.add('active');
        overlay.classList.add('open');
        current = id;
      }
    });
  });

  overlay.addEventListener('click', closeAll);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });

  function closeAll() {
    document.querySelectorAll('.mega-panel').forEach(p => p.classList.remove('open'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    overlay.classList.remove('open');
    current = null;
  }

  // Highlight active nav item based on current page
  const page = window.location.pathname.split('/').pop();
  const map = {
    'solutions': ['solutions-installations','solutions-systems','solutions-content','solutions-212care','solutions-enablement'],
    'serve': ['serve-integrators','serve-msp','serve-marketing','serve-agencies','serve-architects','serve-engineering'],
    'partner': ['partner-program','partner-academy','partner-portal','become-a-partner'],
    'verticals': ['verticals','vertical-corporate','vertical-hospitality','vertical-retail','vertical-education','vertical-worship','vertical-events','vertical-industrial'],
    'company': ['about','careers','case-studies','contact'],
  };
  Object.entries(map).forEach(([menu, pages]) => {
    if (pages.some(p => page.startsWith(p))) {
      document.querySelector(`[data-menu="${menu}"]`)?.classList.add('active');
    }
  });
});
