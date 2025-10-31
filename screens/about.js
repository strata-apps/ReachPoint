// ./screens/about.js
export default function mount(root) {
  // Top + paragraph + "Meet the Team" using existing styles
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
        margin-bottom:1px;
      ">
        Bringing Enterprise Level Solutions to 
        <span style="color:var(--accent)">Grassroot Movements.</span>
      </h1>

      <p style="
        font-size:20px;
        font-weight:400;
        color:var(--muted);
        max-width:720px;
        margin:0 auto;
        line-height:1.5;
      ">
      The mission behind ReachPoint is to ensure that service-oriented nonprofits, small businesses, academic institutions and any grassroot movements are able to effectively serve their communities without economic and technological barriers. These businesses and organizations are the lifeline of our communities. Our mission is to help you reach your mission.
      </p>
    </div>
  `;

  // Example team data (edit as you like)
  const team = [
    { photo: "./assets/darian.jpg", name: "Darian", role: "Co-Founder: Product and Engineering", blurb: "Darian graduated from Harvard in 2025 and has years of experience in management consulting, product development, government and nonprofit solutions." },
  ];

  // Render “feature cards” for profiles using your existing .feature-card styles
  const $grid = root.querySelector('#team-grid');
  $grid.innerHTML = team.map(member => `
    <article class="feature-card card">
      <div class="feature-icon" aria-hidden="true">${member.emoji}</div>
      <h3 class="feature-title">${member.name}</h3>
      <p class="feature-desc"><strong>${member.role}</strong></p>
      <p class="feature-desc">${member.blurb}</p>
    </article>
  `).join('');

  // Simple scroll-reveal (optional): add .show when mounted
  requestAnimationFrame(() => {
    root.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
  });
}
