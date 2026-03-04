/* SkillsSection.jsx */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './SkillsSection.css';
import { BorderBeam } from './ui/border-beam.jsx';

const CATEGORIES = [
  { label: 'LANGUAGES',              items: ['JAVASCRIPT', 'PYTHON', 'C', 'C++'] },
  { label: 'FRAMEWORKS & LIBRARIES', items: ['REACT', 'NEXT.JS', 'NODE.JS', 'TAILWIND'] },
  { label: 'DATABASES',              items: ['POSTGRESQL', 'ORACLE'] },
  { label: 'DEVOPS & TOOLS',         items: ['GIT', 'DOCKER', 'LINUX', 'BASH', 'FIGMA'] },
];

const pillAnim = {
  hidden: { opacity: 0, scale: 0.82, y: 10 },
  show:   { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
};

function SkillPill({ item }) {
  return (
    <motion.span
      className="skills__pill"
      variants={pillAnim}
      whileHover="hovered"
      whileTap={{ scale: 0.95 }}
      style={{ position: 'relative' }}
    >
      {/* Border beam on hover only via CSS opacity */}
      <BorderBeam duration={6} size={100} />
      <motion.span
        className="skills__pill-inner"
        variants={{
          hovered: { letterSpacing: '3.5px' },
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {item}
      </motion.span>
    </motion.span>
  );
}

function Category({ label, items, inView }) {
  return (
    <div className="skills__cat">
      <span className="skills__cat-label">{label}</span>
      <motion.div
        className="skills__cat-pills"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.07 } }, hidden: { transition: { staggerChildren: 0.03 } } }}
      >
        {items.map((item) => <SkillPill key={item} item={item} />)}
      </motion.div>
    </div>
  );
}

export default function SkillsSection() {
  const ref       = useRef(null);
  /* once:false = re-animates on scroll back up */
  const inView    = useInView(ref, { once: false, margin: '-80px' });
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false, margin: '-80px' });

  return (
    <div className="skills" id="skills" ref={ref}>
      <div className="skills__header" ref={headerRef}>
        <motion.h2
          className="skills__heading"
          initial={{ opacity: 0, scale: 0.88, y: 24 }}
          animate={headerInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.88, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
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
