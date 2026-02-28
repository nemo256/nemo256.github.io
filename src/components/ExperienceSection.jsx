/* ExperienceSection.jsx */
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
    org: "ESI · Algiers",
    desc: 'Specialized in Distributed Systems. Thesis on microservice orchestration. Graduated with distinction.',
  },
  {
    type: 'edu',
    period: '2017 — 2020',
    role: "Bachelor's in Computer Science",
    org: "USTHB · Algiers",
    desc: 'Algorithms, data structures, databases, and operating systems.',
  },
];

const TYPE_LABEL = { work: 'EXPERIENCE', cert: 'FORMATION', edu: 'EDUCATION' };

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function ExperienceSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="exp">
      <div className="exp__header">
        <span className="section-label">EXPERIENCE &amp; EDUCATION</span>
        <h2 className="exp__heading">
          CAREER &amp;<br />
          <span className="exp__heading-accent">EDUCATION</span>
        </h2>
      </div>

      <motion.div
        ref={ref}
        className="exp__list"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.09 } } }}
      >
        {ITEMS.map((entry, i) => (
          <motion.div key={i} className={`exp__entry exp__entry--${entry.type}`} variants={item}>
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
        ))}
      </motion.div>
    </div>
  );
}
