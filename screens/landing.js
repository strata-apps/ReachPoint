// Landing/screens/landing.js
import { servicesBanner } from '../components/servicesBanner.js';

export default function mount(root) {
  // Clear the screen
  root.innerHTML = '';

  // Create the Services Banner with your list:
  const banner = servicesBanner({
    services: [
      'Nonprofits',
      'Education Institutions',
      'Small Businesses',
      'Political Campaigns',
      'Healthcare',
    ],
    serviceColor: '#e9e9e9', // light gray
    // typeSpeed: 80,
    // deleteSpeed: 45,
    holdTime: 1100,
  });

  // Append to the page
  root.appendChild(banner);

  // You can continue composing the rest of the landing content below…
  // const nextSection = document.createElement('section');
  // nextSection.textContent = '…';
  // root.appendChild(nextSection);
}
