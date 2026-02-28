/* HeroSection.jsx */
import memoji from '../assets/memoji.png';
import { motion } from 'framer-motion';
import './HeroSection.css';

const WHATSAPP_URL = `https://wa.me/213794696605`;
const PILLS = ['REACT', 'NODEJS', 'POSTGRESQL', 'LINUX'];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

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

        {/* Subtitle */}
        <motion.p className="hero__subtitle" variants={item}>
          I DO WEB DEVELOPMENT
        </motion.p>

        {/* Pills */}
        <motion.div className="hero__pills" variants={item}>
          {PILLS.map((label) => (
            <motion.span
              key={label}
              className="pill"
              whileHover={{ scale: 1.06, backgroundColor: '#2a2a2a' }}
              whileTap={{ scale: 0.96, backgroundColor: '#2a2a2a' }}
              transition={{ duration: 0.18 }}
            >
              {label}
            </motion.span>
          ))}
        </motion.div>

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
            LET'S BUILD
          </motion.a>
        </motion.div>

      </motion.div>
    </div>
  );
}
