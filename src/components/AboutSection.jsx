/* AboutSection.jsx */
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './AboutSection.css';

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div className="about">
      <motion.div
        ref={ref}
        className="about__inner"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.span className="section-label" variants={item}>ABOUT</motion.span>

        <motion.h2 className="about__heading" variants={item}>
          FULL-STACK<br />
          <span className="about__heading-accent">DEVELOPER.</span>
        </motion.h2>

        <motion.p className="about__body" variants={item}>
          Based in Algiers. I build fast, modern web products — clean UIs, solid back-ends, real results.
        </motion.p>
      </motion.div>
    </div>
  );
}
