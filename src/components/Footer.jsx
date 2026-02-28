/* Footer.jsx — copyright + GitHub & LinkedIn links */
import './Footer.css';
import { Github, Linkedin } from 'lucide-react';

const GITHUB_URL   = 'https://github.com/nemo256';
const LINKEDIN_URL = 'https://linkedin.com/in/lamine-neggazi';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <span className="footer__copy">© {year} Lamine Neggazi</span>

      <div className="footer__links">
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="footer__icon-link" aria-label="GitHub">
          <Github size={18} strokeWidth={1.5} />
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="footer__icon-link" aria-label="LinkedIn">
          <Linkedin size={18} strokeWidth={1.5} />
        </a>
      </div>
    </footer>
  );
}
