// /screens/services.js
import { serviceRecommendationQuiz } from '../components/forms.js';

export default function mount(root) {
  root.innerHTML = `
    <div style="
      width:100%;
      padding:60px 24px 35px;
      text-align:center;
    ">
      <h1 style="
        font-size:clamp(36px, 6vw, 56px);
        font-weight:900;
        color:var(--ink);
        letter-spacing:-0.5px;
        line-height:1.1;
        margin-bottom:1px;
      ">
        Powerful. Efficient.
        <span style="color:var(--accent)">Easy.</span>
      </h1>

      <p style="
        font-size:20px;
        font-weight:400;
        color:var(--muted);
        max-width:720px;
        margin:0 auto;
        line-height:1.5;
      ">
      </p>
    </div>
  `;               
  const quiz = serviceRecommendationQuiz();
  root.appendChild(quiz);            // full-screen quiz
}
