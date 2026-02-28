/* TopNav.jsx — hamburger drawer fixed at any scroll position */
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

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLink = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    // Small delay so drawer closes before scroll
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <nav className={`topnav${scrolled ? ' topnav--scrolled' : ''}`}>
        <a href="#home" className="topnav__initials" onClick={(e) => handleLink(e, '#home')}>
          <span className="topnav__initials-l">L</span>
          <span className="topnav__initials-n">N</span>
        </a>

        <ul className="topnav__links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="topnav__link" onClick={(e) => handleLink(e, href)}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`topnav__burger${menuOpen ? ' topnav__burger--open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="topnav__burger-bar" />
          <span className="topnav__burger-bar" />
          <span className="topnav__burger-bar" />
        </button>
      </nav>

      {/* Drawer — rendered as portal-sibling outside nav so z-index stacks correctly */}
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
                  className="drawer__link"
                  onClick={(e) => handleLink(e, href)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="drawer__link-num">{String(i + 1).padStart(2, '0')}</span>
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
