/* CursorEffect.jsx — Rounded pointer + MeshLine trailing effect */
import { useEffect, useRef, useState } from 'react';
import './CursorEffect.css';

function isTouchDevice() {
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

const NUM_POINTS = 32;   // more points = longer trail
const NUM_LINES  = 4;

function makeLines() {
  return Array.from({ length: NUM_LINES }, (_, i) => {
    const angle  = (i / NUM_LINES) * Math.PI * 2;
    const radius = 0.10 + (Math.random() * 0.06 - 0.03);
    const ox     = Math.cos(angle) * radius * 90;
    const oy     = Math.sin(angle) * radius * 90;
    const spring  = 0.065 + (Math.random() * 0.03 - 0.015);
    const friction = 0.86 + (Math.random() * 0.04 - 0.02);
    return { points: null, ox, oy, vx: 0, vy: 0, spring, friction };
  });
}

export default function CursorEffect() {
  const canvasRef = useRef(null);
  const [isTouch] = useState(() => isTouchDevice());

  useEffect(() => {
    if (isTouch) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', onMove);

    const lines = makeLines();
    // Init all points
    lines.forEach(line => {
      line.points = Array.from({ length: NUM_POINTS }, () => ({
        x: mouse.x + line.ox,
        y: mouse.y + line.oy,
      }));
    });

    // Detect theme
    const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

    // Width taper: thin at tail, full in middle, thin at head
    function widthAt(t) {
      const edge = 0.15;
      if (t < edge) return 2.8 * (t / edge);
      if (t > 1 - edge) return 2.8 * ((1 - t) / edge);
      return 2.8;
    }

    // Draw one tapered ribbon
    function drawMeshLine(points, dark) {
      const n = points.length;
      if (n < 2) return;
      for (let i = 0; i < n - 1; i++) {
        const t  = i / (n - 1);
        const p0 = points[i];
        const p1 = points[i + 1];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny =  dx / len;
        const w = widthAt(t);
        // alpha: strong in the body, fades at the tail
        const alpha = dark
          ? (0.12 + (1 - t) * 0.38)
          : (0.10 + (1 - t) * 0.45);
        const rgb = dark ? '255,255,255' : '0,0,0';
        ctx.beginPath();
        ctx.moveTo(p0.x + nx * w, p0.y + ny * w);
        ctx.lineTo(p1.x + nx * w, p1.y + ny * w);
        ctx.lineTo(p1.x - nx * w, p1.y - ny * w);
        ctx.lineTo(p0.x - nx * w, p0.y - ny * w);
        ctx.closePath();
        ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
        ctx.fill();
      }
    }

    // Draw cursor dot — large solid circle
    function drawCursor(x, y, dark) {
      const r = 10;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = dark ? '#ffffff' : '#000000';
      ctx.shadowColor = dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.35)';
      ctx.shadowBlur  = 12;
      ctx.fill();
      ctx.shadowBlur  = 0;
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dark = isDark();

      lines.forEach(line => {
        const targetX = mouse.x + line.ox;
        const targetY = mouse.y + line.oy;

        // Spring physics on head
        const head = line.points[0];
        const fx = (targetX - head.x) * line.spring;
        const fy = (targetY - head.y) * line.spring;
        line.vx = (line.vx + fx) * line.friction;
        line.vy = (line.vy + fy) * line.friction;
        head.x += line.vx;
        head.y += line.vy;

        // Each point follows the one ahead — slower lerp = longer persistence
        for (let i = 1; i < NUM_POINTS; i++) {
          line.points[i].x += (line.points[i - 1].x - line.points[i].x) * 0.28;
          line.points[i].y += (line.points[i - 1].y - line.points[i].y) * 0.28;
        }

        drawMeshLine(line.points, dark);
      });

      drawCursor(mouse.x, mouse.y, dark);
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, [isTouch]);

  if (isTouch) return null;
  return <canvas ref={canvasRef} className="cursor-canvas" />;
}
