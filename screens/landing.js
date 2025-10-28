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
}