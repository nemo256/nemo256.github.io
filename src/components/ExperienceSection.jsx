/* ExperienceSection.jsx — pixel-perfect living timeline */
import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import './ExperienceSection.css';

const ITEMS = [
  { type: 'work', period: '2024 — NOW',  role: 'Full-Stack Developer',           org: 'SONATRACH · Algiers',             desc: "Building and maintaining internal web applications and systems for one of Africa's largest energy companies." },
  { type: 'work', period: '2023 — 2024', role: 'Front-End Developer',            org: 'EKRILI · Algiers',                desc: "Developing the startup's web interface — responsive design, performance, and user experience." },
  { type: 'work', period: '2022 — 2023', role: 'Part-Time Professor',            org: 'University of Boumerdes',         desc: 'Teaching and supporting students with course materials, assignments, and academic guidance.' },
  { type: 'cert', period: '2025',        role: 'Certified Ethical Hacker (CEH)', org: 'SONATRACH MGMT ACADEMY',          desc: 'Certified in ethical hacking fundamentals, penetration testing, and cybersecurity best practices.' },
  { type: 'cert', period: '2024',        role: 'Project Management',             org: 'SONATRACH MGMT ACADEMY · ORAN',  desc: 'Project planning, team collaboration, and delivery using Agile and Scrum practices.' },
  { type: 'cert', period: '2024',        role: 'Microsoft SCCM',                 org: 'SONATRACH MGMT ACADEMY · ORAN',  desc: 'System deployment, configuration management, and enterprise infrastructure administration.' },
  { type: 'edu',  period: '2020 — 2022', role: "Master's — Information Technology", org: 'University of Boumerdes',     desc: 'Advanced software development, databases, networks, and computer systems fundamentals.' },
  { type: 'edu',  period: '2017 — 2020', role: "Bachelor's — Information Systems",  org: 'University of Boumerdes',     desc: 'Algorithms, data structures, databases, operating systems, and software engineering.' },
];

const BADGE_LABEL = { work: 'WORK', cert: 'CERTIFICATION', edu: 'EDUCATION' };

function TimelineItem({ entry }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-5% 0px -5% 0px' });

  return (
    <motion.div ref={ref} className={`tl__item tl__item--${entry.type}`}
      initial={{ opacity: 0, x: -52 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -52 }}
      transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}>

      {/* The dot lives INSIDE the item row, in the dot column.
          It is vertically centred at the top of the card (top of badge row).
          The rail line is a separate absolutely-positioned element that
          runs behind all items — its left position is calculated to
          hit the exact centre of .tl__dot-col. */}
      <div className="tl__dot-col">
        <motion.div className={`tl__dot tl__dot--${entry.type}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.1 }} />
      </div>

      <div className="tl__card">
        <div className="tl__card-meta">
          <span className={`tl__badge tl__badge--${entry.type}`}>{BADGE_LABEL[entry.type]}</span>
          <span className="tl__period">{entry.period}</span>
        </div>
        <h3 className="tl__role">{entry.role}</h3>
        <span className="tl__org">{entry.org}</span>
        <p className="tl__desc">{entry.desc}</p>
      </div>
    </motion.div>
  );
}

/* The live line is absolutely positioned over the entire .tl__body,
   running exactly down the centre-line of .tl__dot-col.
   CSS variable --dot-col-w controls the column width and is used
   here to keep the JS and CSS in sync: line left = dotColW / 2. */
function LiveLine({ bodyRef }) {
  const { scrollYProgress } = useScroll({
    target: bodyRef,
    offset: ['start 78%', 'end 22%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 55, damping: 16 });

  return (
    <>
      <div className="tl__rail" />
      <motion.div className="tl__live-line" style={{ scaleY, originY: 0 }} />
    </>
  );
}

export default function ExperienceSection() {
  const bodyRef      = useRef(null);
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: false, margin: '-80px' });

  return (
    <div className="tl-section">
      <motion.div ref={headerRef} className="tl__header"
        initial={{ opacity: 0, y: 28, scale: 0.9 }}
        animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 28, scale: 0.9 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
        <h2 className="tl__heading">
          CAREER &amp;<br />
          <span className="tl__heading-accent">EDUCATION</span>
        </h2>
      </motion.div>

      <div className="tl__body" ref={bodyRef}>
        <LiveLine bodyRef={bodyRef} />
        {ITEMS.map((entry, i) => <TimelineItem key={i} entry={entry} />)}
      </div>
    </div>
  );
}
