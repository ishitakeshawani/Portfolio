import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

const HIDE_CURSOR_CLASS = 'cursor-custom';
const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor-interactive]';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const supportsHover = window.matchMedia('(hover: hover)').matches;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (!supportsHover || reducedMotion) return;

    document.body.classList.add(HIDE_CURSOR_CLASS);

    let targetX = 0;
    let targetY = 0;
    let ringX = 0;
    let ringY = 0;
    let scale = 1;
    let targetScale = 1;
    let firstMove = true;
    let rafId = 0;
    const rotPerFrame = 0.6;
    let rot = 0;

    const handleMove = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;

      if (firstMove) {
        ringX = targetX;
        ringY = targetY;
        firstMove = false;
        dot.classList.add(styles.visible);
        ring.classList.add(styles.visible);
      }

      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;

      const target = event.target as HTMLElement | null;
      const isInteractive = !!target?.closest?.(INTERACTIVE);
      targetScale = isInteractive ? 1.6 : 1;
    };

    const handleLeave = () => {
      dot.classList.remove(styles.visible);
      ring.classList.remove(styles.visible);
    };

    const handleEnter = () => {
      if (!firstMove) {
        dot.classList.add(styles.visible);
        ring.classList.add(styles.visible);
      }
    };

    const tick = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      scale += (targetScale - scale) * 0.18;
      rot = (rot + rotPerFrame) % 360;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) rotate(${rot}deg) scale(${scale})`;
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    document.addEventListener('mouseenter', handleEnter);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove(HIDE_CURSOR_CLASS);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.removeEventListener('mouseenter', handleEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={styles.ring} aria-hidden="true" />
      <div ref={dotRef} className={styles.dot} aria-hidden="true" />
    </>
  );
}
