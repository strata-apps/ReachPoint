// Landing/screens/landing.js
import { servicesBanner } from '../components/servicesBanner.js';
import {
  servicesSection,
  servicesActionSection,
  comparisonMatrixSection,
  ctaBandSection
} from '../components/services.js';
 

export default function mount(root) {
  // Clear the screen
  root.innerHTML = '';

  // --- Scroll-reveal setup ---------------------------------
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

  // helper: mark a node as reveal-on-scroll (+ optional stagger delay)
  function reveal(node, delayMs = 0) {
    node.classList.add('reveal');
    if (delayMs) node.style.transitionDelay = `${delayMs}ms`;
    io.observe(node);
    return node;
  }

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

  banner.style.marginTop = '18px';
  
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

  // Comparison matrix
  root.appendChild(comparisonMatrixSection());

    // “In Action” cards 
  //root.appendChild(servicesActionSection());

  // CTA band
  root.appendChild(ctaBandSection());
}