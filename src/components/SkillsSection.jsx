/* SkillsSection.jsx */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './SkillsSection.css';

const SKILLS = [
  'REACT', 'NEXT.JS', 'NODE.JS', 'POSTGRESQL',
  'TAILWIND', 'TYPESCRIPT', 'LINUX', 'DOCKER',
  'GRAPHQL', 'MONGODB', 'REDIS', 'BASH',
  'GIT', 'VITE', 'NGINX', 'FIGMA',
];

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
};

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="skills" id="skills">
      <div className="skills__header">
        <span className="section-label">SKILLS</span>
        <h2 className="skills__heading">
          TOOLS &amp;<br />
          <span className="skills__heading-accent">TECHNOLOGIES</span>
        </h2>
      </div>

      <motion.div
        ref={ref}
        className="skills__grid"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
      >
        {SKILLS.map((label) => (
          <motion.span
            key={label}
            className="pill skills__pill"
            variants={item}
            whileHover={{ scale: 1.06, backgroundColor: '#2a2a2a' }}
            whileTap={{ scale: 0.96, backgroundColor: '#2a2a2a' }}
            transition={{ duration: 0.18 }}
          >
            {label}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}
