// Landing/screens/landing.js
import { servicesBanner } from '../components/servicesBanner.js';

export default function mount(root) {
  // Clear the screen
  root.innerHTML = '';

  // Typing Services Banner
  const banner = servicesBanner({
    services: [
      'Nonprofits',
      'Schools',
      'Small Businesses',
      'Political Campaigns',
      'Clinics',
      'Churches',
    ],
    serviceColor: '#2563eb', // light gray
    // typeSpeed: 80,
    // deleteSpeed: 45,
    holdTime: 1100,
  });
  root.appendChild(banner); 

  // Gif of services from the assets folder (inside the components folder)
  const gifSection = document.createElement('div');
  gifSection.style.textAlign = 'center';
  gifSection.style.marginTop = '25px';

  const gif = document.createElement('img');
  // Build URL relative to THIS file (screens/landing.js)
  gif.src = new URL('../components/assets/serviceMap.gif', import.meta.url).href;
  gif.alt = 'ReachPoint demo animation';
  gif.style.maxWidth = '100%';
  gif.style.width = '700px';
  gif.style.height = 'auto';
  gif.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 1)';

  // Optional: graceful fallback if the asset is missing / misnamed
  gif.onerror = () => {
    gif.replaceWith(Object.assign(document.createElement('div'), {
      className: 'card',
      innerHTML: `<p style="color:#9ca3af">GIF not found at <code>components/assets/serviceMap.gif</code>. Check filename & path.</p>`
    }));
  };

  gifSection.appendChild(gif);
  root.appendChild(gifSection);
}