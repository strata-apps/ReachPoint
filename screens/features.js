// /screens/services.js
import { serviceRecommendationQuiz } from '../components/forms.js';

export default function mount(root) {
  root.innerHTML = '';               // clear screen
  const quiz = serviceRecommendationQuiz();
  root.appendChild(quiz);            // full-screen quiz
}
