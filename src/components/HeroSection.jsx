/* HeroSection.jsx */
import memoji from '../assets/memoji.png';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';

const WHATSAPP_URL = `https://wa.me/213794696605`;

// Typing sequence: type full → delete "WEB DEVELOPMENT" → pause → retype → loop
const FULL    = 'I DO WEB DEVELOPMENT';
const PREFIX  = 'I DO ';               // stays visible
const SUFFIX  = 'WEB DEVELOPMENT';    // typed / deleted

const TYPE_SPEED   = 60;   // ms per char while typing
const DELETE_SPEED = 35;   // ms per char while deleting
const PAUSE_FULL   = 1800; // ms pause when full text shown
const PAUSE_PREFIX = 600;  // ms pause when only prefix shown

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

function TypingText() {
  const [text, setText] = useState('');
  const phase = useRef('idle'); // idle | typing | pause-full | deleting | pause-prefix
  const timer = useRef(null);

  useEffect(() => {
    // Start with a small entrance delay
    const startDelay = setTimeout(() => runPhase('typing'), 900);
    return () => {
      clearTimeout(startDelay);
      clearTimeout(timer.current);
    };
  }, []);

  function runPhase(nextPhase) {
    phase.current = nextPhase;

    if (nextPhase === 'typing') {
      let i = 0;
      setText(PREFIX);
      const tick = () => {
        i++;
        setText(PREFIX + SUFFIX.slice(0, i));
        if (i < SUFFIX.length) {
          timer.current = setTimeout(tick, TYPE_SPEED);
        } else {
          timer.current = setTimeout(() => runPhase('pause-full'), PAUSE_FULL);
        }
      };
      timer.current = setTimeout(tick, TYPE_SPEED);
    }

    if (nextPhase === 'pause-full') {
      timer.current = setTimeout(() => runPhase('deleting'), 0);
    }

    if (nextPhase === 'deleting') {
      let remaining = SUFFIX.length;
      const tick = () => {
        remaining--;
        setText(PREFIX + SUFFIX.slice(0, remaining));
        if (remaining > 0) {
          timer.current = setTimeout(tick, DELETE_SPEED);
        } else {
          timer.current = setTimeout(() => runPhase('pause-prefix'), PAUSE_PREFIX);
        }
      };
      timer.current = setTimeout(tick, DELETE_SPEED);
    }

    if (nextPhase === 'pause-prefix') {
      timer.current = setTimeout(() => runPhase('typing'), 0);
    }
  }

  return (
    <span className="hero__typed">
      {text}
      <span className="hero__cursor">|</span>
    </span>
  );
}

export default function HeroSection() {
  return (
    <div className="hero">
      <motion.div className="hero__content" variants={container} initial="hidden" animate="show">

        {/* Memoji */}
        <motion.div className="hero__avatar" variants={item} whileHover="hover" whileTap="hover">
          <motion.div
            className="hero__avatar-ring"
            variants={{ hover: { scale: 1.05, borderColor: 'rgba(255,255,255,0.45)' } }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={memoji}
              alt="Lamine NEGGAZI"
              className="hero__avatar-img"
              variants={{ hover: { scale: 1.1, y: -10 } }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>

        {/* Main title */}
        <motion.h1 className="hero__title" variants={item}>
          HI, MY NAME IS<br />
          <span className="hero__title-name">LAMINE NEGGAZI</span>
        </motion.h1>

        {/* Typing subtitle */}
        <motion.p className="hero__subtitle" variants={item}>
          <TypingText />
        </motion.p>

        {/* CTA */}
        <motion.div className="hero__cta-wrap" variants={item}>
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hero__cta"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            CONTACT
          </motion.a>
        </motion.div>

      </motion.div>
    </div>
  );
}
