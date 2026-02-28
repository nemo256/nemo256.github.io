/* Footer.jsx */
import { motion } from 'framer-motion';
import './Footer.css';

const WHATSAPP_URL = 'https://wa.me/213794696605';

export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer__name">LAMINE NEGGAZI · 2026</span>

      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        className="footer__cta"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        LET'S BUILD
      </motion.a>
    </footer>
  );
}
