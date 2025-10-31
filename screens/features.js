// /screens/services.js
import { serviceRecommendationQuiz } from '../components/forms.js';

export default function mount(root) {
  root.innerHTML = `
    <div class="sb-inner">
      <h1 class="sb-title">
        Powerful. Efficient.<span class="sb-service">Easy.</span>
        <span class="sb-caret" aria-hidden="true"></span>
      </h1>
      <p class="sb-sub">The easiest and most efficient way to manage, contact and serve your community.</p>
    </div>
  `;               
  const quiz = serviceRecommendationQuiz();
  root.appendChild(quiz);            // full-screen quiz
}
