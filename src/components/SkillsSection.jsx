/* SkillsSection.jsx */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './SkillsSection.css';

const CATEGORIES = [
  { label: 'LANGUAGES',              items: ['JAVASCRIPT', 'PYTHON', 'C', 'C++'] },
  { label: 'FRAMEWORKS & LIBRARIES', items: ['REACT', 'NEXT.JS', 'NODE.JS', 'TAILWIND'] },
  { label: 'DATABASES',              items: ['POSTGRESQL', 'ORACLE'] },
  { label: 'DEVOPS & TOOLS',         items: ['GIT', 'DOCKER', 'LINUX', 'BASH', 'FIGMA'] },
];

function SkillPill({ item, index, inView }) {
  return (
    <motion.span
      className="skills__pill"
      initial={{ opacity: 0, scale: 0.7, y: 14 }}
      animate={inView
        ? { opacity: 1, scale: 1, y: 0 }
        : { opacity: 0, scale: 0.7, y: 14 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      whileHover={{ scale: 1.08, y: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="skills__pill-inner">{item}</span>
    </motion.span>
  );
}

function Category({ label, items, inView }) {
  return (
    <div className="skills__cat">
      <motion.span className="skills__cat-label"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
        {label}
      </motion.span>
      <div className="skills__cat-pills">
        {items.map((item, i) => (
          <SkillPill key={item} item={item} index={i} inView={inView} />
        ))}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const ref          = useRef(null);
  const inView       = useInView(ref, { once: false, margin: '-80px' });
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: false, margin: '-80px' });

  return (
    <div className="skills" id="skills" ref={ref}>
      <div className="skills__header" ref={headerRef}>
        <motion.h2 className="skills__heading"
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={headerInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.88, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          TOOLS &amp;<br />
          <span className="skills__heading-accent">TECHNOLOGIES</span>
        </motion.h2>
      </div>

      <div className="skills__grid">
        {CATEGORIES.map((cat) => (
          <Category key={cat.label} label={cat.label} items={cat.items} inView={inView} />
        ))}
      </div>
    </div>
  );
}
