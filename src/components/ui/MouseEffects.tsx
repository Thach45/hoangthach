'use client';

import { useEffect, useRef, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function MouseEffects() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    if (!finePointer.matches) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    const followers = Array.from({ length: 4 }, () => ({ x, y }));
    let isInteractive = false;

    const render = () => {
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x - 18}px, ${y - 18}px, 0) scale(${isInteractive ? 1.45 : 1})`;
        ringRef.current.style.opacity = isInteractive ? '0.95' : '0.65';
      }
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;

      followers.forEach((follower, index) => {
        const speed = 0.24 - index * 0.035;
        follower.x += (x - follower.x) * speed;
        follower.y += (y - follower.y) * speed;
        const trail = trailRefs.current[index];
        if (trail) trail.style.transform = `translate3d(${follower.x - 3}px, ${follower.y - 3}px, 0)`;
      });
      frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      isInteractive = Boolean((event.target as Element | null)?.closest('a, button, input, textarea, select, [role="button"]'));
    };

    const onPointerDown = (event: PointerEvent) => {
      const id = Date.now();
      setRipples((current) => [...current.slice(-3), { id, x: event.clientX, y: event.clientY }]);
      window.setTimeout(() => setRipples((current) => current.filter((ripple) => ripple.id !== id)), 650);
    };

    frame = requestAnimationFrame(render);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" aria-hidden="true">
      <div ref={ringRef} className="absolute h-9 w-9 rounded-full border border-brand/80 bg-brand/10 shadow-[0_0_24px_hsl(var(--brand)/0.35)] transition-[opacity,transform] duration-150" />
      <div ref={dotRef} className="absolute h-1.5 w-1.5 rounded-full bg-brand shadow-[0_0_12px_hsl(var(--brand)/0.9)]" />
      {[0, 1, 2, 3].map((index) => (
        <div key={index} ref={(element) => { if (element) trailRefs.current[index] = element; }} className="absolute h-1.5 w-1.5 rounded-full bg-brand" style={{ opacity: 0.34 - index * 0.07 }} />
      ))}
      {ripples.map((ripple) => <span key={ripple.id} className="mouse-ripple" style={{ left: ripple.x, top: ripple.y }} />)}
    </div>
  );
}
