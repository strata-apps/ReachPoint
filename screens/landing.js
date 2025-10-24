// Landing/screens/landing.js
import { servicesBanner } from '../components/servicesBanner.js';
import { servicesDesign } from '../components/servicesDesign.js';

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

  // Service Design illustration 
  const designSection = servicesDesign({
    beforeSrc: 'path/to/before-image.jpg',
    afterSrc: 'path/to/after-image.jpg',
    titleBefore: 'Before ReachPoint',
    titleAfter: 'After ReachPoint',
    cycleMs: 6000,
    holdBeforeMs: 1800,
    transitionMs: 1400,
    holdAfterMs: 2000,
    loop: true,
  });
  root.appendChild(designSection);  
}