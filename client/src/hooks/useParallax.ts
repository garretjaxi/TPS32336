import { useEffect, useRef, useState } from 'react';

interface ParallaxOptions {
  speed?: number; // 0.1 to 1.0, lower = more parallax effect
  direction?: 'up' | 'down';
}

export function useParallax(options: ParallaxOptions = {}) {
  const { speed = 0.5, direction = 'up' } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const windowCenter = window.innerHeight / 2;
      const distance = elementCenter - windowCenter;

      // Calculate parallax offset based on distance from center
      const parallaxOffset = distance * speed;
      setOffset(direction === 'up' ? parallaxOffset : -parallaxOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return {
    ref,
    style: {
      transform: `translateY(${offset}px)`,
      transition: 'transform 0.1s ease-out',
    },
  };
}
