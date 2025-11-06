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

      <!-- Heading -->
      <h2 style="
        font-size:clamp(34px, 5vw, 52px);
        font-weight:900;
        color:#111827;          /* deep slate (screenshot exact) */
        letter-spacing:-0.5px;
        line-height:1.15;
        margin:0 0 18px 0;
      ">
        Bringing Enterprise-Level Solutions to
        <span style="
          color:#2563eb;        /* EXACT blue from screenshot */
        ">
          Grassroots Movements.
        </span>
      </h2>

      <!-- Paragraph -->
      <p style="
        font-size:18px;
        font-weight:400;
        color:#6b7280;          /* gray-500 exactly */
        max-width:720px;
        margin:0 auto;
        line-height:1.6;
      ">
        The mission behind ReachPoint is to ensure that service-oriented nonprofits,
        small businesses, academic institutions, and grassroots movements can serve
        their communities without economic or technological barriers. These
        organizations are the lifeline of our communities—we help you reach your mission.
      </p>

    </div>
  `;

  sec.classList.add('reveal');
  return sec;
}

