/* StatsSection.jsx */
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsSection.css';

const STATS = [
  { value: 6,   suffix: '+', label: 'PROJECTS',     icon: '▣' },
  { value: 3,   suffix: '+', label: 'YEARS EXP',    icon: '◑' },
  { value: 200, suffix: '+', label: 'CONTRIBUTIONS', icon: '▲' },
  { value: 10,  suffix: '+', label: 'TECHNOLOGIES',  icon: '◆' },
];

function CountUp({ target, suffix, active }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const stepTime = 16;
    const totalSteps = 1600 / stepTime;
    const increment = target / totalSteps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, stepTime);
    return () => clearInterval(timer);
  }, [active, target]);

  return <span className="stat__number">{count}{suffix}</span>;
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
};

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div className="stats">
      <div className="stats__label-row">
        <span className="section-label">STATS</span>
      </div>
      <motion.div
        ref={ref}
        className="stats__grid"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        {STATS.map(({ value, suffix, label, icon }) => (
          <motion.div key={label} className="stat" variants={item}>
            <span className="stat__icon" aria-hidden="true">{icon}</span>
            <CountUp target={value} suffix={suffix} active={inView} />
            <span className="stat__label">{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
