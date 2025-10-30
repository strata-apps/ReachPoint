// ./screens/about.js
export default function mount(root) {
  // Top + paragraph + "Meet the Team" using existing styles
  root.innerHTML = `
    <section class="card reveal">
      <h1 class="card-title">Bringing Enterprise Level Solutions to Grassroot Nonprofits</h1>
      <p id="about-blurb">
        Replace this with your story. Share your mission, the communities you serve,
        and how your tools help staff, volunteers, and students succeed.
      </p>
    </section>

    <section class="features reveal" aria-labelledby="team-title">
      <div class="features-head">
        <h2 id="team-title" class="features-title">Meet the Team</h2>
        <p class="features-sub">The humans building and supporting the platform.</p>
      </div>

      <div class="feature-grid" id="team-grid"></div>
    </section>
  `;

  // Example team data (edit as you like)
  const team = [
    { emoji: "🧭", name: "Jason", role: "Founder & Executive Director", blurb: "Vision, partnerships, and strategy." },
    { emoji: "🛠️", name: "Darian", role: "Product & Engineering", blurb: "Builds platforms for student success." },
    { emoji: "🤝", name: "Ariana", role: "Programs & Outreach", blurb: "Connects families to resources." },
    { emoji: "📣", name: "Karla", role: "Communications", blurb: "Tells the stories that matter." },
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
