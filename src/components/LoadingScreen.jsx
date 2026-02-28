/* LoadingScreen.jsx */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const intervals = [
      setTimeout(() => setProgress(25),  150),
      setTimeout(() => setProgress(55),  600),
      setTimeout(() => setProgress(80),  1100),
      setTimeout(() => setProgress(100), 1700),
      // Stay visible until 2600ms so name + role are fully readable
      setTimeout(() => {
        setVisible(false);
        setTimeout(onDone, 650);
      }, 2600),
    ];
    return () => intervals.forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top progress bar */}
          <div className="loader__bar-track">
            <motion.div
              className="loader__bar-fill"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          {/* Center content */}
          <div className="loader__center">
            <div className="loader__name-wrap">
              <motion.span
                className="loader__name-first"
                initial={{ opacity: 0, y: 40, skewY: 5 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              >
                LAMINE
              </motion.span>
              <motion.span
                className="loader__name-last"
                initial={{ opacity: 0, y: 40, skewY: 5 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              >
                NEGGAZI
              </motion.span>
            </div>

            <motion.div
              className="loader__role"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.65 }}
            >
              WEB DEVELOPER
            </motion.div>
          </div>

          {/* Bottom percentage */}
          <div className="loader__percentage">{progress}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
