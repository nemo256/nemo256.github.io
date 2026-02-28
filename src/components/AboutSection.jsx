/* AboutSection.jsx — left: about text, right: 3 compact stats */
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './AboutSection.css';

const STATS = [
  { value: 3,   suffix: '+', label: 'YEARS EXP'    },
  { value: 200, suffix: '+', label: 'CONTRIBUTIONS' },
  { value: 6,   suffix: '+', label: 'PROJECTS'      },
];

function CountUp({ target, suffix, active }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const stepTime = 16;
    const totalSteps = 1400 / stepTime;
    const increment = target / totalSteps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, stepTime);
    return () => clearInterval(timer);
  }, [active, target]);
  return <span className="astat__number">{count}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="about">
      <motion.div
        ref={ref}
        className="about__inner"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        {/* Left — text */}
        <div className="about__left">
          <motion.span className="section-label" variants={fadeUp}>ABOUT</motion.span>

          <motion.h2 className="about__heading" variants={fadeUp}>
            FULL-STACK<br />
            <span className="about__heading-accent">DEVELOPER.</span>
          </motion.h2>

          <motion.p className="about__body" variants={fadeUp}>
            Based in Algiers. I build fast, modern web products — clean UIs, solid back-ends, real results.
          </motion.p>
        </div>

        {/* Right — stats */}
        <motion.div className="about__stats" variants={fadeUp}>
          {STATS.map(({ value, suffix, label }) => (
            <div key={label} className="astat">
              <CountUp target={value} suffix={suffix} active={inView} />
              <span className="astat__label">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
