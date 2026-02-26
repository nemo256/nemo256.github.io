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

export const projects = [
  {
    id: 1,
    title: 'NEURAL DASHBOARD',
    description: 'A real-time analytics platform powered by machine learning. Visualizes complex datasets through interactive charts and predictive modeling interfaces.',
    tags: ['React', 'Python', 'PostgreSQL'],
    demo: 'https://example.com/demo1',   // ← leave '' to hide the button
    github: 'https://github.com/example/neural-dashboard',
    images: [
      // Replace with: p1_1, p1_2, p1_3
      'https://picsum.photos/seed/proj1a/1200/700',
      'https://picsum.photos/seed/proj1b/1200/700',
      'https://picsum.photos/seed/proj1c/1200/700',
    ],
  },
  {
    id: 2,
    title: 'VOID COMMERCE',
    description: 'A full-stack e-commerce engine with headless architecture. Features blazing-fast SSR, real-time inventory management and a custom checkout flow.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
    demo: 'https://example.com/demo2',
    github: '',   // ← empty = button hidden
    images: [
      'https://picsum.photos/seed/proj2a/1200/700',
      'https://picsum.photos/seed/proj2b/1200/700',
      'https://picsum.photos/seed/proj2c/1200/700',
    ],
  },
  {
    id: 3,
    title: 'CIPHER CHAT',
    description: 'End-to-end encrypted messaging app with ephemeral rooms, file sharing, and zero-knowledge authentication protocols.',
    tags: ['React', 'WebSockets', 'Redis'],
    demo: '',     // ← empty = button hidden
    github: 'https://github.com/example/cipher-chat',
    images: [
      'https://picsum.photos/seed/proj3a/1200/700',
      'https://picsum.photos/seed/proj3b/1200/700',
      'https://picsum.photos/seed/proj3c/1200/700',
    ],
  },
  {
    id: 4,
    title: 'GHOST API',
    description: 'A high-performance REST & GraphQL gateway with automatic rate limiting, caching layers, and self-documenting schema generation.',
    tags: ['Node.js', 'GraphQL', 'PostgreSQL'],
    demo: 'https://example.com/demo4',
    github: 'https://github.com/example/ghost-api',
    images: [
      'https://picsum.photos/seed/proj4a/1200/700',
      'https://picsum.photos/seed/proj4b/1200/700',
      'https://picsum.photos/seed/proj4c/1200/700',
    ],
  },
  {
    id: 5,
    title: 'MATRIX MONITOR',
    description: 'DevOps observability suite with custom alerting pipelines, log aggregation, and infrastructure health visualization across cloud providers.',
    tags: ['React', 'Grafana', 'Docker'],
    demo: 'https://example.com/demo5',
    github: 'https://github.com/example/matrix-monitor',
    images: [
      'https://picsum.photos/seed/proj5a/1200/700',
      'https://picsum.photos/seed/proj5b/1200/700',
      'https://picsum.photos/seed/proj5c/1200/700',
    ],
  },
  {
    id: 6,
    title: 'ZERO KERNEL',
    description: 'A lightweight custom Linux kernel module for low-latency network packet filtering. Built for high-throughput server environments.',
    tags: ['C', 'Linux', 'Networking'],
    demo: 'https://example.com/demo6',
    github: 'https://github.com/example/zero-kernel',
    images: [
      'https://picsum.photos/seed/proj6a/1200/700',
      'https://picsum.photos/seed/proj6b/1200/700',
      'https://picsum.photos/seed/proj6c/1200/700',
    ],
  },
];
