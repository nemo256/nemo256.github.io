/* border-beam.jsx */

/* ── Standard BorderBeam (rectangular elements) ── */
export function BorderBeam({
  size = 200,
  duration = 12,
  borderWidth = 2,
  colorFrom,
  colorTo,
  delay = 0,
  style = {},
  ...props
}) {
  const from = colorFrom ?? 'rgba(255,255,255,0.9)';
  const to   = colorTo   ?? 'rgba(255,255,255,0)';
  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        borderRadius: 'inherit',
        border: `${borderWidth}px solid transparent`,
        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        WebkitMaskClip: 'padding-box, border-box',
        pointerEvents: 'none',
        ...style,
      }}
      {...props}
    >
      <div style={{ position:'absolute', inset:0, borderRadius:'inherit', overflow:'hidden' }}>
        <div style={{
          position:'absolute', aspectRatio:'1', width:`${size}px`,
          animationDuration:`${duration}s`, animationDelay:`-${delay}s`,
          animationTimingFunction:'linear', animationIterationCount:'infinite',
          animationName:'border-beam-travel',
          offsetPath:'border-box', offsetDistance:'0%',
          background:`radial-gradient(closest-side, ${from}, ${to})`,
          filter:'blur(5px)', transform:'translateX(-50%) translateY(-50%)',
        }} />
      </div>
    </div>
  );
}

/* ── CircleBorderBeam ──
   A glowing comet arc that sweeps around the circular border.
   Uses conic-gradient (the comet) + radial-gradient mask (reveals only the ring band).
   Sizes itself to 100% of the parent so it works at any CSS-driven size.
   Parent (.hero__avatar-beam-wrap) must be position:relative with a fixed size.
*/
export function CircleBorderBeam({
  duration = 5,
  borderWidth = 3,
  color,
  delay = 0,
  style = {},
  ...props
}) {
  const c = color ?? 'rgba(255,255,255,1)';
  // Negative inset pushes the beam div slightly beyond the wrap,
  // so its edge aligns with the outer edge of the image ring.
  const outset = borderWidth + 2;

  return (
    <div
      style={{
        position: 'absolute',
        inset: `-${outset}px`,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 10,
        background: `conic-gradient(from 0deg, ${c} 0deg, ${c} 15deg, transparent 80deg, transparent 360deg)`,
        // Mask: show only the ring band at the very edge
        WebkitMask: `radial-gradient(circle, transparent calc(50% - ${borderWidth + 1}px), black calc(50% - 1px), black calc(50% + 1px), transparent calc(50% + ${borderWidth + 1}px))`,
        mask:        `radial-gradient(circle, transparent calc(50% - ${borderWidth + 1}px), black calc(50% - 1px), black calc(50% + 1px), transparent calc(50% + ${borderWidth + 1}px))`,
        animationName: 'circle-beam-spin',
        animationDuration: `${duration}s`,
        animationDelay: `-${delay}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        filter: `blur(${Math.max(1, borderWidth * 0.6)}px) brightness(1.6)`,
        ...style,
      }}
      {...props}
    />
  );
}
