/* ProjectsSection.jsx */
import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight, ChevronDown, LayoutGrid } from 'lucide-react';
import { projects } from '../data/projects.js';
import './ProjectsSection.css';
import { BorderBeam } from './ui/border-beam.jsx';

const PAGE_SIZE = 3;

/* ── Expand-on-hover icon button (like Resume btn) ── */
function IconExpandBtn({ href, icon: Icon, label, onClick, isButton }) {
  const inner = (
    <motion.span className="proj__icon-btn"
      initial="rest" whileHover="hover" animate="rest">
      <Icon size={15} strokeWidth={2.5} />
      <motion.span className="proj__icon-btn-label"
        variants={{
          rest:  { width: 0, opacity: 0, marginLeft: 0 },
          hover: { width: 'auto', opacity: 1, marginLeft: 8 },
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block' }}>
        {label}
      </motion.span>
    </motion.span>
  );

  if (isButton) return <button className="proj__icon-btn-wrap" onClick={onClick}>{inner}</button>;
  if (!href) return null;
  return <a href={href} target="_blank" rel="noreferrer" className="proj__icon-btn-wrap">{inner}</a>;
}

/* ── Simple gallery overlay (no title bar / X header) ── */
function GalleryOverlay({ project, onClose }) {
  const [current, setCurrent] = useState(0);
  const imgs = project.images;
  const prev = () => setCurrent(i => (i - 1 + imgs.length) % imgs.length);
  const next = () => setCurrent(i => (i + 1) % imgs.length);

  // Close on Escape key
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div className="gallery-overlay"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}>

      {/* Invisible full-screen backdrop — tap/click anywhere outside modal closes */}
      <div className="gallery-backdrop" onClick={onClose} />

      <motion.div className="gallery-modal"
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}>

        {/* Close — minimal top-right X */}
        <button className="gallery-close" onClick={onClose}>✕</button>

        {/* Main image */}
        <div className="gallery-img-wrap">
          <AnimatePresence mode="wait">
            <motion.img key={current} src={imgs[current]}
              alt={`${project.title} ${current + 1}`}
              className="gallery-img"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }} />
          </AnimatePresence>

          {imgs.length > 1 && (
            <>
              <button className="gallery-arrow gallery-arrow--left" onClick={prev}><ChevronLeft size={20} /></button>
              <button className="gallery-arrow gallery-arrow--right" onClick={next}><ChevronRight size={20} /></button>
            </>
          )}

          {/* Counter inside image */}
          <div className="gallery-img-counter">{current + 1} / {imgs.length}</div>
        </div>

        {/* Thumbnails — centred */}
        {imgs.length > 1 && (
          <div className="gallery-thumbs">
            {imgs.map((src, i) => (
              <button key={i}
                className={`gallery-thumb${i === current ? ' gallery-thumb--active' : ''}`}
                onClick={() => setCurrent(i)}>
                <img src={src} alt="" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Project card ── */
function ProjectCard({ project, index }) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-6% 0px -6% 0px' });

  /* Each card gets a unique beam color pair for personality */
  const beamColors = [
    { from: 'rgba(255,255,255,0.9)', to: 'rgba(255,255,255,0)' },
    { from: 'rgba(180,200,255,0.85)', to: 'rgba(180,200,255,0)' },
    { from: 'rgba(200,255,220,0.8)', to: 'rgba(200,255,220,0)' },
    { from: 'rgba(255,200,180,0.8)', to: 'rgba(255,200,180,0)' },
    { from: 'rgba(220,180,255,0.8)', to: 'rgba(220,180,255,0)' },
    { from: 'rgba(255,240,160,0.8)', to: 'rgba(255,240,160,0)' },
  ];
  const beam = beamColors[index % beamColors.length];

  return (
    <>
      <motion.article ref={ref} className="proj__card"
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}>

        {/* Image — clickable */}
        <div className="proj__card-img-wrap" onClick={() => setGalleryOpen(true)}>
          <motion.img src={project.images[0]} alt={project.title}
            className="proj__card-img"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} />
          <div className="proj__card-overlay" />
          <div className="proj__card-hint">
            <LayoutGrid size={12} />
            <span>{project.images.length} SHOTS</span>
          </div>
          {/* Unique colored border beam */}
          <BorderBeam
            size={260} duration={7 + index * 1.2}
            colorFrom={beam.from} colorTo={beam.to}
            borderWidth={1.5} delay={index * 1.8}
          />
        </div>

        {/* Info — fully centred */}
        <div className="proj__card-body">
          <h3 className="proj__card-title">{project.title}</h3>
          <p className="proj__card-desc">{project.description}</p>

          <div className="proj__card-tags">
            {project.tags.map(t => (
              <motion.span key={t} className="proj__tag"
                whileHover={{ scale: 1.06, y: -2 }}
                transition={{ duration: 0.16 }}>
                {t}
              </motion.span>
            ))}
          </div>

          <div className="proj__card-links">
            <IconExpandBtn href={project.demo}   icon={ExternalLink} label="DEMO"   />
            <IconExpandBtn href={project.github} icon={Github}       label="GITHUB" />
          </div>
        </div>
      </motion.article>

      <AnimatePresence>
        {galleryOpen && <GalleryOverlay project={project} onClose={() => setGalleryOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function ProjectsSection() {
  const [visible, setVisible]    = useState(PAGE_SIZE);
  const headerRef    = useRef(null);
  const headerInView = useInView(headerRef, { once: false, margin: '-80px' });
  const showMore = visible < projects.length;

  return (
    <div className="proj-section">
      <div className="proj-section__header" ref={headerRef}>
        <motion.h2 className="proj-section__heading"
          initial={{ opacity: 0, y: 32, scale: 0.9 }}
          animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 32, scale: 0.9 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="proj-section__heading-accent">PROJECTS</span>
        </motion.h2>
      </div>

      <div className="proj__list">
        <AnimatePresence>
          {projects.slice(0, visible).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* See More button */}
      {showMore && (
        <div className="proj__see-more-wrap">
          <IconExpandBtn
            isButton
            icon={ChevronDown}
            label="SEE MORE"
            onClick={() => setVisible(v => Math.min(v + 1, projects.length))}
          />
        </div>
      )}
    </div>
  );
}
