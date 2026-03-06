/* AvatarBeam.jsx — always matches ring size at any breakpoint via ResizeObserver */
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AvatarBeam({ active, dark, ringRef }) {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ angle: 0, active, dark, ringSize: 220 });

  useEffect(() => { stateRef.current.active = active; }, [active]);
  useEffect(() => { stateRef.current.dark   = dark;   }, [dark]);

  // Watch the actual ring element size and keep canvas in sync
  useEffect(() => {
    const ring = ringRef?.current;
    if (!ring) return;
    const sync = () => {
      const size = ring.getBoundingClientRect().width;
      stateRef.current.ringSize = size;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const cs = Math.round(size + 40); // 20px padding each side for glow
      if (canvas.width !== cs) {
        canvas.width  = cs;
        canvas.height = cs;
      }
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(ring);
    return () => ro.disconnect();
  }, [ringRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let raf;
    const draw = () => {
      const { active, dark, ringSize } = stateRef.current;
      stateRef.current.angle += active ? 0.065 : 0.018;

      const s   = canvas.width;
      const cx  = s / 2;
      const cy  = s / 2;
      const r   = ringSize / 2;          // exact ring radius from live measurement
      const bw  = active ? 6.5 : 3.5;
      const col = dark ? '255,255,255' : '0,0,0';
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, s, s);

      const a    = stateRef.current.angle;
      const tail = (160 * Math.PI) / 180;
      const segs = 60;
      for (let i = 0; i < segs; i++) {
        const t0    = a - tail + (tail / segs) * i;
        const t1    = a - tail + (tail / segs) * (i + 1);
        const alpha = i / segs;
        ctx.beginPath();
        ctx.arc(cx, cy, r, t0, t1);
        ctx.strokeStyle = `rgba(${col},${(alpha * alpha * 0.95).toFixed(3)})`;
        ctx.lineWidth   = bw * (0.25 + alpha * 0.75);
        ctx.lineCap     = 'round';
        ctx.stroke();
      }

      const hx   = cx + Math.cos(a) * r;
      const hy   = cy + Math.sin(a) * r;
      const grad = ctx.createRadialGradient(hx, hy, 0, hx, hy, bw * 3.5);
      grad.addColorStop(0,   `rgba(${col},0.98)`);
      grad.addColorStop(0.4, `rgba(${col},0.5)`);
      grad.addColorStop(1,   `rgba(${col},0)`);
      ctx.beginPath();
      ctx.arc(hx, hy, bw * 3.5, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      variants={{ hover: { scale: 1.05 } }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      <canvas ref={canvasRef} width={260} height={260} style={{ display: 'block' }} />
    </motion.div>
  );
}
