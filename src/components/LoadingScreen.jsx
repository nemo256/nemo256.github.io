/* LoadingScreen.jsx */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const intervals = [
      setTimeout(() => setProgress(30), 100),
      setTimeout(() => setProgress(60), 400),
      setTimeout(() => setProgress(85), 800),
      setTimeout(() => setProgress(100), 1200),
      setTimeout(() => {
        setVisible(false);
        setTimeout(onDone, 600);
      }, 1700),
    ];
    return () => intervals.forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top progress bar */}
          <div className="loader__bar-track">
            <motion.div
              className="loader__bar-fill"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Center content */}
          <div className="loader__center">
            <div className="loader__name-wrap">
              <motion.span
                className="loader__name-first"
                initial={{ opacity: 0, y: 32, skewY: 4 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              >
                LAMINE
              </motion.span>
              <motion.span
                className="loader__name-last"
                initial={{ opacity: 0, y: 32, skewY: 4 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              >
                NEGGAZI
              </motion.span>
            </div>

            <motion.div
              className="loader__role"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
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
