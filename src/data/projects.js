/* ============================================================
   src/data/projects.js
   ============================================================
   HOW TO ADD YOUR OWN IMAGES:
   1. Place images in src/assets/<projectId>/<n>.png
      e.g.  src/assets/1/1.png, src/assets/1/2.png ...
   2. Import them at the top of this file:
        import p1_1 from '../assets/1/1.png';
        import p1_2 from '../assets/1/2.png';
   3. Replace the picsum URLs below with the imported variables.

   HOW TO HIDE A BUTTON:
   - Leave demo or github as an empty string '' or remove the key
     entirely — the button will not render.
   ============================================================ */

// ── Uncomment and fill in when you have real images: ──────────
// import p1_1 from '../assets/1/1.png';
// import p1_2 from '../assets/1/2.png';
// import p2_1 from '../assets/2/1.png';
// ... etc.

import p1_1 from '../assets/1/1.png';
import p1_2 from '../assets/1/2.png';
import p1_3 from '../assets/1/3.png';

import p2_1 from '../assets/2/1.png';
import p2_2 from '../assets/2/2.png';

import p3_1 from '../assets/3/1.png';
import p3_2 from '../assets/3/2.png';
import p3_3 from '../assets/3/3.png';
import p3_4 from '../assets/3/4.png';
import p3_5 from '../assets/3/5.png';

import p4_1 from '../assets/4/1.png';
import p4_2 from '../assets/4/2.png';

import p5_1 from '../assets/5/1.png';
import p5_2 from '../assets/5/2.png';

import p6_1 from '../assets/6/1.png';
import p6_2 from '../assets/6/2.png';
import p6_3 from '../assets/6/3.png';
import p6_4 from '../assets/6/4.png';
import p6_5 from '../assets/6/5.png';
import p6_6 from '../assets/6/6.png';

export const projects = [
  {
    id: 1,
    title: 'SGT',
    description: 'SGT (Société Géante en Travaux) is a leading supplier of high quality products across Algeria',
    tags: ['NEXTJS', 'REACT', 'NODEJS', 'TAILWIND'],
    demo: 'https://sgt21.vercel.app/',
    github: 'https://github.com/nemo256/sgt',
    images: [
      p1_1,
      p1_2,
      p1_3,
    ],
  },
  {
    id: 2,
    title: 'EKRILI',
    description: 'EKRILI makes finding and renting homes in Algeria easy and secure',
    tags: ['REACT', 'NODEJS', 'TAILWIND'],
    demo: 'https://ekrili21.vercel.app/',
    github: 'https://github.com/nemo256/ekrili',
    images: [
      p2_1,
      p2_2,
    ],
  },
  {
    id: 3,
    title: 'DASHRECOURS',
    description: 'Modern Website to manage recourse in a university',
    tags: ['PHP', 'MYSQL'],
    demo: '',
    github: 'https://github.com/nemo256/DashRecours',
    images: [
      p3_1,
      p3_2,
      p3_3,
      p3_4,
      p3_5,
    ],
  },
  {
    id: 4,
    title: 'HOTEL',
    description: 'A modern hotel reservation app designed to make booking stays simple and fast',
    tags: ['NEXTJS', 'REACT', 'NODEJS', 'TAILWIND'],
    demo: 'https://hotel21.vercel.app/',
    github: 'https://github.com/nemo256/hotel',
    images: [
      p4_1,
      p4_2,
    ],
  },
  {
    id: 5,
    title: 'QAFILATY',
    description: 'Qafilaty is a smart system for managing and tracking parcels in real time',
    tags: ['React', 'Grafana', 'Docker'],
    demo: 'https://qafilaty-test.vercel.app/',
    github: 'https://github.com/nemo256/qafilaty-test',
    images: [
      p5_1,
      p5_2,
    ],
  },
  {
    id: 6,
    title: 'ARCHY',
    description: 'An automatic full arch linux installation script using my setup.',
    tags: ['LINUX','AUTOMATION', 'BASH', 'C'],
    demo: '',
    github: 'https://github.com/nemo256/archy',
    images: [
      p6_1,
      p6_2,
      p6_3,
      p6_4,
      p6_5,
      p6_6,
    ],
  },
];
