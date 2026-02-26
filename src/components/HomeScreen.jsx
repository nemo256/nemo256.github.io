/* HomeScreen.jsx */
import memoji from '../assets/memoji.png';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import './HomeScreen.css';

const EMAIL = 'neggazimedlamine@gmail.com';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const PILLS = ['REACT', 'NODEJS', 'POSTGRESQL', 'LINUX'];

export default function HomeScreen() {
  const [copied, setCopied] = useState(false);

  const handleEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silently fail
    }
    // No mailto — clipboard only
  };

  return (
    <div className="home">
      <motion.div className="home__content" variants={container} initial="hidden" animate="show">

        {/* Memoji */}
        <motion.div className="home__avatar" variants={item} whileHover="hover">
          <motion.div
            className="home__avatar-ring"
            variants={{ hover: { scale: 1.06, borderColor: 'rgba(255,255,255,0.5)' } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={memoji}
              alt="Lamine NEGGAZI"
              className="home__avatar-img"
              variants={{ hover: { scale: 1.08, y: -6 } }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        </motion.div>

        {/* Main title */}
        <motion.h1 className="home__title" variants={item}>
          HI, MY NAME IS<br />
          <span className="home__title-name">LAMINE NEGGAZI</span>
        </motion.h1>

        {/* Subtitle — updated text */}
        <motion.p className="home__subtitle" variants={item}>
          I DO WEB DEVELOPMENT
        </motion.p>

        {/* Pills */}
        <motion.div className="home__pills" variants={item}>
          {PILLS.map((label) => (
            <motion.span
              key={label}
              className="pill"
              whileHover={{ scale: 1.06, backgroundColor: '#2a2a2a' }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer email — clipboard only, no mailto */}
      <motion.button
        className="home__email"
        onClick={handleEmail}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ color: '#fff' }}
      >
        <span className="home__email-label">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="home__email-copied"
            >
              <Check size={12} strokeWidth={2} /> COPIED
            </motion.span>
          ) : EMAIL}
        </span>
        {!copied && <Copy size={12} strokeWidth={1.5} className="home__email-icon" />}
      </motion.button>
    </div>
  );
}
