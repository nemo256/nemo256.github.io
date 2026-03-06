/* Footer.jsx */
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <span className="footer__copy">© {year} Lamine Neggazi</span>
      <span className="footer__arch">I USE ARCH BTW</span>
    </footer>
  );
}
