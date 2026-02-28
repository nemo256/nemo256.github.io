/* ScrollBar.jsx — smooth scroll progress using requestAnimationFrame */
import { useEffect, useRef } from 'react';
import './ScrollBar.css';

export default function ScrollBar() {
  const fillRef = useRef(null);

  useEffect(() => {
    let rafId;

    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${pct / 100})`;
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update(); // initial
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="scrollbar-track">
      <div className="scrollbar-fill" ref={fillRef} />
    </div>
  );
}
