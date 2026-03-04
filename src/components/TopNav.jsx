/* TopNav.jsx */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TopNav.css';

const NAV_LINKS = [
  { label: 'HOME',       href: '#home' },
  { label: 'ABOUT',      href: '#about' },
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'SKILLS',     href: '#skills' },
];

/* ── Custom document SVG icon ── */
function DocIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="14 2 14 8 20 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="10" y1="9"  x2="8" y2="9"  stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ── Logo with hover-expand (desktop only) ── */
function LogoExpand({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <a
      href="#home"
      className="topnav__initials"
      onClick={onClick}
      onMouseEnter={() => { if (!isMobile) setHovered(true); }}
      onMouseLeave={() => { if (!isMobile) setHovered(false); }}
    >
      {/* L → LAMINE */}
      <span className={`topnav__initials-l${hovered ? ' topnav__initials-l--hovered' : ''}`}>
        <span className="topnav__logo-char">L</span>
        <AnimatePresence>
          {hovered && (
            <motion.span
              key="amine"
              className="topnav__logo-expand"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span
                initial={{ x: -12 }}
                animate={{ x: 0 }}
                exit={{ x: -12 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'inline-block' }}
              >AMINE</motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>

      <AnimatePresence>
        {hovered && (
          <motion.span
            key="space"
            initial={{ width: 0 }}
            animate={{ width: '8px' }}
            exit={{ width: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block', flexShrink: 0 }}
          />
        )}
      </AnimatePresence>

      {/* N → NEGGAZI */}
      <span className="topnav__initials-n">
        <span className="topnav__logo-char">N</span>
        <AnimatePresence>
          {hovered && (
            <motion.span
              key="eggazi"
              className="topnav__logo-expand"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              <motion.span
                initial={{ x: -12 }}
                animate={{ x: 0 }}
                exit={{ x: -12 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                style={{ display: 'inline-block' }}
              >EGGAZI</motion.span>
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </a>
  );
}

/* ── CV Button ── */
function CVButton({ isMobile }) {
  const CV_URL = '#';
  if (isMobile) {
    return (
      <a href={CV_URL} target="_blank" rel="noreferrer" className="topnav__cv-icon-only" aria-label="Download CV" download>
        <DocIcon size={22} />
      </a>
    );
  }
  return (
    <motion.a
      href={CV_URL}
      target="_blank"
      rel="noreferrer"
      className="topnav__cv-btn"
      aria-label="Download CV"
      download
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <DocIcon size={18} />
      <motion.span
        className="topnav__cv-label"
        variants={{
          rest:  { width: 0, opacity: 0, marginLeft: 0 },
          hover: { width: 'auto', opacity: 1, marginLeft: 8 },
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap', display: 'inline-block' }}
      >
        CV
      </motion.span>
    </motion.a>
  );
}

export default function TopNav() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [isMobile, setIsMobile]   = useState(window.innerWidth <= 640);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 640);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLink = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <nav className={`topnav${scrolled ? ' topnav--scrolled' : ''}`}>
        {isMobile && <CVButton isMobile={true} />}

        <LogoExpand onClick={(e) => handleLink(e, '#home')} />

        <ul className="topnav__links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="topnav__link" onClick={(e) => handleLink(e, href)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {!isMobile && <CVButton isMobile={false} />}

        {isMobile && (
          <button
            className={`topnav__burger${menuOpen ? ' topnav__burger--open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="topnav__burger-bar" />
            <span className="topnav__burger-bar" />
            <span className="topnav__burger-bar" />
          </button>
        )}
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="drawer"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="drawer__nav">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  className="drawer__link drawer__link--centered"
                  onClick={(e) => handleLink(e, href)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
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
