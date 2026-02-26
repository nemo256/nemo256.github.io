/* TopNav.jsx */
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, ArrowLeft } from 'lucide-react';
import './TopNav.css';

export default function TopNav({ view, onProjects, onBack }) {
  const showBack = view !== 'home';

  return (
    <nav className="topnav">
      {/* Left */}
      <AnimatePresence mode="wait">
        {!showBack ? (
          <motion.span
            key="initials"
            className="topnav__initials"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="topnav__initials-l">L</span>
            <span className="topnav__initials-n">N</span>
          </motion.span>
        ) : (
          <motion.button
            key="back"
            className="topnav__back"
            onClick={onBack}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.12, x: -3 }}
            whileTap={{ scale: 0.9 }}
            title="Back to projects"
          >
            <ArrowLeft size={26} strokeWidth={1.3} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Right — only on home */}
      <AnimatePresence>
        {view === 'home' && (
          <motion.button
            key="projects"
            className="topnav__projects"
            onClick={onProjects}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.15, rotate: 6 }}
            whileTap={{ scale: 0.92 }}
            title="View projects"
          >
            <FolderOpen size={30} strokeWidth={1.2} />
          </motion.button>
        )}
      </AnimatePresence>
    </nav>
  );
}
