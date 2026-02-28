/* ProjectsSection.jsx */
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/projects.js';
import './ProjectsSection.css';

/* Expanding pill link — icon only, expands to show label on hover */
function PillLink({ href, icon: Icon, label }) {
  if (!href) return null;
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="pcard__pill-link"
      title={label}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Icon size={16} strokeWidth={1.4} className="pcard__pill-icon" />
      <motion.span
        className="pcard__pill-label"
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

function ImageSlider({ images }) {
  const [idx, setIdx] = useState(0);

  const prev = (e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); };

  return (
    <div className="pslider">
      <div className="pslider__track">
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={images[idx]}
            alt={`Screenshot ${idx + 1}`}
            className="pslider__img"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <>
          <button className="pslider__btn pslider__btn--prev" onClick={prev} aria-label="Previous">
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <button className="pslider__btn pslider__btn--next" onClick={next} aria-label="Next">
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
          <div className="pslider__dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`pslider__dot${i === idx ? ' active' : ''}`}
                onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
};

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="proj-section">
      <div className="proj-section__header">
        <span className="section-label">PROJECTS</span>
        <h2 className="proj-section__heading">
          SELECTED<br />
          <span className="proj-section__heading-accent">WORK</span>
        </h2>
      </div>

      <motion.div
        ref={ref}
        className="proj-section__grid"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      >
        {projects.map((project) => (
          <motion.article key={project.id} className="pcard" variants={card}>
            <ImageSlider images={project.images} />

            <div className="pcard__body">
              <h3 className="pcard__title">{project.title}</h3>
              <p className="pcard__desc">{project.description}</p>

              {/* Pills — same style as hero */}
              <div className="pcard__tags">
                {project.tags.map((t) => (
                  <motion.span
                    key={t}
                    className="pill pill--sm"
                    whileHover={{ scale: 1.06, backgroundColor: '#2a2a2a' }}
                    whileTap={{ scale: 0.96, backgroundColor: '#2a2a2a' }}
                    transition={{ duration: 0.18 }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              <div className="pcard__links">
                <PillLink href={project.demo}   icon={ExternalLink} label="DEMO"   />
                <PillLink href={project.github} icon={Github}       label="GITHUB" />
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
