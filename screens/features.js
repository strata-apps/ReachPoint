// /screens/services.js
import { serviceRecommendationQuiz } from '../components/forms.js';

export default function mount(root) {
  root.innerHTML = `
    <div class="sb-inner">
      <h1 class="sb-title">
        <span style="text-align:center; text-weight:bold">Powerful. Efficient.<span class="sb-service">Easy.</span></span>
        <span class="sb-caret" aria-hidden="true"></span>
      </h1>
    </div>
  `;               
  const quiz = serviceRecommendationQuiz();
  root.appendChild(quiz);            // full-screen quiz
}
