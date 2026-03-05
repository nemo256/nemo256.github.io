/* CursorEffect.jsx — smaller cursor + zoom/scale on hover */
import { useEffect, useRef, useState } from 'react';
import './CursorEffect.css';

function isTouchDevice() {
  return window.matchMedia('(hover: none), (pointer: coarse)').matches;
}

const INTERACTIVE = 'a, button, [role="button"], .proj__card-img-wrap, .proj__tag, .skills__pill, .tl__item';

export default function CursorEffect() {
  const canvasRef = useRef(null);
  const [isTouch] = useState(() => isTouchDevice());

  useEffect(() => {
    if (isTouch) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: -9999, y: -9999, px: -9999, py: -9999 };
    let isHovering = false;
    let cursorScale = 1;
    let targetScale = 1;

    const onMove = (e) => {
      mouse.px = mouse.x; mouse.py = mouse.y;
      mouse.x = e.clientX; mouse.y = e.clientY;
      const speed = Math.hypot(mouse.x - mouse.px, mouse.y - mouse.py);
      const count = Math.min(Math.floor(speed * 0.5), 6);
      for (let i = 0; i < count; i++) spawnParticle();
      if (speed > 2) spawnBeam();

      const el = document.elementFromPoint(e.clientX, e.clientY);
      isHovering = el ? !!el.closest(INTERACTIVE) : false;
      targetScale = isHovering ? 1.9 : 1;
    };
    window.addEventListener('mousemove', onMove);

    const onClick = (e) => spawnClickBurst(e.clientX, e.clientY);
    window.addEventListener('click', onClick);

    const particles = [];
    function spawnParticle() {
      const angle = Math.random() * Math.PI * 2;
      const spd   = Math.random() * 1.6 + 0.3;
      particles.push({ x: mouse.x, y: mouse.y, vx: Math.cos(angle)*spd, vy: Math.sin(angle)*spd,
        life: 1, decay: Math.random()*0.035 + 0.025, size: Math.random()*1.8+0.4, star: Math.random()>0.65 });
    }

    const beams = [];
    function spawnBeam() {
      const dx = mouse.x - mouse.px, dy = mouse.y - mouse.py;
      const angle = Math.atan2(dy, dx);
      for (let i = 0; i < Math.floor(Math.random()*2)+2; i++) {
        const a = angle + (Math.random()-0.5)*0.7;
        beams.push({ x: mouse.x, y: mouse.y, angle: a, length: Math.random()*70+35,
          life: 1, decay: Math.random()*0.05+0.04, width: Math.random()*1.1+0.35 });
      }
    }

    const bursts = [];
    function spawnClickBurst(cx, cy) {
      bursts.push({ type:'ring', x:cx, y:cy, r:0, life:1, decay:0.04 });
      for (let i=0; i<10; i++) {
        const a = (i/10)*Math.PI*2, spd = Math.random()*4+2;
        bursts.push({ type:'spark', x:cx, y:cy, vx:Math.cos(a)*spd, vy:Math.sin(a)*spd,
          life:1, decay:0.035, size:Math.random()*2.5+1 });
      }
    }

    function drawStar(cx, cy, r, opacity) {
      ctx.save(); ctx.translate(cx, cy);
      ctx.strokeStyle = `rgba(255,255,255,${opacity})`; ctx.lineWidth = 0.7;
      for (let i=0; i<4; i++) {
        const a=(i/4)*Math.PI*2;
        ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*r*3, Math.sin(a)*r*3); ctx.stroke();
      }
      ctx.beginPath(); ctx.arc(0,0,r*0.6,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${opacity})`; ctx.fill(); ctx.restore();
    }

    function drawCursor() {
      const x=mouse.x, y=mouse.y;
      cursorScale += (targetScale - cursorScale) * 0.13;
      const s = cursorScale;

      /* Outer ring — base 18px */
      ctx.beginPath(); ctx.arc(x, y, 18*s, 0, Math.PI*2);
      ctx.strokeStyle = isHovering ? `rgba(255,255,255,${0.45/s})` : 'rgba(255,255,255,0.22)';
      ctx.lineWidth = isHovering ? 1.5 : 1;
      ctx.stroke();

      /* Inner ring */
      ctx.beginPath(); ctx.arc(x, y, 9*s, 0, Math.PI*2);
      ctx.strokeStyle = 'rgba(255,255,255,0.07)';
      ctx.lineWidth = 1; ctx.stroke();

      /* Dot */
      ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI*2);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = isHovering ? 'rgba(255,255,255,0.9)' : 'transparent';
      ctx.shadowBlur = isHovering ? 10 : 0;
      ctx.fill(); ctx.shadowBlur = 0;

      /* Crosshair */
      const g=5, ss=13;
      ctx.strokeStyle='rgba(255,255,255,0.28)'; ctx.lineWidth=0.8;
      [[x-ss,y,x-g,y],[x+g,y,x+ss,y],[x,y-ss,x,y-g],[x,y+g,x,y+ss]].forEach(([x1,y1,x2,y2])=>{
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      beams.forEach((b,i) => {
        b.life -= b.decay;
        if (b.life<=0){ beams.splice(i,1); return; }
        const ex=b.x+Math.cos(b.angle)*b.length*(2-b.life);
        const ey=b.y+Math.sin(b.angle)*b.length*(2-b.life);
        const grad=ctx.createLinearGradient(b.x,b.y,ex,ey);
        grad.addColorStop(0,`rgba(255,255,255,${b.life*0.65})`);
        grad.addColorStop(0.4,`rgba(200,220,255,${b.life*0.35})`);
        grad.addColorStop(1,'rgba(150,180,255,0)');
        ctx.strokeStyle=grad; ctx.lineWidth=b.width*b.life;
        ctx.shadowColor='rgba(200,220,255,0.4)'; ctx.shadowBlur=4*b.life;
        ctx.beginPath(); ctx.moveTo(b.x,b.y); ctx.lineTo(ex,ey); ctx.stroke();
        ctx.shadowBlur=0;
      });

      particles.forEach((p,i) => {
        p.x+=p.vx; p.y+=p.vy; p.vx*=0.97; p.vy*=0.97; p.life-=p.decay;
        if(p.life<=0){ particles.splice(i,1); return; }
        if(p.star) { drawStar(p.x,p.y,p.size*0.55,p.life*0.75); }
        else {
          ctx.beginPath(); ctx.arc(p.x,p.y,p.size*p.life,0,Math.PI*2);
          ctx.fillStyle=`rgba(255,255,255,${p.life*0.65})`;
          ctx.shadowColor='rgba(200,230,255,0.7)'; ctx.shadowBlur=3;
          ctx.fill(); ctx.shadowBlur=0;
        }
      });

      bursts.forEach((b,i) => {
        b.life -= b.decay;
        if(b.life<=0){ bursts.splice(i,1); return; }
        if(b.type==='ring'){
          b.r+=3.5;
          ctx.beginPath(); ctx.arc(b.x,b.y,b.r,0,Math.PI*2);
          ctx.strokeStyle=`rgba(255,255,255,${b.life*0.45})`; ctx.lineWidth=1.5*b.life; ctx.stroke();
        } else {
          b.x+=b.vx; b.y+=b.vy; b.vx*=0.93; b.vy*=0.93;
          drawStar(b.x,b.y,b.size*0.65,b.life*0.85);
        }
      });

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

  if (isTouch) return null;
  return <canvas ref={canvasRef} className="cursor-canvas" />;
}
