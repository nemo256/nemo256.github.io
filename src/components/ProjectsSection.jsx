/* ProjectsSection.jsx — scroll reveal grid, Show More */
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects.js';
import './ProjectsSection.css';
import { BorderBeam } from './ui/border-beam.jsx';

const INITIAL_COUNT = 3;

function PillLink({ href, icon: Icon, label }) {
  if (!href) return null;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="proj__pill-link"
      title={label}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Icon size={15} strokeWidth={1.4} />
      <motion.span
        className="proj__pill-label"
        variants={{
          rest:  { width: 0, opacity: 0, marginLeft: 0 },
          hover: { width: 'auto', opacity: 1, marginLeft: 6 },
        }}
        transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-10% 0px -10% 0px' });

  return (
    <motion.div
      ref={ref}
      className="proj__card"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
    >
      {/* Image */}
      <div className="proj__card-img-wrap">
        <motion.img
          src={project.images[0]}
          alt={project.title}
          className="proj__card-img"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="proj__card-overlay" />
      </div>

      {/* BorderBeam */}
      <BorderBeam duration={8} size={180} delay={index * 1.5} />

      {/* Content */}
      <div className="proj__card-content">
        <h3 className="proj__card-title">{project.title}</h3>
        <p className="proj__card-desc">{project.description}</p>

        <div className="proj__card-tags">
          {project.tags.map((t) => (
            <span key={t} className="proj__tag">{t}</span>
          ))}
        </div>

        <div className="proj__card-links">
          <PillLink href={project.demo}   icon={ExternalLink} label="DEMO"   />
          <PillLink href={project.github} icon={Github}       label="GITHUB" />
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: false, margin: '-80px' });

  const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);
  const hidden  = projects.slice(INITIAL_COUNT);

  return (
    <div className="proj-section">
      {/* Section heading with scroll reveal scale */}
      <div className="proj-section__header" ref={headerRef}>
        <motion.h2
          className="proj-section__heading"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={headerInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.88, y: 24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="proj-section__heading-accent">PROJECTS</span>
        </motion.h2>
      </div>

      {/* Cards grid */}
      <div className="proj__grid">
        {visible.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}

        {/* Reveal remaining with animation */}
        <AnimatePresence>
          {showAll && hidden.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            >
              <ProjectCard project={project} index={INITIAL_COUNT + i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More / Show Less button */}
      {projects.length > INITIAL_COUNT && (
        <div className="proj__show-more-wrap">
          <motion.button
            className="proj__show-more"
            onClick={() => setShowAll((v) => !v)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {showAll ? 'SHOW LESS' : 'SHOW MORE'}
          </motion.button>
        </div>
      )}
    </div>
  );
}
