// ./screens/about.js
export default function mount(root) {
  // Top + paragraph + "Meet the Team" using existing styles
  root.innerHTML = `
    <div class="sb-inner">
      <h1 class="sb-title">
        Bringing Enterprise Level Solutions to Grassroot Movements
        <span class="sb-caret" aria-hidden="true"></span>
      </h1>
      <p class="sb-sub">The mission behind ReachPoint is to ensure that service-oriented nonprofits, small businesses, academic institutions and any grassroot movements are able to effectively serve their communities without economic and technological barriers. These businesses and organizations are the lifeline of our communities. Our mission is to help you reach your mission.</p>
    </div>

    <section class="features reveal" aria-labelledby="team-title">
      <div class="features-head">
        <h2 id="team-title" class="features-title">Meet the Team</h2>
        <p class="features-sub">Our team brings together talented, IV-league professionals who have a passion for public service.</p>
      </div>

      <div class="feature-grid" id="team-grid"></div>
    </section>
  `;

  // Example team data (edit as you like)
  const team = [
    { photo: "./assets/darian.jpg", name: "Darian", role: "Co-Founder: Product and Engineering", blurb: "Darian graduated from Harvard in 2025 and has years of experience in management consulting, product development, government and nonprofit solutions." },
    { photo: "./assets/member.jpg", name: "Member", role: "About our member." },
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
