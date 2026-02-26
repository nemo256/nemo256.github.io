/* LoadingScreen.jsx — Full-screen animated loader with progress bar */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Simulate loading with accelerating progress
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
            <motion.div
              className="loader__glitch"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              LN
            </motion.div>
            <motion.div
              className="loader__label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              INITIALIZING...
            </motion.div>
          </div>

          {/* Bottom percentage */}
          <div className="loader__percentage">{progress}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
