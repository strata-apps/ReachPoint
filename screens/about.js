// ./screens/about.js
export default function mount(root) {
  // Hero + intro
  root.innerHTML = `
    <div style="
      width:100%;
      padding:60px 24px 10px;
      text-align:center;
    ">
      <h1 style="
        font-size:clamp(36px, 6vw, 56px);
        font-weight:900;
        color:var(--ink);
        letter-spacing:-0.5px;
        line-height:1.1;
        margin:0 0 10px 0;
      ">
        Bringing Enterprise-Level Solutions to
        <span style="color:var(--accent)">Grassroots Movements.</span>
      </h1>

      <p style="
        font-size:20px;
        font-weight:400;
        color:var(--muted);
        max-width:720px;
        margin:0 auto;
        line-height:1.5;
      ">
        The mission behind ReachPoint is to ensure that service-oriented nonprofits, small businesses,
        academic institutions, and grassroots movements can serve their communities without economic
        or technological barriers. These organizations are the lifeline of our communities—we help you
        reach your mission.
      </p>
    </div>

    <!-- Team Section -->
    <section style="padding:28px 16px 60px;">
      <h2 style="
        text-align:center;
        font-size:28px;
        font-weight:800;
        color:var(--ink);
        margin:0 0 18px 0;
      ">Meet the Team</h2>

      <!-- Horizontal card carousel using your feature-card styles -->
      <div id="team-grid" class="feature-cards" style="
        display:flex;
        gap:16px;
        overflow-x:auto;
        padding:4px 4px 8px;
        scroll-snap-type:x mandatory;
        -webkit-overflow-scrolling:touch;
      "></div>
    </section>
  `;

  // Team data
  const team = [
    {
      photo: "./assets/darian.jpg",
      name: "Darian",
      role: "Co-Founder · Product & Engineering",
      blurb:
        "Darian graduated from Harvard in 2025 and has experience in management consulting, product development, and nonprofit solutions."
    },
    // Add more members here...
  ];

  // Populate cards
  const $grid = root.querySelector('#team-grid');
  if ($grid) {
    $grid.innerHTML = team.map(m => `
      <article class="feature-card card feature-card--slide" style="
        flex:0 0 300px;
        scroll-snap-align:start;
        border-radius:16px;
      ">
        ${m.photo ? `
          <div style="width:100%; height:160px; overflow:hidden; border-top-left-radius:16px; border-top-right-radius:16px; background:var(--panel)">
            <img src="${m.photo}" alt="${m.name}" style="width:100%; height:100%; object-fit:cover;">
          </div>` : ''}

        <div style="padding:14px;">
          <h3 class="feature-title" style="margin:8px 0 4px; font-size:18px; font-weight:800; color:var(--ink);">
            ${m.name}
          </h3>
          <p class="feature-desc" style="margin:0 0 8px; color:var(--muted);">
            <strong>${m.role}</strong>
          </p>
          <p class="feature-desc" style="margin:0; color:var(--muted); line-height:1.55;">
            ${m.blurb}
          </p>
        </div>
      </article>
    `).join('');

    // Optional: enable arrow keys + wheel-to-horizontal on the row
    $grid.setAttribute('tabindex', '0');
    $grid.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') $grid.scrollBy({ left: 320, behavior: 'smooth' });
      if (e.key === 'ArrowLeft')  $grid.scrollBy({ left: -320, behavior: 'smooth' });
    });
    $grid.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        $grid.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });
  }

  // Optional reveal hook (safe-guarded)
  requestAnimationFrame(() => {
    root.querySelectorAll('.reveal')?.forEach(el => el.classList.add('show'));
  });
}
