/* ProjectDetail.jsx — Carousel stuck to top, centered info, conditional links */
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import Carousel from './Carousel.jsx';
import { projects } from '../data/projects.js';
import './ProjectDetail.css';

const pageVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 20 },
  show:  { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit:  { opacity: 0, scale: 0.97, y: -20, transition: { duration: 0.35 } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

/* Expanding pill link — only rendered when href is non-empty */
function PillLink({ href, icon: Icon, label }) {
  if (!href) return null;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="detail__pill-link"
      title={label}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Icon size={18} strokeWidth={1.4} className="detail__pill-icon" />
      <motion.span
        className="detail__pill-label"
        variants={{
          rest:  { width: 0,      opacity: 0, marginLeft: 0 },
          hover: { width: 'auto', opacity: 1, marginLeft: 8 },
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
}

export default function ProjectDetail({ project, onNavigate }) {
  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject  = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject  = projects[(currentIndex + 1)                   % projects.length];

  const hasLinks = project.demo || project.github;

  return (
    <motion.div
      className="detail"
      variants={pageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {/* ── Carousel — sticks to top, inset width, rounded bottom corners ── */}
      <div className="detail__carousel-wrap">
        <Carousel images={project.images} />
      </div>

      {/* ── Centered content ─────────────────────────────────────────────── */}
      <motion.div
        className="detail__content"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="detail__title" variants={fadeUp}>
          {project.title}
        </motion.h1>

        <motion.div className="detail__tags" variants={fadeUp}>
          {project.tags.map((t) => (
            <span key={t} className="detail__tag">{t}</span>
          ))}
        </motion.div>

        <motion.p className="detail__desc" variants={fadeUp}>
          {project.description}
        </motion.p>

        {/* Only render links row if at least one link exists */}
        {hasLinks && (
          <motion.div className="detail__links" variants={fadeUp}>
            <PillLink href={project.demo}   icon={ExternalLink} label="LIVE DEMO" />
            <PillLink href={project.github} icon={Github}       label="GITHUB"    />
          </motion.div>
        )}

        {/* Prev / Next */}
        <motion.div className="detail__nav" variants={fadeUp}>
          <button className="detail__nav-btn" onClick={() => onNavigate(prevProject)}>
            <ChevronLeft size={16} strokeWidth={1.5} />
            <span>{prevProject.title}</span>
          </button>
          <button className="detail__nav-btn detail__nav-btn--next" onClick={() => onNavigate(nextProject)}>
            <span>{nextProject.title}</span>
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
