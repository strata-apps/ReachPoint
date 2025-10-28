// Landing/components/servicesBanner.js
export function servicesBanner({
  titlePrefix = 'The Complete CRM for ',
  services = ['Agencies', 'Consultants', 'Startups'],
  typeSpeed = 90,       // ms per character when typing
  deleteSpeed = 50,     // ms per character when deleting
  holdTime = 1200,      // ms to hold the full word before deleting
  gapTime = 300,        // ms pause after deleting before next word
  serviceColor = '#0b1b3f', // navy blue
  className = '',       // optional extra classes
} = {}) {
  // Container
  const wrap = document.createElement('section');
  wrap.className = `services-banner ${className}`.trim();
  wrap.innerHTML = `
    <div class="sb-inner">
      <h1 class="sb-title">
        ${titlePrefix}<span class="sb-service"></span>
        <span class="sb-caret" aria-hidden="true"></span>
      </h1>
      <p class="sb-sub">The easiest and most efficient way to manage, contact and serve your community.</p>
    </div>
  `;

  // Minimal styles scoped to the component (safe to remove if you prefer global CSS)
  const style = document.createElement('style');
  style.textContent = `
    .services-banner {
      padding: clamp(32px, 6vw, 72px) 16px;
      display: grid;
      place-items: center;
      text-align: center;
    }
    .services-banner .sb-inner {
      max-width: 1100px;
      width: 100%;
    }
    .services-banner .sb-title {
      margin: 0;
      font-size: clamp(28px, 4.5vw, 54px);
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: .2px;
      color: #0f0f0fff;
    }
    .services-banner .sb-service {
      color: ${serviceColor};
      white-space: nowrap;
    }
    .services-banner .sb-caret {
      display: inline-block;
      width: 2px;
      height: 0.9em;
      background: ${serviceColor};
      margin-left: 2px;
      transform: translateY(2px);
      animation: sb-caret 1s steps(2, start) infinite;
    }
    @keyframes sb-caret { 50% { opacity: 0; } }
    .services-banner .sb-sub {
      margin: 14px auto 0;
      color: #000000ff;
      font-size: clamp(14px, 1.6vw, 18px);
      max-width: 740px;
    }
  `;
  wrap.prepend(style);

  // Typing logic
  const target = wrap.querySelector('.sb-service');
  let wordIdx = 0;
  let text = '';
  let typing = true; //
  let rafId = 0;
  let timerId = 0;

  function setText(t) {
    text = t;
    target.textContent = t;
  }

  function nextWordIndex(i) {
    return (i + 1) % services.length;
  }

  function typeLoop() {
    const current = services[wordIdx] ?? '';
    if (typing) {
      const next = current.slice(0, text.length + 1);
      setText(next);
      if (next.length === current.length) {
        // Hold, then start deleting
        timerId = setTimeout(() => { typing = false; step(deleteSpeed); }, holdTime);
        return;
      }
      step(typeSpeed);
    } else {
      const next = current.slice(0, Math.max(0, text.length - 1));
      setText(next);
      if (next.length === 0) {
        // Move to next word, pause, then type
        wordIdx = nextWordIndex(wordIdx);
        timerId = setTimeout(() => { typing = true; step(typeSpeed); }, gapTime);
        return;
      }
      step(deleteSpeed);
    }
  }

  function step(delay) {
    timerId = setTimeout(() => {
      rafId = requestAnimationFrame(typeLoop);
    }, delay);
  }

  // Start
  setText('');
  step(typeSpeed);

  // Clean up if removed from DOM
  const observer = new MutationObserver(() => {
    if (!document.body.contains(wrap)) {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  return wrap;
}

export default servicesBanner;
