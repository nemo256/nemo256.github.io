/* SkillsSection.jsx — categorized tools */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './SkillsSection.css';

const CATEGORIES = [
  {
    label: 'LANGUAGES',
    items: ['JAVASCRIPT', 'PYTHON', 'C', 'C++'],
  },
  {
    label: 'FRAMEWORKS & LIBRARIES',
    items: ['REACT', 'NEXT.JS', 'NODE.JS', 'TAILWIND'],
  },
  {
    label: 'DATABASES',
    items: ['POSTGRESQL', 'ORACLE'],
  },
  {
    label: 'DEVOPS & TOOLS',
    items: ['GIT', 'DOCKER', 'LINUX', 'BASH', 'FIGMA'],
  },
];

const pillAnim = {
  hidden: { opacity: 0, scale: 0.88, y: 8 },
  show:   { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

function Category({ label, items, inView }) {
  return (
    <div className="skills__cat">
      <span className="skills__cat-label">{label}</span>
      <motion.div
        className="skills__cat-pills"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      >
        {items.map((item) => (
          <motion.span
            key={item}
            className="pill skills__pill"
            variants={pillAnim}
            whileHover={{ scale: 1.06, backgroundColor: '#2a2a2a' }}
            whileTap={{ scale: 0.96, backgroundColor: '#2a2a2a' }}
            transition={{ duration: 0.18 }}
          >
            {item}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="skills" id="skills" ref={ref}>
      <div className="skills__header">
        <h2 className="skills__heading">
          TOOLS &amp;<br />
          <span className="skills__heading-accent">TECHNOLOGIES</span>
        </h2>
      </div>

      <div className="skills__grid">
        {CATEGORIES.map((cat) => (
          <Category key={cat.label} label={cat.label} items={cat.items} inView={inView} />
        ))}
      </div>
    </div>
  );
}
