/* ScrollBar.jsx — top progress bar that mirrors scroll position */
import { useEffect, useState } from 'react';
import './ScrollBar.css';

export default function ScrollBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="scrollbar-track">
      <div className="scrollbar-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}
