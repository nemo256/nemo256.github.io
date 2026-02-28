/* ExperienceSection.jsx — each entry reveals individually on scroll */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './ExperienceSection.css';

const ITEMS = [
  {
    type: 'work',
    period: '2023 — NOW',
    role: 'Freelance Full-Stack Developer',
    org: 'Self-Employed',
    desc: 'Custom web apps for clients across Algeria and internationally — e-commerce, dashboards, automation.',
  },
  {
    type: 'work',
    period: '2022 — 2023',
    role: 'Junior Web Developer',
    org: 'Nexatech Solutions · Algiers',
    desc: 'Shipped client-facing features, introduced component-driven architecture that cut UI dev time by 35%.',
  },
  {
    type: 'work',
    period: '2021 — 2022',
    role: 'Front-End Developer Intern',
    org: 'DigitLab Agency · Algiers',
    desc: 'Built responsive landing pages and contributed to a React component library.',
  },
  {
    type: 'cert',
    period: '2023',
    role: 'Meta Front-End Developer Certificate',
    org: 'Meta / Coursera',
    desc: '9-course professional program covering React, accessibility, and UI/UX principles.',
  },
  {
    type: 'cert',
    period: '2022',
    role: 'Node.js Application Development (LFW211)',
    org: 'Linux Foundation',
    desc: 'Node.js internals, streams, REST APIs, and security best practices.',
  },
  {
    type: 'edu',
    period: '2020 — 2022',
    role: "Master's in Computer Science",
    org: 'ESI · Algiers',
    desc: 'Specialized in Distributed Systems. Thesis on microservice orchestration. Graduated with distinction.',
  },
  {
    type: 'edu',
    period: '2017 — 2020',
    role: "Bachelor's in Computer Science",
    org: 'USTHB · Algiers',
    desc: 'Algorithms, data structures, databases, and operating systems.',
  },
];

const TYPE_LABEL = { work: 'EXPERIENCE', cert: 'FORMATION', edu: 'EDUCATION' };

/* Each entry watches its own intersection */
function ExpEntry({ entry, index }) {
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
      <div className="exp__entry-line">
        <span className="exp__dot" />
      </div>
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
        <span className="section-label">EXPERIENCE &amp; EDUCATION</span>
        <h2 className="exp__heading">
          CAREER &amp;<br />
          <span className="exp__heading-accent">EDUCATION</span>
        </h2>
      </motion.div>

      <div className="exp__list">
        {ITEMS.map((entry, i) => (
          <ExpEntry key={i} entry={entry} index={i} />
        ))}
      </div>
    </div>
  );
}
