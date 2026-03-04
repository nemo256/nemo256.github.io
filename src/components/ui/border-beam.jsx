/* border-beam.jsx */
export function BorderBeam({
  size = 200,
  duration = 12,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = "rgba(255,255,255,0.8)",
  colorTo = "rgba(255,255,255,0)",
  delay = 0,
  className = "",
  style = {},
  ...props
}) {
  return (
    <div
      style={{
        "--size": size,
        "--duration": duration,
        "--anchor": anchor,
        "--border-width": borderWidth,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": `-${delay}s`,
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        border: `calc(var(--border-width) * 1px) solid transparent`,
        WebkitMask:
          "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        WebkitMaskClip: "padding-box, border-box",
        pointerEvents: "none",
        ...style,
      }}
      className={`border-beam-outer ${className}`}
      {...props}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            aspectRatio: "1",
            width: "calc(var(--size) * 1px)",
            animationDuration: "calc(var(--duration) * 1s)",
            animationDelay: "var(--delay)",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationName: "border-beam-travel",
            offsetPath: "border-box",
            offsetDistance: "0%",
            background: `radial-gradient(closest-side, ${colorFrom}, ${colorTo})`,
            filter: "blur(4px)",
            transform: "translateX(-50%) translateY(-50%)",
          }}
        />
      </div>
    </div>
  );
}
