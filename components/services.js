// Landing/components/services.js
export function servicesSection() {
  const features = [
    {
      emoji: '📞',
      title: 'Unified Calling Interface',
      desc: 'Make calls, view recipient information, inspect prior interactions, log responses and document notes all from one screen. No switching between spreadsheets!',
    },
    {
      emoji: '🧠',
      title: 'Smart Contact Management',
      desc: 'Organize and filter your contacts to create targeted call campaigns. Query your database to find the right prospects.',
    },
    {
      emoji: '🧾',
      title: 'Comprehensive Documentation',
      desc: 'Every interaction, survey response, and note is automatically stored in a backend database for your records and future reference.',
    },
    {
      emoji: '📊',
      title: 'Real-time Insights',
      desc: 'Get instant analytics on your outreach performance to inform your strategy and better understand your community’s needs.',
    },
    {
      emoji: '🎯',
      title: 'Campaign Filtering',
      desc: 'Create dynamic segments and launch new campaigns based on your contacts’ actions and responses.',
    },
    {
      emoji: '🛡️',
      title: 'Secure Backend Storage',
      desc: 'All progress and data live in a secure, enterprise-grade database with automatic backups.',
    },
  ];

  const section = document.createElement('section');
  section.className = 'features';

  // Header
  const head = document.createElement('div');
  head.className = 'features-head';
  head.innerHTML = `
    <h2 class="features-title">Capture Every Point of Interaction</h2>
    <p class="features-sub">
      ReachPoint combines powerful CRM features with an intuitive interface, making it easier than ever to manage your outreach campaigns and grow your business.
    </p>
  `;
  section.appendChild(head);

  // Grid
  const grid = document.createElement('div');
  grid.className = 'feature-grid';
  features.forEach((f) => {
    const card = document.createElement('article');
    card.className = 'card feature-card';
    card.innerHTML = `
      <div class="feature-icon" aria-hidden="true">${f.emoji}</div>
      <h3 class="feature-title">${f.title}</h3>
      <p class="feature-desc">${f.desc}</p>
    `;
    grid.appendChild(card);
  });
  section.appendChild(grid);

  return section;
}

export default servicesSection;
