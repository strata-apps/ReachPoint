// /screens/services.js
import { serviceRecommendationQuiz } from '../components/forms.js';

export default function mount(root) {
  root.innerHTML = `
    <div style="
      width:100%;
      padding:60px 24px 8px;
      text-align:center;
    ">
      <h1 style="
        font-size:clamp(36px, 6vw, 56px);
        font-weight:900;
        color:var(--ink);
        letter-spacing:-0.5px;
        line-height:1.1;
        margin-bottom:0px;
      ">
        Powerful. Efficient.
        <span style="color:var(--accent)">Easy.</span>
      </h1>
    </div>
  `;               
  const quiz = serviceRecommendationQuiz();
  quiz.style.marginTop = "-10px";      // pull quiz up slightly
  quiz.style.paddingTop = "0px";        // remove default padding
  root.appendChild(quiz);           // full-screen quiz
}
