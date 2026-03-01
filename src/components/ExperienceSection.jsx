/* ExperienceSection.jsx */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './ExperienceSection.css';

const ITEMS = [
  { type: 'work', period: '2024 — NOW',  role: 'Full-Stack Developer', org: 'SONATRACH · Algiers', desc: 'Building and maintaining internal web applications and systems.' },
  { type: 'work', period: '2023 — 2024', role: 'Front-End Developer',  org: 'EKRILI · Algiers', desc: 'Developing and enhancing the startup’s web interface, focusing on responsive design, performance, and user experience.' },
  { type: 'work', period: '2022 — 2023', role: 'Part-Time Professor',  org: 'University of Boumerdes · Boumerdes',   desc: 'Teaching and supporting students with course materials, assignments, and academic guidance.' },
  { type: 'cert', period: '2025',        role: 'CEH (Certified Ethical Hacker) Certificate', org: 'SONATRACH MANAGEMENT ACADEMY', desc: 'Certified in ethical hacking fundamentals, penetration testing, and cybersecurity best practices.' },
  { type: 'cert', period: '2024',        role: 'Project Management Certificate', org: 'SONATRACH MANAGEMENT ACADEMY · ORAN', desc: 'Learned project planning, team collaboration, and project delivery using Agile and Scrum practices.' },
  { type: 'cert',  period: '2024',       role: "Microsoft Configuration Manager (SCCM) Certificate",   org: 'SONATRACH MANAGEMENT ACADEMY · ORAN', desc: 'Trained in system deployment, configuration management, and enterprise infrastructure administration.' },
  { type: 'edu',  period: '2020 — 2022', role: "Master's in Information Technology", org: 'University of Boumerdes · Boumerdes',        desc: 'Studied software development, databases, and computer systems fundamentals.' },
  { type: 'edu',  period: '2017 — 2020', role: "Bachelor's in Information Systems", org: 'University of Boumerdes · Boumerdes',         desc: 'Algorithms, data structures, databases, and operating systems.' },
];

const TYPE_LABEL = { work: 'EXPERIENCE', cert: 'FORMATION', edu: 'EDUCATION' };

function ExpEntry({ entry }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' });
  return (
    <motion.div
      ref={ref}
      className={`exp__entry exp__entry--${entry.type}`}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="exp__entry-left">
        <span className="exp__type">{TYPE_LABEL[entry.type]}</span>
        <span className="exp__period">{entry.period}</span>
      </div>
      <div className="exp__entry-line"><span className="exp__dot" /></div>
      <div className="exp__entry-right">
        <h3 className="exp__role">{entry.role}</h3>
        <span className="exp__org">{entry.org}</span>
        <p className="exp__desc">{entry.desc}</p>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <div className="exp">
      <motion.div
        ref={headerRef}
        className="exp__header"
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="exp__heading">
          CAREER &amp;<br />
          <span className="exp__heading-accent">EDUCATION</span>
        </h2>
      </motion.div>

      <div className="exp__list">
        {ITEMS.map((entry, i) => <ExpEntry key={i} entry={entry} />)}
      </div>
    </div>
  );
}
