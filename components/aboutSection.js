// components/aboutSection.js
export function aboutSection() {
  const sec = document.createElement('section');
  sec.className = 'about-section';
  sec.innerHTML = `
    <div style="
      width:100%;
      padding:60px 24px;
      text-align:center;
    ">
      <h2 style="
        font-size:clamp(32px, 5vw, 48px);
        font-weight:900;
        color:var(--ink);
        letter-spacing:-0.5px;
        line-height:1.1;
        margin:0 0 10px 0;
      ">
        Bringing Enterprise-Level Solutions to
        <span style="color:var(--accent)">Grassroots Movements.</span>
      </h2>

      <p style="
        font-size:18px;
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
  `;

  // optional fade-in if you use IntersectionObserver elsewhere
  //sec.classList.add('reveal');
  return sec;
} 
 