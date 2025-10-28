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
  gifSection.style.marginTop = '40px';

  const gif = document.createElement('img');
  gif.src = '../components/assets/serviceMap.gif';
  gif.alt = 'ReachPoint demo animation';
  gif.style.maxWidth = '90%';
  gif.style.height = 'auto';
  gif.style.borderRadius = '12px';
  gif.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';

  gifSection.appendChild(gif);
  root.appendChild(gifSection);
}