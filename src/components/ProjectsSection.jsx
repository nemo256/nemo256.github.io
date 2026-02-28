/* ProjectsSection.jsx — horizontal carousel, one project at a time */
import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import './ProjectsSection.css';

function PillLink({ href, icon: Icon, label }) {
  if (!href) return null;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="pfs__pill-link"
      title={label}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Icon size={16} strokeWidth={1.4} />
      <motion.span
        className="pfs__pill-label"
        variants={{
          rest:  { width: 0, opacity: 0, marginLeft: 0 },
          hover: { width: 'auto', opacity: 1, marginLeft: 7 },
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
}

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.97 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.97 }),
};

export default function ProjectsSection() {
  const [[current, direction], setPage] = useState([0, 0]);
  const isThrottled = useRef(false);
  const touchStart = useRef(null);

  const goTo = useCallback((next) => {
    const clamped = Math.max(0, Math.min(projects.length - 1, next));
    setPage(([prev]) => [clamped, next > prev ? 1 : -1]);
  }, []);

  const prev = () => { if (current > 0) goTo(current - 1); };
  const next = () => { if (current < projects.length - 1) goTo(current + 1); };

  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const dx = touchStart.current - e.changedTouches[0].clientX;
    touchStart.current = null;
    if (Math.abs(dx) < 40) return;
    dx > 0 ? next() : prev();
  };

  const project = projects[current];

  return (
    <div className="proj-section">
      {/* Title styled like CAREER & EDUCATION */}
      <div className="proj-section__header">
        <h2 className="proj-section__heading">
          <span className="proj-section__heading-accent">PROJECTS</span>
        </h2>
      </div>

      <div
        className="pfs"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            className="pfs__slide"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Background image with subtle scale on hover */}
            <motion.div
              className="pfs__bg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="pfs__bg-img"
                draggable={false}
              />
            </motion.div>

            {/* Gradient overlay */}
            <div className="pfs__overlay" />

            {/* Subtle glow */}
            <div className="pfs__glow" />

            {/* Content — bottom ~35% */}
            <div className="pfs__content">
              <div className="pfs__content-inner">
                <h3 className="pfs__title">{project.title}</h3>
                <p className="pfs__desc">{project.description}</p>

                <div className="pfs__tags">
                  {project.tags.map((t) => (
                    <motion.span
                      key={t}
                      className="pill pill--sm"
                      whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.15)' }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.18 }}
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>

                <div className="pfs__links">
                  <PillLink href={project.demo}   icon={ExternalLink} label="DEMO"   />
                  <PillLink href={project.github} icon={Github}       label="GITHUB" />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Left / Right arrows */}
        <button
          className={`pfs__arrow pfs__arrow--left${current === 0 ? ' disabled' : ''}`}
          onClick={prev}
          aria-label="Previous project"
          disabled={current === 0}
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>
        <button
          className={`pfs__arrow pfs__arrow--right${current === projects.length - 1 ? ' disabled' : ''}`}
          onClick={next}
          aria-label="Next project"
          disabled={current === projects.length - 1}
        >
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>

        {/* Dot indicators */}
        <div className="pfs__dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`pfs__dot${i === current ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Project ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="pfs__counter">
          <span className="pfs__counter-current">{String(current + 1).padStart(2, '0')}</span>
          <span className="pfs__counter-sep">/</span>
          <span className="pfs__counter-total">{String(projects.length).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
}
