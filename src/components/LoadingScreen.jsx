/* LoadingScreen.jsx */
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

/* Diamond star dots — same as hero */
const LOADER_STARS = [
  { top: '-18px', left: '5%',  size: 7,  delay: 0,    dur: 2.8 },
  { top: '-10px', left: '25%', size: 4,  delay: 0.6,  dur: 2.3 },
  { top: '-20px', left: '55%', size: 9,  delay: 1.0,  dur: 3.1 },
  { top:  '10%',  left: '92%', size: 5,  delay: 0.4,  dur: 2.5 },
  { top:  '50%',  left: '-2%', size: 6,  delay: 0.9,  dur: 2.9 },
  { top:  '80%',  left: '98%', size: 4,  delay: 1.3,  dur: 2.2 },
  { top: '112%',  left: '15%', size: 5,  delay: 0.2,  dur: 2.7 },
  { top: '108%',  left: '68%', size: 7,  delay: 0.75, dur: 3.0 },
];

export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible]   = useState(true);

  useEffect(() => {
    const intervals = [
      setTimeout(() => setProgress(25),  150),
      setTimeout(() => setProgress(55),  600),
      setTimeout(() => setProgress(80),  1100),
      setTimeout(() => setProgress(100), 1700),
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
          <div className="loader__bar-track">
            <motion.div
              className="loader__bar-fill"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <div className="loader__center">
            <div className="loader__name-wrap">
              {/* LAMINE with shimmer + stars */}
              <motion.span
                className="loader__name-first-wrap"
                initial={{ opacity: 0, y: 40, skewY: 5 }}
                animate={{ opacity: 1, y: 0, skewY: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              >
                {/* Diamond stars */}
                {LOADER_STARS.map((s, i) => (
                  <span
                    key={i}
                    className="loader__star"
                    style={{
                      top: s.top,
                      left: s.left,
                      width: `${s.size}px`,
                      height: `${s.size}px`,
                      animationDelay: `${s.delay}s`,
                      animationDuration: `${s.dur}s`,
                    }}
                  >
                    <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                      <polygon points="5,0 6.5,3.5 10,5 6.5,6.5 5,10 3.5,6.5 0,5 3.5,3.5" fill="currentColor" />
                    </svg>
                  </span>
                ))}
                <span className="loader__name-first">LAMINE</span>
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

          <div className="loader__percentage">{progress}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
