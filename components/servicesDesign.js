// /components/servicesDesign.js
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Auto-play "Before → After" comparison hero
 *
 * Props:
 * - beforeSrc: string      // required - URL/path to "Before" image
 * - afterSrc: string       // required - URL/path to "After" image
 * - titleBefore: string    // default: "Before ReachPoint"
 * - titleAfter: string     // default: "After ReachPoint"
 * - cycleMs: number        // total duration for one cycle (default 6000)
 * - holdBeforeMs: number   // time to hold "before" state (default 1800)
 * - transitionMs: number   // crossfade/wipe duration (default 1400)
 * - holdAfterMs: number    // time to hold "after" state (default 2000)
 * - loop: boolean          // whether to loop (default true)
 */
export default function ServicesDesign({
  beforeSrc,
  afterSrc,
  titleBefore = "Before ReachPoint",
  titleAfter = "After ReachPoint",
  cycleMs = 6000,
  holdBeforeMs = 1800,
  transitionMs = 1400,
  holdAfterMs = 2000,
  loop = true,
}) {
  const [phase, setPhase] = useState("before"); // "before" | "transition" | "after"
  const [cycleKey, setCycleKey] = useState(0);  // forces CSS keyframes restart

  // guard: if cycleMs not given, compute from parts
  const total =
    cycleMs ?? Math.max(holdBeforeMs + transitionMs + holdAfterMs, 1);

  useEffect(() => {
    let t1, t2, t3, tLoop;

    // 1) hold before
    setPhase("before");
    t1 = setTimeout(() => setPhase("transition"), holdBeforeMs);

    // 2) transition
    t2 = setTimeout(() => setPhase("after"), holdBeforeMs + transitionMs);

    // 3) hold after
    t3 = setTimeout(() => {
      if (loop) {
        setCycleKey((k) => k + 1); // restart CSS animations
      }
    }, total);

    // optional loop timer (when using exact total)
    if (loop) {
      tLoop = setInterval(() => {
        setCycleKey((k) => k + 1);
      }, total);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (tLoop) clearInterval(tLoop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cycleKey, loop, holdBeforeMs, transitionMs, total]);

  const headline = phase === "after" ? titleAfter : titleBefore;

  return (
    <section className="rp-hero" style={{ padding: "56px 0 24px" }}>
      <div className="app-root" style={{ paddingBottom: 0 }}>
        <div className="rp-hero-card">
          <div className="rp-hero-header">
            <h1 className="rp-hero-title">{headline}</h1>
            <p className="rp-hero-sub">
              Streamline communication and workflows from chaos to clarity.
            </p>
          </div>

          <figure className={`rp-stage rp-${phase}`} key={cycleKey}>
            {/* Before layer */}
            <img className="rp-before" src={beforeSrc} alt={titleBefore} />
            {/* After layer */}
            <img className="rp-after" src={afterSrc} alt={titleAfter} />
            {/* Animated wipe overlay for a "tidying" feel */}
            <div className="rp-wipe" aria-hidden />
          </figure>
        </div>
      </div>

      {/* Component-scoped styles */}
      <style>{`
        .rp-hero-card{
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 24px;
          box-shadow: var(--shadow);
        }
        .rp-hero-header{ display:grid; gap:8px; margin-bottom:14px; }
        .rp-hero-title{
          margin:0; font-weight:900; letter-spacing:.2px;
          font-size: clamp(24px, 4vw, 40px); color: var(--ink);
        }
        .rp-hero-sub{ margin:0; color: var(--muted); }

        .rp-stage{
          position: relative;
          width: 100%;
          aspect-ratio: 16/10;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--line);
          background: #0a0a0a;
        }
        .rp-stage img{
          position:absolute; inset:0; width:100%; height:100%;
          object-fit: cover; transform-origin: center;
        }

        /* Base visibility */
        .rp-before{ opacity:1; }
        .rp-after{ opacity:0; }

        /* Wipe overlay (animated during transition) */
        .rp-wipe{
          position:absolute; inset:0;
          background: radial-gradient(1200px 1200px at 50% 50%, rgba(37,99,235,0.12), transparent 60%);
          opacity:0; pointer-events:none;
        }

        /* ---- Keyframes ---- */
        @keyframes rpZoomOut {
          0%   { transform: scale(1.02); }
          100% { transform: scale(1.00); }
        }
        @keyframes rpZoomIn {
          0%   { transform: scale(1.00); }
          100% { transform: scale(1.02); }
        }
        @keyframes rpCrossFadeOut {
          0%   { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes rpCrossFadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes rpWipe {
          0%   { opacity: 0; clip-path: inset(0 100% 0 0); }
          30%  { opacity: .9; }
          100% { opacity: 0; clip-path: inset(0 0 0 0); }
        }

        /* ---- PHASES ---- */

        /* BEFORE: slight breathing to imply motion but keep image visible */
        .rp-before{
          animation: rpZoomIn ${Math.max(800, Math.floor(holdBeforeMs*0.7))}ms ease-out forwards;
        }
        .rp-before,
        .rp-after,
        .rp-wipe {
          /* ensure animations restart on key change */
          animation-delay: 0ms;
        }

        /* TRANSITION: crossfade + wipe */
        .rp-transition .rp-before{
          animation: rpCrossFadeOut ${transitionMs}ms ease-in forwards;
        }
        .rp-transition .rp-after{
          animation: rpCrossFadeIn ${transitionMs}ms ease-out forwards;
        }
        .rp-transition .rp-wipe{
          animation: rpWipe ${transitionMs}ms ease-in-out forwards;
        }

        /* AFTER: gentle focus/zoom to feel organized */
        .rp-after{
          animation: rpZoomOut ${Math.max(800, Math.floor(holdAfterMs*0.7))}ms ease-out forwards;
        }

        /* Responsive tweaks */
        @media (max-width: 640px){
          .rp-hero-title{ font-size: clamp(22px, 6vw, 28px); }
          .rp-stage{ aspect-ratio: 16/11; }
        }
      `}</style>
    </section>
  );
}
