/* ProjectsSection.jsx — full-screen per-project scroll experience */
import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../data/projects.js';
import './ProjectsSection.css';

/* Expanding pill link — icon only, expands on hover */
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

/* Single full-screen project slide */
function ProjectSlide({ project, isActive }) {
  return (
    <motion.div
      className="pfs__slide"
      initial={{ opacity: 0, scale: 1.03 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background image */}
      <div className="pfs__bg">
        <img
          src={project.images[0]}
          alt={project.title}
          className="pfs__bg-img"
          draggable={false}
        />
        <div className="pfs__overlay" />
      </div>

      {/* Content — bottom portion */}
      <div className="pfs__content">
        <div className="pfs__content-inner">
          <h3 className="pfs__title">{project.title}</h3>
          <p className="pfs__desc">{project.description}</p>

          {/* Pills — same style as hero */}
          <div className="pfs__tags">
            {project.tags.map((t) => (
              <motion.span
                key={t}
                className="pill pill--sm"
                whileHover={{ scale: 1.06, backgroundColor: '#2a2a2a' }}
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
  );
}

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef(null);
  const isThrottled = useRef(false);
  const touchStart = useRef(null);

  const goTo = useCallback((idx) => {
    setCurrent(Math.max(0, Math.min(projects.length - 1, idx)));
  }, []);

  /* Wheel / keyboard handler inside section */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (isThrottled.current) return;
      const delta = e.deltaY;
      if (Math.abs(delta) < 20) return;

      /* Allow native scroll to leave the section at boundaries */
      if (delta > 0 && current >= projects.length - 1) return;
      if (delta < 0 && current <= 0) return;

      e.preventDefault();
      isThrottled.current = true;
      setCurrent((c) => delta > 0 ? Math.min(c + 1, projects.length - 1) : Math.max(c - 1, 0));
      setTimeout(() => { isThrottled.current = false; }, 700);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [current]);

  /* Touch swipe */
  const onTouchStart = (e) => { touchStart.current = e.touches[0].clientY; };
  const onTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientY;
    touchStart.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta > 0) goTo(current + 1);
    else goTo(current - 1);
  };

  return (
    <div className="proj-section">
      {/* Section title */}
      <div className="proj-section__header">
        <span className="section-label">PROJECTS</span>
      </div>

      {/* Full-screen slides container */}
      <div
        ref={containerRef}
        className="pfs"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence mode="wait">
          <ProjectSlide key={current} project={projects[current]} isActive={true} />
        </AnimatePresence>

        {/* Dot navigation */}
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

        {/* Arrow buttons */}
        {current > 0 && (
          <button className="pfs__arrow pfs__arrow--up" onClick={() => goTo(current - 1)} aria-label="Previous project">
            <span>↑</span>
          </button>
        )}
        {current < projects.length - 1 && (
          <button className="pfs__arrow pfs__arrow--down" onClick={() => goTo(current + 1)} aria-label="Next project">
            <span>↓</span>
          </button>
        )}

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
