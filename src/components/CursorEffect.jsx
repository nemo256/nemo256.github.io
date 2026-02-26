/* CursorEffect.jsx — Desktop only: laser beams + click burst. Hidden on touch devices. */
import { useEffect, useRef, useState } from 'react';
import './CursorEffect.css';

function isTouchDevice() {
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

export default function CursorEffect() {
  const canvasRef = useRef(null);
  const [isTouch] = useState(() => isTouchDevice());

  useEffect(() => {
    // Don't run on touch/mobile devices
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999 };

    const onMove = (e) => {
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      const speed = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      const count = Math.min(Math.floor(speed * 0.6), 8);
      for (let i = 0; i < count; i++) spawnParticle();
      if (speed > 2) spawnBeam();
    };
    window.addEventListener('mousemove', onMove);

    const onClick = (e) => spawnClickBurst(e.clientX, e.clientY);
    window.addEventListener('click', onClick);

    // ── Particles ──────────────────────────────────────────
    const particles = [];
    function spawnParticle() {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.8 + 0.3;
      particles.push({
        x: mouse.x, y: mouse.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: Math.random() * 0.03 + 0.02,
        size: Math.random() * 2 + 0.5,
        star: Math.random() > 0.6,
      });
    }

    // ── Beams ──────────────────────────────────────────────
    const beams = [];
    function spawnBeam() {
      const dx = mouse.x - mouse.px;
      const dy = mouse.y - mouse.py;
      const angle = Math.atan2(dy, dx);
      const count = Math.floor(Math.random() * 2) + 2;
      for (let i = 0; i < count; i++) {
        const a = angle + (Math.random() - 0.5) * 0.7;
        beams.push({
          x: mouse.x, y: mouse.y,
          angle: a,
          length: Math.random() * 80 + 40,
          life: 1,
          decay: Math.random() * 0.05 + 0.04,
          width: Math.random() * 1.2 + 0.4,
        });
      }
    }

    // ── Click burst ────────────────────────────────────────
    const bursts = [];
    function spawnClickBurst(cx, cy) {
      bursts.push({ type: 'ring', x: cx, y: cy, r: 0, life: 1, decay: 0.04 });
      for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        bursts.push({
          type: 'spark',
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1, decay: 0.035,
          size: Math.random() * 2.5 + 1,
        });
      }
    }

    // ── Helpers ────────────────────────────────────────────
    function drawStar(cx, cy, r, opacity) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
      ctx.lineWidth = 0.8;
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * r * 3, Math.sin(a) * r * 3);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;
      ctx.fill();
      ctx.restore();
    }

    function drawCursor() {
      const x = mouse.x, y = mouse.y;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fill();
      const s = 14, g = 6;
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 0.8;
      [[x-s,y,x-g,y],[x+g,y,x+s,y],[x,y-s,x,y-g],[x,y+g,x,y+s]].forEach(([x1,y1,x2,y2]) => {
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      });
    }

    // ── Main loop ──────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = beams.length - 1; i >= 0; i--) {
        const b = beams[i];
        b.life -= b.decay;
        if (b.life <= 0) { beams.splice(i, 1); continue; }
        const ex = b.x + Math.cos(b.angle) * b.length * (2 - b.life);
        const ey = b.y + Math.sin(b.angle) * b.length * (2 - b.life);
        const grad = ctx.createLinearGradient(b.x, b.y, ex, ey);
        grad.addColorStop(0, `rgba(255,255,255,${b.life * 0.7})`);
        grad.addColorStop(0.4, `rgba(200,220,255,${b.life * 0.4})`);
        grad.addColorStop(1, `rgba(150,180,255,0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = b.width * b.life;
        ctx.shadowColor = 'rgba(200,220,255,0.5)';
        ctx.shadowBlur = 5 * b.life;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.97; p.vy *= 0.97;
        p.life -= p.decay;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        if (p.star) {
          drawStar(p.x, p.y, p.size * 0.6, p.life * 0.8);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${p.life * 0.7})`;
          ctx.shadowColor = 'rgba(200,230,255,0.8)';
          ctx.shadowBlur = 4;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.life -= b.decay;
        if (b.life <= 0) { bursts.splice(i, 1); continue; }
        if (b.type === 'ring') {
          b.r += 3.5;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${b.life * 0.5})`;
          ctx.lineWidth = 1.5 * b.life;
          ctx.stroke();
        } else {
          b.x += b.vx; b.y += b.vy;
          b.vx *= 0.93; b.vy *= 0.93;
          drawStar(b.x, b.y, b.size * 0.7, b.life * 0.9);
        }
      }

      drawCursor();
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, [isTouch]);

  // Don't render canvas at all on touch devices
  if (isTouch) return null;

  return <canvas ref={canvasRef} className="cursor-canvas" />;
}
