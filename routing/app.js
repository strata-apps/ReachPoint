// Minimal SPA router with dynamic screen loading.
// Convention: each screen is a module in ./screens/<route>.js exporting default (root) => void

const DEFAULT_ROUTE = 'landing'; 

// DOM helpers
const $app = document.getElementById('app');
const $year = document.getElementById('year');
if ($year) $year.textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Build route from location.hash => "landing", "about", etc.
function getRouteFromHash() {
  const hash = location.hash || `#/` + DEFAULT_ROUTE;
  // Accept formats like "#/landing?x=1" or "#/landing"
  const [, raw] = hash.match(/^#\/?([^?]+)/) || [];
  return (raw || DEFAULT_ROUTE).toLowerCase();
}

// Update active link styling
function highlightActive(route) {
  document.querySelectorAll('[data-route].nav-link').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    const isActive = href === `#/${route}`;
    a.classList.toggle('active', isActive);
  });
}

// Render an error card
function renderError(message, details = '') {
  $app.innerHTML = `
    <section class="card error">
      <h1 class="card-title">Oops</h1>
      <p>${message}</p>
      ${details ? `<pre class="error-pre">${escapeHtml(details)}</pre>` : ''}
      <a class="btn" href="#/${DEFAULT_ROUTE}" data-route>Go to Home</a>
    </section>
  `;
}

// Basic sanitizer for error pre
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Load and mount a screen module
async function navigate(route) {
  // Close mobile menu on navigation
  if (nav && nav.classList.contains('open')) {
    nav.classList.remove('open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  }

  highlightActive(route);

  // Simple route guard: default if route empty
  const screen = route || DEFAULT_ROUTE;

  // Loading state
  $app.innerHTML = `
    <section class="loading">
      <div class="spinner" aria-hidden="true"></div>
      <div class="loading-text">Loading ${screen}…</div>
    </section>
  `;

  try {
    // Dynamic import: expects ./screens/<route>.js with default export (mount function)
    const mod = await import(`./screens/${screen}.js`);
    // Clear and mount
    $app.innerHTML = '';
    if (typeof mod.default === 'function') {
      // Provide a simple mount API: mount(root, context)
      await mod.default($app, { route: screen, params: getQueryParams() });
      // Focus for accessibility
      $app.focus();
    } else {
      renderError(`Screen "${screen}" is missing a default export function.`);
    }
  } catch (err) {
    // If landing fails, show clear guidance
    const hint = screen === DEFAULT_ROUTE
      ? `Create "./screens/${DEFAULT_ROUTE}.js" exporting default (root) => { /* render */ }`
      : `Make sure "./screens/${screen}.js" exists.`;
    renderError(`Couldn't load screen "${screen}".`, `${hint}\n\n${err?.stack || err}`);
  }
}

// Parse query params from hash (supports #/route?key=value)
function getQueryParams() {
  const match = (location.hash || '').match(/\?(.+)$/);
  if (!match) return {};
  return Object.fromEntries(new URLSearchParams(match[1]).entries());
}

// Initialize
function ensureDefaultHash() {
  if (!location.hash || location.hash === '#/' || location.hash === '#') {
    location.replace(`#/` + DEFAULT_ROUTE);
  }
}

// Wire events
window.addEventListener('hashchange', () => navigate(getRouteFromHash()));
window.addEventListener('DOMContentLoaded', () => {
  ensureDefaultHash();
  navigate(getRouteFromHash());
});

// Delegate clicks on [data-route] to use hash navigation (no full reload)
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-route]');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.startsWith('#/')) {
    e.preventDefault();
    // This sets the hash (will trigger navigate via hashchange)
    location.hash = href;
  }
});
