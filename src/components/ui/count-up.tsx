
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CountUpProps {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  easing?: (t: number) => number;
  onComplete?: () => void;
}

// Easing functions
const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export function CountUp({
  start = 0,
  end,
  duration = 2,
  delay = 0,
  decimals = 0,
  easing = easeOutExpo,
  onComplete,
}: CountUpProps) {
  const [value, setValue] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const frameRef = useRef<number>(0);

  const animateValue = (timestamp: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / (duration * 1000), 1);
    const easedProgress = easing(progress);
    
    const currentValue = start + (end - start) * easedProgress;
    setValue(currentValue);

    if (progress < 1) {
      frameRef.current = requestAnimationFrame(animateValue);
    } else {
      setValue(end);
      if (onComplete) onComplete();
    }
  };

  useEffect(() => {
    if (inView && !hasStarted) {
      setHasStarted(true);
      
      // Add delay if needed
      if (delay > 0) {
        const timeout = setTimeout(() => {
          frameRef.current = requestAnimationFrame(animateValue);
        }, delay * 1000);
        
        return () => clearTimeout(timeout);
      } else {
        frameRef.current = requestAnimationFrame(animateValue);
      }
    }
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [inView, hasStarted]);

  return (
    <span ref={ref}>
      {value.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
