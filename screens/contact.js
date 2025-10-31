// /screens/contact.js
export default function mount(root) {
  // Full-screen wrapper (same feel as forms.js quiz)
  const wrap = document.createElement('section');
  wrap.style.background = '#ffffff';
  wrap.style.minHeight = 'calc(100dvh - 140px)';
  wrap.style.display = 'grid';
  wrap.style.placeItems = 'center';
  wrap.style.padding = '24px 0';

  // Centered inner view
  const view = document.createElement('div');
  view.style.width = '100%';
  view.style.maxWidth = '880px';
  view.style.margin = '0 auto';
  wrap.appendChild(view);

  // Simple helpers
  const states = [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida',
    'Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine',
    'Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska',
    'Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
    'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas',
    'Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
  ];

  function input({ id, label, type = 'text', required = true, placeholder = '' }) {
    const w = document.createElement('div');
    w.style.marginBottom = '12px';
    w.innerHTML = `
      <label for="${id}" style="display:block; font-weight:700; color:var(--ink); margin-bottom:6px;">
        ${label}${required ? ' *' : ''}
      </label>
      <input id="${id}" type="${type}" placeholder="${placeholder}" 
             style="
               width:100%; background:#fff; color:var(--ink);
               border:1px solid var(--line); border-radius:10px;
               padding:12px 14px; outline:none;
             " ${required ? 'required' : ''}/>
    `;
    return w;
  }

  function select({ id, label, options = [], required = true }) {
    const w = document.createElement('div');
    w.style.marginBottom = '12px';
    const opts = options.map(o => `<option value="${o.value ?? o}">${o.label ?? o}</option>`).join('');
    w.innerHTML = `
      <label for="${id}" style="display:block; font-weight:700; color:var(--ink); margin-bottom:6px;">
        ${label}${required ? ' *' : ''}
      </label>
      <select id="${id}" 
              style="
                width:100%; background:#fff; color:var(--ink);
                border:1px solid var(--line); border-radius:10px;
                padding:12px 14px; outline:none;
              " ${required ? 'required' : ''}>
        ${opts}
      </select>
    `;
    return w;
  }

  function textarea({ id, label, required = false, placeholder = '' }) {
    const w = document.createElement('div');
    w.style.marginBottom = '12px';
    w.innerHTML = `
      <label for="${id}" style="display:block; font-weight:700; color:var(--ink); margin-bottom:6px;">
        ${label}${required ? ' *' : ' (optional)'}
      </label>
      <textarea id="${id}" rows="4" placeholder="${placeholder}"
        style="
          width:100%; background:#fff; color:var(--ink);
          border:1px solid var(--line); border-radius:10px;
          padding:12px 14px; outline:none; resize:vertical;
        " ${required ? 'required' : ''}></textarea>
    `;
    return w;
  }

  // Render the card form
  view.innerHTML = `
    <div class="card" style="padding: 26px;">
      <h2 class="card-title" style="font-size:24px; margin:0 0 12px;">
        Let’s connect — tell us about your team
      </h2>
      <p style="color:var(--muted); margin:0 0 16px;">
        Share a few details and our team will reach out shortly.
      </p>
      <div id="contact-form-fields"></div>
      <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:16px;">
        <button class="btn" id="resetBtn">Clear</button>
        <button class="btn primary" id="submitBtn">Submit</button>
      </div>
    </div>
  `;

  const fields = view.querySelector('#contact-form-fields');

  // Row 1: First / Last
  const row1 = document.createElement('div');
  row1.style.display = 'grid';
  row1.style.gap = '12px';
  row1.style.gridTemplateColumns = '1fr 1fr';
  row1.appendChild(input({ id: 'firstName', label: 'First Name' }));
  row1.appendChild(input({ id: 'lastName', label: 'Last Name' }));
  fields.appendChild(row1);

  // Row 2: Email / Phone
  const row2 = document.createElement('div');
  row2.style.display = 'grid';
  row2.style.gap = '12px';
  row2.style.gridTemplateColumns = '1fr 1fr';
  row2.appendChild(input({ id: 'companyEmail', label: 'Company Email', type: 'email', placeholder: 'name@company.org' }));
  row2.appendChild(input({ id: 'phoneNumber', label: 'Phone Number', type: 'tel', placeholder: '(555) 555-5555', required: false }));
  fields.appendChild(row2);

  // Row 3: Preferred method / Region (states)
  const row3 = document.createElement('div');
  row3.style.display = 'grid';
  row3.style.gap = '12px';
  row3.style.gridTemplateColumns = '1fr 1fr';
  row3.appendChild(select({
    id: 'preferredMethod',
    label: 'Preferred Contact Method',
    options: [
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
    ]
  }));
  row3.appendChild(select({
    id: 'region',
    label: 'Region',
    options: states.map(s => ({ label: s, value: s }))
  }));
  fields.appendChild(row3);

  // Row 4: Number of Users
  fields.appendChild(select({
    id: 'numUsers',
    label: 'Number of Users',
    options: [
      { label: '1–10', value: '1-10' },
      { label: '11–25', value: '11-25' },
      { label: '26–50', value: '26-50' },
      { label: '51–100', value: '51-100' },
      { label: '101–250', value: '101-250' },
      { label: '251+', value: '251+' },
    ]
  }));

  // Row 5: Details (optional)
  fields.appendChild(textarea({
    id: 'details',
    label: 'Details',
    required: false,
    placeholder: 'Share goals, timelines, or anything we should know…'
  }));

  // Buttons
  const $submit = view.querySelector('#submitBtn');
  const $reset  = view.querySelector('#resetBtn');

  $reset.addEventListener('click', () => {
    view.querySelectorAll('input, select, textarea').forEach(el => {
      if (el.tagName === 'SELECT') el.selectedIndex = 0;
      else el.value = '';
    });
  });

  $submit.addEventListener('click', () => {
    // Collect values
    const get = id => view.querySelector('#' + id)?.value?.trim() || '';
    const firstName = get('firstName');
    const lastName = get('lastName');
    const companyEmail = get('companyEmail');
    const phoneNumber = get('phoneNumber');
    const preferredMethod = get('preferredMethod') || 'email';
    const region = get('region');
    const numUsers = get('numUsers');
    const details = get('details');

    // Basic inline validation (email; phone if preferred = phone)
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyEmail);
    const phoneOk = preferredMethod === 'phone'
      ? /[\d\-\+\(\)\.\s]{7,}/.test(phoneNumber)
      : true;

    if (!firstName || !lastName || !companyEmail || !region || !numUsers || !emailOk || !phoneOk) {
      alert('Please complete required fields. If you chose Phone as your preferred method, include a valid phone number.');
      return;
    }

    // TODO: send to your backend / Supabase if desired
    // For now, show confirmation card
    view.innerHTML = `
      <div class="card" style="padding: 36px; text-align:center;">
        <div style="font-size:44px; margin-bottom:10px;">✅</div>
        <h3 class="card-title" style="font-size:22px; margin:0 0 8px;">
          Thanks, ${firstName}! Your message has been sent.
        </h3>
        <p style="color:var(--muted); margin:0 0 18px;">
          Our team will contact you via <strong>${preferredMethod}</strong> soon.
        </p>
        <div style="display:flex; gap:12px; justify-content:center;">
          <a href="#/features" class="btn primary" data-route>View Features</a>
          <a href="#/" class="btn" data-route>Back to Home</a>
        </div>
      </div>
    `;
  });

  // Mount
  root.innerHTML = '';
  root.appendChild(wrap);
}
