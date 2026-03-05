/* TopNav.jsx */
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextScramble } from './ui/text-scramble.jsx';
import './TopNav.css';

const NAV_LINKS = [
  { label: 'HOME',       href: '#home' },
  { label: 'ABOUT',      href: '#about' },
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'SKILLS',     href: '#skills' },
];

function DocIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}

/* ── Tubelight pill nav ── */
function TubelightLinks({ activeTab, setActiveTab, onNav }) {
  const listRef = useRef(null);
  const [hov, setHov] = useState({ left: 0, width: 0, opacity: 0 });

  const onEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const lr   = listRef.current.getBoundingClientRect();
    setHov({ left: rect.left - lr.left, width: rect.width, opacity: 1 });
  };
  const onLeave = () => setHov(h => ({ ...h, opacity: 0 }));

  return (
    <ul className="topnav__links" ref={listRef} onMouseLeave={onLeave}>
      <div className="topnav__links-hover" style={hov} />
      {NAV_LINKS.map(({ label, href }) => {
        const active = activeTab === label;
        return (
          <li key={label} onMouseEnter={onEnter}>
            <a href={href}
              className={`topnav__link${active ? ' topnav__link--active' : ''}`}
              onClick={e => { onNav(e, href); setActiveTab(label); }}>
              {label}
              {active && (
                <motion.div layoutId="tubelight" className="topnav__tubelight"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 340, damping: 30 }}>
                  <div className="topnav__tube-bar" />
                  <div className="topnav__tube-halo topnav__tube-halo--wide" />
                  <div className="topnav__tube-halo topnav__tube-halo--mid" />
                  <div className="topnav__tube-halo topnav__tube-halo--tight" />
                </motion.div>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/* ── Logo: LN default → LAMINE NEGGAZI on hover with TextScramble ── */
function LogoExpand({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);

  const handleEnter = () => {
    if (isMobile) return;
    setHovered(true);
    setScrambleTrigger(true);
  };
  const handleLeave = () => {
    if (isMobile) return;
    setHovered(false);
    setScrambleTrigger(false);
  };

  return (
    <div className="topnav__logo-hitzone"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}>
      <a href="#home" className="topnav__logo-anchor" onClick={onClick}>

        {/* ── LAMINE group: L always visible, AMINE expands ── */}
        {/* L — slightly muted */}
        <TextScramble
          as="span"
          className="topnav__logo-l"
          trigger={scrambleTrigger}
          speed={0.03}
          duration={0.5}
          onScrambleComplete={() => setScrambleTrigger(false)}
        >
          L
        </TextScramble>

        {/* AMINE — slides in on hover with scramble */}
        <span className="topnav__logo-overflow">
          <AnimatePresence>
            {hovered && (
              <motion.span key="amine" className="topnav__logo-amine"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}>
                <motion.span style={{ display: 'inline-block' }}
                  initial={{ x: -14, skewX: -8 }}
                  animate={{ x: 0, skewX: 0 }}
                  exit={{ x: -14, skewX: -8 }}
                  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}>
                  <TextScramble
                    as="span"
                    trigger={scrambleTrigger}
                    speed={0.025}
                    duration={0.55}
                  >
                    AMINE
                  </TextScramble>
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {/* spacer */}
        <AnimatePresence>
          {hovered && (
            <motion.span key="sp" style={{ display: 'inline-block', flexShrink: 0 }}
              initial={{ width: 0 }} animate={{ width: 11 }} exit={{ width: 0 }}
              transition={{ duration: 0.32 }} />
          )}
        </AnimatePresence>

        {/* ── NEGGAZI group: N always visible, EGGAZI expands ── */}
        <TextScramble
          as="span"
          className="topnav__logo-n"
          trigger={scrambleTrigger}
          speed={0.03}
          duration={0.5}
        >
          N
        </TextScramble>

        <span className="topnav__logo-overflow">
          <AnimatePresence>
            {hovered && (
              <motion.span key="eggazi" className="topnav__logo-eggazi"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}>
                <motion.span style={{ display: 'inline-block' }}
                  initial={{ x: -14, skewX: -8 }}
                  animate={{ x: 0, skewX: 0 }}
                  exit={{ x: -14, skewX: -8 }}
                  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}>
                  <TextScramble
                    as="span"
                    trigger={scrambleTrigger}
                    speed={0.025}
                    duration={0.55}
                  >
                    EGGAZI
                  </TextScramble>
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </a>
    </div>
  );
}

/* ── Resume: icon only, label on hover ── */
function ResumeButton({ isMobile }) {
  const URL = 'assets/cv.pdf';
  if (isMobile) {
    return (
      <a href={URL} target="_blank" rel="noreferrer"
        className="topnav__cv-icon-only" aria-label="Resume" download>
        <DocIcon size={19} />
      </a>
    );
  }
  return (
    <motion.a href={URL} target="_blank" rel="noreferrer"
      className="topnav__cv-btn" download
      initial="rest" whileHover="hover" animate="rest">
      <DocIcon size={16} />
      <motion.span className="topnav__cv-label"
        variants={{
          rest:  { width: 0, opacity: 0, marginLeft: 0 },
          hover: { width: 'auto', opacity: 1, marginLeft: 9 },
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block' }}>
        RESUME
      </motion.span>
    </motion.a>
  );
}

export default function TopNav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [isMobile,  setIsMobile]  = useState(window.innerWidth <= 640);
  const [activeTab, setActiveTab] = useState('HOME');

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', s, { passive: true });
    return () => window.removeEventListener('scroll', s);
  }, []);

  // Track which section is in view and update the active tab
  useEffect(() => {
    const sectionMap = {
      home:       'HOME',
      about:      'ABOUT',
      projects:   'PROJECTS',
      experience: 'EXPERIENCE',
      skills:     'SKILLS',
    };

    const observers = [];

    Object.entries(sectionMap).forEach(([id, label]) => {
      const el = document.querySelector(`#${id}`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveTab(label);
        },
        { threshold: 0, rootMargin: '-40% 0px -55% 0px' }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);
  useEffect(() => {
    const c = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', c);
    return () => window.removeEventListener('resize', c);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  return (
    <>
      <nav className={`topnav${scrolled ? ' topnav--scrolled' : ''}`}>
        <div className="topnav__slot-left">
          {isMobile ? <ResumeButton isMobile={true} /> : <LogoExpand onClick={e => go(e, '#home')} />}
        </div>
        <div className="topnav__slot-center">
          {isMobile
            ? <LogoExpand onClick={e => go(e, '#home')} />
            : <TubelightLinks activeTab={activeTab} setActiveTab={setActiveTab} onNav={go} />
          }
        </div>
        <div className="topnav__slot-right">
          {isMobile
            ? (
              <button className={`topnav__burger${menuOpen ? ' topnav__burger--open' : ''}`}
                onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
                <span className="topnav__burger-bar" />
                <span className="topnav__burger-bar" />
                <span className="topnav__burger-bar" />
              </button>
            )
            : <ResumeButton isMobile={false} />
          }
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="drawer"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            <nav className="drawer__nav">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a key={label} href={href} className="drawer__link"
                  onClick={e => { go(e, href); setActiveTab(label); }}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                  {label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
