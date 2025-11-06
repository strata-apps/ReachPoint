// Landing/components/services.js
export function servicesSection() {
  const features = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/6787/6787101.png',
      title: 'Unified Calling Interface',
      desc: 'Make calls, view recipient information, inspect prior interactions, log responses and document notes all from one screen. No switching between spreadsheets!',
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/4236/4236747.png',
      title: 'Smart Contact Management',
      desc: 'Organize and filter your contacts to create targeted call campaigns. Query your database to find the right prospects.',
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/60/60492.png',
      title: 'Comprehensive Documentation',
      desc: 'Every interaction, survey response, and note is automatically stored in a backend database for your records and future reference.',
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/1548/1548914.png',
      title: 'Real-time Insights',
      desc: 'Get instant analytics on your outreach performance to inform your strategy and better understand your community’s needs.',
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/9628/9628636.png',
      title: 'Campaign Filtering',
      desc: 'Create dynamic segments and launch new campaigns based on your contacts’ actions and responses.',
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/128/16032/16032744.png',
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
      <div class="feature-icon" aria-hidden="true">
        ${f.icon
          ? `<img src="${f.icon}" alt="" class="feature-icon-img" />`
          : f.emoji || ''}
      </div>
      <h3 class="feature-title">${f.title}</h3>
      <p class="feature-desc">${f.desc}</p>
    `;
    grid.appendChild(card);
  });
  section.appendChild(grid);

  return section;
}

// ——— “See ReachPoint in Action” section ———
export function servicesActionSection() {
  const data = [
    {
      tag: 'Campaign Management',
      title: 'Organize Your Campaigns',
      desc: 'Create and manage multiple outreach campaigns with detailed progress tracking.',
    },
    {
      tag: 'Analytics',
      title: 'Real-time Insights',
      desc: 'Track your campaign performance with detailed analytics and progress metrics.',
    },
    {
      tag: 'Live Calling',
      title: 'Unified Call Interface',
      desc: 'Make calls, view contact details, and document notes all from one screen.',
    },
  ];

  const sec = document.createElement('section');
  sec.className = 'action';

  const head = document.createElement('div');
  head.className = 'action-head';
  head.innerHTML = `
    <h2 class="action-title">See ReachPoint in Action</h2>
    <p class="action-sub">From campaign management to live calling interfaces, ReachPoint provides everything you need to run successful outreach campaigns.</p>
  `;
  sec.appendChild(head);

  // cards
  const grid = document.createElement('div');
  grid.className = 'action-grid';
  data.forEach(d => {
    const card = document.createElement('article');
    card.className = 'card action-card';
    card.innerHTML = `
      <div class="tag">${d.tag}</div>
      <div class="media-placeholder" aria-hidden="true"></div>
      <h3 class="action-card-title">${d.title}</h3>
      <p class="action-card-desc">${d.desc}</p>
    `;
    grid.appendChild(card);
  });
  sec.appendChild(grid);
  return sec;
}

// --- CTA band section  ---
export function ctaBandSection() {
  const cta = document.createElement('section');
  cta.className = 'cta-band';
  cta.innerHTML = `
    <div class="cta-copy">
      <h3 class="cta-title">Ready to Transform Your Outreach?</h3>
      <p class="cta-sub">Join the movement of teams who have increased their conversion rates with ReachPoint’s powerful CRM platform.</p>
    </div>
    <div class="cta-actions">
      <a class="btn primary" href="#/contact" data-route>Connect with our<br/>Team</a>
    </div>
  `;
  return cta;
}

// ——— Comparison Matrix ———
export function comparisonMatrixSection() {
  const rows = [
    ['Task Creation and Management', true,  true,  false],
    ['Real-Time Insights',           true,  false, false],
    ['Flexible Event Creation',     true,  false, true ],
    ['Unified Caller Interface',    true,  false, false],
    ['Client-Facing Dynamic DB',    true,  false, true ],
  ];

  const sec = document.createElement('section');
  sec.className = 'compare';

  sec.innerHTML = `
    <h2 class="compare-title">The Most Efficient Tool on the Market</h2>
    <div class="table-wrap">
      <table class="cmp-table" role="table">
        <thead>
          <tr>
            <th scope="col">Flow of Use</th>
            <th scope="col">ReachPoint</th>
            <th scope="col">Salesforce</th>
            <th scope="col">Spreadsheets</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  `;

  const tbody = sec.querySelector('tbody');
  rows.forEach(([label, rp, sf, ss]) => {
    const tr = document.createElement('tr');

    const td0 = document.createElement('th');
    td0.scope = 'row';
    td0.innerHTML = `<span class="pill">${label}</span>`;

    const td1 = document.createElement('td'); td1.innerHTML = badge(rp);
    const td2 = document.createElement('td'); td2.innerHTML = badge(sf);
    const td3 = document.createElement('td'); td3.innerHTML = badge(ss);

    tr.append(td0, td1, td2, td3);
    tbody.appendChild(tr);
  });

  return sec;

  function badge(ok) {
    return `<span class="mark ${ok ? 'yes' : 'no'}" aria-label="${ok ? 'Included' : 'Not included'}">${ok ? '✔' : '✖'}</span>`;
  }
}

export default { servicesSection, servicesActionSection, comparisonMatrixSection, ctaBandSection };
