/* text-scramble.jsx — ported from the TextScramble component */
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

export function TextScramble({
  children,
  duration = 0.7,
  speed = 0.035,
  characterSet = DEFAULT_CHARS,
  className,
  as: Component = 'span',
  trigger = true,
  onScrambleComplete,
  ...props
}) {
  const MotionComponent = motion.create(Component);
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);
  const text = children;

  const scramble = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { scrambled += ' '; continue; }
        if (progress * text.length > i) {
          scrambled += text[i];
        } else {
          scrambled += characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        setIsAnimating(false);
        onScrambleComplete?.();
      }
    }, speed * 1000);
  };

  useEffect(() => {
    if (!trigger) return;
    scramble();
  }, [trigger]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}
