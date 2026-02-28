/* TopNav.jsx */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  const handleLink = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
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

      <button className="topnav__burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
        <span className={`topnav__burger-bar${menuOpen ? ' open' : ''}`} />
        <span className={`topnav__burger-bar${menuOpen ? ' open' : ''}`} />
        <span className={`topnav__burger-bar${menuOpen ? ' open' : ''}`} />
      </button>

      {menuOpen && (
        <motion.div
          className="topnav__drawer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="topnav__drawer-link" onClick={(e) => handleLink(e, href)}>
              {label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
