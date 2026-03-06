/* HeroSection.jsx */
import memoji from '../assets/memoji.png';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TextScramble } from './ui/text-scramble.jsx';
import { BorderBeam } from './ui/border-beam.jsx';
import AvatarBeam from './AvatarBeam.jsx';
import { useTheme } from './ThemeContext.jsx';
import './HeroSection.css';

const WHATSAPP_URL = `https://wa.me/213794696605`;

const PREFIX  = 'I DO ';
const SUFFIX  = 'WEB DEVELOPMENT';
const TYPE_SPEED   = 60;
const DELETE_SPEED = 35;
const PAUSE_FULL   = 1800;
const PAUSE_PREFIX = 600;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } }
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

/* Diamond star */
function StarDot({ style }) {
  return (
    <span className="hero__star" style={style}>
      <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <polygon points="5,0 6.5,3.5 10,5 6.5,6.5 5,10 3.5,6.5 0,5 3.5,3.5" fill="currentColor" />
      </svg>
    </span>
  );
}

const STARS = [
  { top: '-14px', left: '6%',   size: 7, delay: 0,    dur: 2.8 },
  { top: '-6px',  left: '28%',  size: 4, delay: 0.55, dur: 2.2 },
  { top: '-16px', left: '58%',  size: 9, delay: 1.1,  dur: 3.1 },
  { top: '8px',   left: '88%',  size: 5, delay: 0.3,  dur: 2.5 },
  { top: '55%',   left: '-14px',size: 6, delay: 0.75, dur: 2.9 },
  { top: '70%',   left: '96%',  size: 4, delay: 1.4,  dur: 2.3 },
  { top: '108%',  left: '18%',  size: 5, delay: 0.2,  dur: 2.7 },
  { top: '105%',  left: '72%',  size: 7, delay: 0.9,  dur: 3.0 },
];

/* LAMINE with scramble on mount + stars */
function LamineName() {
  const [trigger, setTrigger] = useState(false);

  // Fire scramble once after a short delay on mount
  useEffect(() => {
    const t = setTimeout(() => setTrigger(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <span className="hero__lamine-wrap">
      {STARS.map((s, i) => (
        <StarDot key={i} style={{
          top: s.top, left: s.left,
          width: `${s.size}px`, height: `${s.size}px`,
          animationDelay: `${s.delay}s`,
          animationDuration: `${s.dur}s`,
        }} />
      ))}
      <TextScramble
        as="span"
        className="hero__lamine-text"
        trigger={trigger}
        speed={0.04}
        duration={0.9}
        characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*"
        onScrambleComplete={() => setTrigger(false)}
      >
        LAMINE
      </TextScramble>
    </span>
  );
}

/* NEGGAZI with scramble on mount */
function NeggaziName() {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTrigger(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <TextScramble
      as="span"
      className="hero__neggazi-text"
      trigger={trigger}
      speed={0.04}
      duration={0.9}
      characterSet="ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*"
      onScrambleComplete={() => setTrigger(false)}
    >
      NEGGAZI
    </TextScramble>
  );
}

function TypingText() {
  const [text, setText] = useState('');
  const phase = useRef('idle');
  const timer = useRef(null);

  useEffect(() => {
    const startDelay = setTimeout(() => runPhase('typing'), 900);
    return () => { clearTimeout(startDelay); clearTimeout(timer.current); };
  }, []);

  function runPhase(nextPhase) {
    phase.current = nextPhase;
    if (nextPhase === 'typing') {
      let i = 0;
      setText(PREFIX);
      const tick = () => {
        i++;
        setText(PREFIX + SUFFIX.slice(0, i));
        if (i < SUFFIX.length) timer.current = setTimeout(tick, TYPE_SPEED);
        else timer.current = setTimeout(() => runPhase('pause-full'), PAUSE_FULL);
      };
      timer.current = setTimeout(tick, TYPE_SPEED);
    }
    if (nextPhase === 'pause-full')  timer.current = setTimeout(() => runPhase('deleting'), 0);
    if (nextPhase === 'deleting') {
      let remaining = SUFFIX.length;
      const tick = () => {
        remaining--;
        setText(PREFIX + SUFFIX.slice(0, remaining));
        if (remaining > 0) timer.current = setTimeout(tick, DELETE_SPEED);
        else timer.current = setTimeout(() => runPhase('pause-prefix'), PAUSE_PREFIX);
      };
      timer.current = setTimeout(tick, DELETE_SPEED);
    }
    if (nextPhase === 'pause-prefix') timer.current = setTimeout(() => runPhase('typing'), 0);
  }

  return (
    <span className="hero__typed">
      {text}<span className="hero__cursor">|</span>
    </span>
  );
}

export default function HeroSection() {
  const ref      = useRef(null);
  const ringRef  = useRef(null);           // ref to the actual ring div
  const inView   = useInView(ref, { margin: '-10% 0px -10% 0px' });
  const { dark } = useTheme();
  const [beamActive, setBeamActive] = useState(false);

  return (
    <div className="hero" ref={ref}>
      <motion.div
        className="hero__content"
        variants={container}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
      >
        {/* Memoji */}
        <motion.div
          className="hero__avatar"
          variants={item}
          whileHover="hover"
          whileTap="hover"
          onHoverStart={() => setBeamActive(true)}
          onHoverEnd={() => setBeamActive(false)}
          onTapStart={() => setBeamActive(true)}
          onTap={() => setTimeout(() => setBeamActive(false), 1000)}
        >
          <div className="hero__avatar-beam-wrap">
            {/* Image ring — in normal flow, centered by flexbox */}
            <motion.div
              className="hero__avatar-ring-motion"
              variants={{ hover: { scale: 1.05 } }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="hero__avatar-ring" ref={ringRef}>
                <motion.img
                  src={memoji}
                  alt="Lamine NEGGAZI"
                  className="hero__avatar-img"
                  variants={{ hover: { scale: 1.1, y: -10 } }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </motion.div>
            {/* Canvas beam — reads ring size live via ResizeObserver */}
            <AvatarBeam active={beamActive} dark={dark} ringRef={ringRef} />
          </div>
        </motion.div>

        {/* Main title */}
        <motion.h1 className="hero__title" variants={item}>
          HI, MY NAME IS<br />
          <span className="hero__title-name">
            <LamineName /> <NeggaziName />
          </span>
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
            CONTACT ME
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}
