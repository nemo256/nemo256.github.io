/* AboutSection.jsx — left: text, right: stacked-card 3D tilt photo, below: centered stats */
import mePhoto from '../assets/me.png';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import './AboutSection.css';

const STATS = [
  { label: 'YEARS EXP',     target: 4,    suffix: ''  },
  { label: 'CONTRIBUTIONS', target: 4000, suffix: '+', formatK: true },
  { label: 'PROJECTS',      target: 9,    suffix: '+' },
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
    ? count >= 1000 ? `${Math.floor(count / 1000)}K+` : String(count)
    : `${count}${suffix}`;

  return <span className="astat__number">{formatted}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};
const fadeUpScale = {
  hidden: { opacity: 0, y: 24, scale: 0.88 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

/* 3D tilt card — desktop mouse parallax only, no hover scale */
function TiltPhoto() {
  const cardRef = useRef(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springCfg  = { damping: 22, stiffness: 180 };
  const rotateX    = useSpring(useTransform(rawY, [-0.5, 0.5], [12, -12]), springCfg);
  const rotateY    = useSpring(useTransform(rawX, [-0.5, 0.5], [-12, 12]), springCfg);
  const glareX     = useTransform(rawX, [-0.5, 0.5], ['0%', '100%']);
  const glareY     = useTransform(rawY, [-0.5, 0.5], ['0%', '100%']);

  function onMouseMove(e) {
    const r = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width  - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  }
  function onMouseLeave() { rawX.set(0); rawY.set(0); }

  return (
    /* Outer wrapper provides the stacked-card background layers */
    <div className="about__card-stack">
      {/* Back card 2 */}
      <div className="about__card-back about__card-back--2" />
      {/* Back card 1 */}
      <div className="about__card-back about__card-back--1" />

      {/* Front — tilt card */}
      <motion.div
        ref={cardRef}
        className="about__tilt-card"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, y: 32, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src={mePhoto}
          alt="Lamine NEGGAZI"
          className="about__photo"
          draggable={false}
        />
        {/* Glare */}
        <motion.div
          className="about__tilt-glare"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.16) 0%, transparent 62%)`
            ),
          }}
        />
        {/* Inner depth shadow */}
        <div className="about__tilt-shadow" />
      </motion.div>
    </div>
  );
}

export default function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <div className="about">
      <motion.div
        ref={ref}
        className="about__inner"
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      >
        {/* Top row */}
        <div className="about__top-row">
          <div className="about__left">
            <motion.h2 className="about__heading" variants={fadeUpScale}>
              FULL-STACK<br />
              <span className="about__heading-accent">DEVELOPER.</span>
            </motion.h2>
            <motion.p className="about__body" variants={fadeUp}>
              Based in Algiers. I build fast, modern web products — clean UIs, solid back-ends, real results.
            </motion.p>
          </div>
          <TiltPhoto />
        </div>

        {/* Stats */}
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
