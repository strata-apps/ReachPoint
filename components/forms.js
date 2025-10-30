// /components/forms.js
// Service Recommendation Quiz (full-screen)
// Usage from a screen: 
//   import { serviceRecommendationQuiz } from '../components/forms.js'
//   root.appendChild(serviceRecommendationQuiz())

export function serviceRecommendationQuiz() {
  // --- Services catalog (toggle booleans as answers come in) ---
  const services = {
    'Unified Calling Interface': {
      on: false,
      desc: 'Single place to dial, log outcomes, queue calls, and sync notes to contacts.',
      icon: '📞',
    },
    'Broadcast & 2-Way SMS': {
      on: false,
      desc: 'Send announcements, reminders, and have real 2-way text conversations at scale.',
      icon: '💬',
    },
    'Tasks & Volunteer Coordination': {
      on: false,
      desc: 'Create tasks, assign to staff/volunteers, track status, and follow up automatically.',
      icon: '🗂️',
    },
    'Bilingual Messaging & Templates': {
      on: false,
      desc: 'Pre-built English/Spanish templates and flows to reach more families effectively.',
      icon: '🇺🇸🇲🇽',
    },
    'Analytics & CRM Sync': {
      on: false,
      desc: 'Dashboards and exports to share impact with donors and boards, synced to your CRM.',
      icon: '📊',
    },
  };

  // --- Questionnaire (multiple choice only) ---
  // Each question has id, prompt, and options: [{label, value}]
  // We’ll store answers in `answers[question.id] = value`
  const questions = [
    {
      id: 'callsPerDay',
      prompt: 'How many calls does your team typically make in a day?',
      options: [
        { label: '< 10', value: '<10' },
        { label: '10 – 19', value: '10-19' },
        { label: '20+', value: '20+' },
        { label: '30+', value: '30+' },
        { label: '50+', value: '50+' },
      ],
    },
    {
      id: 'smsCadence',
      prompt: 'How often do you send SMS/text updates to your community?',
      options: [
        { label: 'Weekly or more', value: 'weekly+' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Rarely / Never', value: 'rare' },
        { label: 'Planning to start soon', value: 'planning' },
      ],
    },
    {
      id: 'volunteerSize',
      prompt: 'About how many staff/volunteers help with outreach at a time?',
      options: [
        { label: '< 10', value: '<10' },
        { label: '10 – 25', value: '10-25' },
        { label: '25 – 100', value: '25-100' },
        { label: '100+', value: '100+' },
      ],
    },
    {
      id: 'bilingual',
      prompt: 'Do you engage families in multiple languages?',
      options: [
        { label: 'Yes – English/Spanish', value: 'yes-es' },
        { label: 'Yes – other languages', value: 'yes-other' },
        { label: 'No', value: 'no' },
      ],
    },
    {
      id: 'reporting',
      prompt: 'How do you prefer to report results to donors/partners?',
      options: [
        { label: 'Real-time dashboards', value: 'dashboards' },
        { label: 'Monthly exports are fine', value: 'exports' },
        { label: 'We do not need reporting', value: 'none' },
      ],
    },
  ];

  const answers = {};
  let step = -1; // -1 = intro screen, 0..questions.length-1 for questions, 'done' for results

  // --- Root wrapper (fills the screen) ---
  const wrap = document.createElement('section');
  wrap.style.background = '#ffffff';            // white background as requested
  wrap.style.minHeight = 'calc(100dvh - 140px)';// match app layout height
  wrap.style.display = 'grid';
  wrap.style.placeItems = 'center';
  wrap.style.padding = '24px 0';

  // Inner container we will update on each step
  const view = document.createElement('div');
  view.style.width = '100%';
  view.style.maxWidth = '880px';
  view.style.margin = '0 auto';
  wrap.appendChild(view);

  // --- Helpers ---
  function buttonPrimary(text, onClick) {
    const a = document.createElement('button');
    a.className = 'btn primary';
    a.textContent = text;
    a.style.minWidth = '180px';
    a.addEventListener('click', onClick);
    return a;
  }

  function renderIntro() {
    view.innerHTML = `
      <div class="card" style="text-align:center; padding: 40px;">
        <h1 class="card-title" style="font-size:26px; margin-bottom:8px;">
          Discover how to best streamline communication and engagement for your organization
        </h1>
        <p style="color:var(--muted); margin:0 0 18px;">
          Answer a few quick questions to see which features will help your team most.
        </p>
      </div>
    `;

    const ctaRow = document.createElement('div');
    ctaRow.style.display = 'grid';
    ctaRow.style.placeItems = 'center';
    ctaRow.style.marginTop = '16px';

    const startBtn = buttonPrimary('Get Started', () => {
      step = 0;
      renderStep();
    });
    ctaRow.appendChild(startBtn);
    view.appendChild(ctaRow);

    // Enter key starts
    wrap.onkeydown = (e) => {
      if (step === -1 && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        startBtn.click();
      }
    };
  }

  function renderStep() {
    const q = questions[step];
    if (!q) {
      renderResults();
      return;
    }

    view.innerHTML = `
      <div class="card" style="padding: 26px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div style="font-weight:800; color:var(--muted);">Question ${step + 1} of ${questions.length}</div>
          <div style="height:8px; flex:1; margin-left:12px; background:var(--panel); border-radius:999px; overflow:hidden;">
            <div style="height:100%; width:${((step+1)/questions.length)*100}%; background:var(--accent);"></div>
          </div>
        </div>
        <h2 class="card-title" style="font-size:22px; margin:8px 0 14px;">${q.prompt}</h2>
        <div id="options" style="display:grid; gap:10px;"></div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
          <button class="btn" id="prevBtn">Back</button>
          <button class="btn primary" id="nextBtn" disabled>Next</button>
        </div>
      </div>
    `;

    const $opts = view.querySelector('#options');
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = opt.label;
      btn.style.justifyContent = 'flex-start';
      btn.style.width = '100%';
      btn.style.padding = '12px 14px';
      btn.setAttribute('data-val', opt.value);

      btn.addEventListener('click', () => {
        // clear active states
        $opts.querySelectorAll('.btn').forEach(b => {
          b.classList.remove('primary');
          b.style.border = '1px solid var(--line)';
        });
        btn.classList.add('primary');
        answers[q.id] = opt.value;
        view.querySelector('#nextBtn').disabled = false;
      });

      $opts.appendChild(btn);
    });

    // Back/Next handlers
    view.querySelector('#prevBtn').addEventListener('click', () => {
      if (step <= 0) {
        step = -1;
        renderIntro();
      } else {
        step -= 1;
        renderStep();
      }
    });

    view.querySelector('#nextBtn').addEventListener('click', () => {
      step += 1;
      renderStep();
    });

    // Enter advances if selected
    wrap.onkeydown = (e) => {
      if (e.key === 'Enter') {
        const next = view.querySelector('#nextBtn');
        if (next && !next.disabled) next.click();
      }
    };
  }

  function scoreServices() {
    // Reset all to false before scoring
    Object.keys(services).forEach(k => services[k].on = false);

    // Q1: callsPerDay → Unified Calling Interface if 20+ / 30+ / 50+
    const calls = answers['callsPerDay'];
    if (calls === '20+' || calls === '30+' || calls === '50+') {
      services['Unified Calling Interface'].on = true;
    }

    // Q2: smsCadence → Broadcast & 2-Way SMS if weekly+ or planning
    const sms = answers['smsCadence'];
    if (sms === 'weekly+' || sms === 'planning') {
      services['Broadcast & 2-Way SMS'].on = true;
    }

    // Q3: volunteerSize → Tasks & Volunteer Coordination if >= 25
    const volunteers = answers['volunteerSize'];
    if (volunteers === '25-100' || volunteers === '100+') {
      services['Tasks & Volunteer Coordination'].on = true;
    }

    // Q4: bilingual → Bilingual Messaging if any yes
    const bi = answers['bilingual'];
    if (bi === 'yes-es' || bi === 'yes-other') {
      services['Bilingual Messaging & Templates'].on = true;
    }

    // Q5: reporting → Analytics & CRM Sync if dashboards
    const rep = answers['reporting'];
    if (rep === 'dashboards') {
      services['Analytics & CRM Sync'].on = true;
    }
  }

  function renderResults() {
    scoreServices();

    // Build list of enabled services
    const enabled = Object.entries(services).filter(([, v]) => v.on);
    view.innerHTML = `
      <section class="features" aria-labelledby="rec-title">
        <div class="features-head">
          <h2 id="rec-title" class="features-title">Recommended for your organization</h2>
          <p class="features-sub">Based on your answers, these features will help you streamline outreach and engagement.</p>
        </div>
        <div class="feature-grid" id="rec-grid"></div>
        <div style="text-align:center; margin-top:18px;">
          <a href="#/services" class="btn" data-route>Back to Services</a>
          <a href="#/landing" class="btn primary" data-route>Return Home</a>
        </div>
      </section>
    `;

    const grid = view.querySelector('#rec-grid');
    if (enabled.length === 0) {
      grid.innerHTML = `
        <article class="feature-card card">
          <div class="feature-icon">✨</div>
          <h3 class="feature-title">No specific picks yet</h3>
          <p class="feature-desc">Try different answers or contact us for a tailored workflow.</p>
        </article>
      `;
      return;
    }

    grid.innerHTML = enabled.map(([name, meta]) => `
      <article class="feature-card card">
        <div class="feature-icon" aria-hidden="true">${meta.icon}</div>
        <h3 class="feature-title">${name}</h3>
        <p class="feature-desc">${meta.desc}</p>
      </article>`
    ).join('');
  }

  // Initial render (intro)
  renderIntro();
  return wrap;
}
