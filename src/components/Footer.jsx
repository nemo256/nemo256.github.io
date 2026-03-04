/* Footer.jsx */
import './Footer.css';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const GITHUB_URL   = 'https://github.com/nemo256';
const LINKEDIN_URL = 'https://linkedin.com/in/lamine-neggazi';

const LINKS = [
  { href: GITHUB_URL,   icon: Github,   label: 'GITHUB'   },
  { href: LINKEDIN_URL, icon: Linkedin, label: 'LINKEDIN' },
];

function SocialLink({ href, icon: Icon, label }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="footer__social"
      aria-label={label}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Icon size={17} strokeWidth={1.5} className="footer__social-icon" />
      <motion.span
        className="footer__social-label"
        variants={{
          rest:  { width: 0,      opacity: 0, marginLeft: 0 },
          hover: { width: 'auto', opacity: 1, marginLeft: 9 },
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
      </motion.span>
    </motion.a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <span className="footer__copy">© {year} Lamine Neggazi</span>
      <div className="footer__links">
        {LINKS.map(l => <SocialLink key={l.label} {...l} />)}
      </div>
    </footer>
  );
}
