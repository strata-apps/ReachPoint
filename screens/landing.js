// Landing/screens/landing.js
import { servicesBanner } from '../components/servicesBanner.js';
import {
  servicesSection,
  servicesActionSection,
  comparisonMatrixSection
} from '../components/services.js';


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

  // Video of services from the assets folder (inside the components folder)
  const videoSection = document.createElement('div');
  videoSection.style.textAlign = 'center';
  videoSection.style.marginTop = '8px';

  const video = document.createElement('video');
  // Build URL relative to THIS file (screens/landing.js)
  video.src = new URL('../components/assets/fullserviceMap.mp4', import.meta.url).href;
  video.alt = 'ReachPoint demo animation';
  video.style.maxWidth = '100%';
  video.style.width = '1200px';
  video.style.height = 'auto';
  video.controls = true;

  // 👇 Key settings for silent looping playback
  video.autoplay = true;   // start automatically
  video.loop = true;       // loop forever
  video.muted = true;      // required for autoplay to work in browsers
  video.playsInline = true; // avoids full-screen behavior on mobile
  video.controls = false;  // hide controls
  video.style.backgroundColor = '#ffff';

  videoSection.appendChild(video);
  root.appendChild(videoSection);


  // features section
  root.appendChild(servicesSection());

  // “In Action” cards + CTA band
  root.appendChild(servicesActionSection());

  // Comparison matrix
  root.appendChild(comparisonMatrixSection());
}