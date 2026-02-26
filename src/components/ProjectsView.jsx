/* ProjectsView.jsx — 6-project grid with image preview, title, pills */
import { motion } from 'framer-motion';
import { projects } from '../data/projects.js';
import './ProjectsView.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }
};

export default function ProjectsView({ onSelect }) {
  return (
    <div className="projects">
      <motion.div
        className="projects__grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {projects.map((project) => (
          <motion.button
            key={project.id}
            className="pcard"
            variants={cardVariant}
            onClick={() => onSelect(project)}
            whileHover="hover"
          >
            {/* Image preview */}
            <div className="pcard__img-wrap">
              <motion.img
                src={project.images[0]}
                alt={project.title}
                className="pcard__img"
                variants={{ hover: { scale: 1.06 } }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                draggable={false}
              />
              {/* Overlay on hover */}
              <motion.div
                className="pcard__overlay"
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </div>

            {/* Card footer */}
            <div className="pcard__footer">
              <h3 className="pcard__title">{project.title}</h3>
              <div className="pcard__pills">
                {project.tags.map((t) => (
                  <span key={t} className="pcard__pill">{t}</span>
                ))}
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
