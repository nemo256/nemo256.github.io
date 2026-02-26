/* Carousel.jsx — Full left/right click zones to navigate slides */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Carousel.css';

export default function Carousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir) => {
    setDirection(dir);
    setCurrent((c) => (c + dir + images.length) % images.length);
  };

  const variants = {
    enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="carousel">
      <div className="carousel__track">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Slide ${current + 1}`}
            className="carousel__img"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Left half — click to go prev */}
      <button
        className="carousel__zone carousel__zone--left"
        onClick={() => go(-1)}
        aria-label="Previous image"
      >
        <span className="carousel__zone-hint">‹</span>
      </button>

      {/* Right half — click to go next */}
      <button
        className="carousel__zone carousel__zone--right"
        onClick={() => go(1)}
        aria-label="Next image"
      >
        <span className="carousel__zone-hint">›</span>
      </button>

      {/* Dots */}
      <div className="carousel__dots">
        {images.map((_, i) => (
          <button
            key={i}
            className={`carousel__dot ${i === current ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
