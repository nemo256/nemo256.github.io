/* AboutSection.jsx — left: about text, right: 3 stats */
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './AboutSection.css';

// Exact requested values
const STATS = [
  { display: '4',   label: 'YEARS EXP',     target: 4,    suffix: ''  },
  { display: '4K+', label: 'CONTRIBUTIONS', target: 4000, suffix: '+', formatK: true },
  { display: '9+',  label: 'PROJECTS',      target: 9,    suffix: '+' },
];

function CountUp({ target, suffix, formatK, active }) {
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

  const formatted = formatK
    ? count >= 1000 ? `${(count / 1000).toFixed(1).replace('.0', '')}K+` : count
    : `${count}${suffix}`;

  return <span className="astat__number">{formatted}</span>;
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
          {STATS.map(({ target, suffix, formatK, label }) => (
            <div key={label} className="astat">
              <CountUp target={target} suffix={suffix} formatK={formatK} active={inView} />
              <span className="astat__label">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
