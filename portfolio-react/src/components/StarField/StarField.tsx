import { useEffect, useRef } from 'react';
import styles from './StarField.module.css';

type Star = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  drift: number;
};

type Shooter = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
};

export function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let shooters: Shooter[] = [];
    let rafId = 0;
    let lastShooterAt = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(240, Math.floor((width * height) / 6500));
      stars = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.55 + 0.45,
        twinkleSpeed: Math.random() * 0.025 + 0.005,
        phase: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.05,
      }));
    };

    const spawnShooter = () => {
      const startX = Math.random() * width * 0.7;
      const startY = Math.random() * height * 0.4;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
      const speed = 9 + Math.random() * 6;
      shooters.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 55,
      });
    };

    const tick = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      for (const s of stars) {
        if (!reducedMotion) {
          s.phase += s.twinkleSpeed;
          s.y += s.drift;
          if (s.y < 0) s.y = height;
          else if (s.y > height) s.y = 0;
        }
        const alpha = s.baseAlpha * (0.5 + 0.5 * Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      if (!reducedMotion) {
        if (now - lastShooterAt > 4000 && Math.random() < 0.02) {
          spawnShooter();
          lastShooterAt = now;
        }

        shooters = shooters.filter((sh) => {
          sh.x += sh.vx;
          sh.y += sh.vy;
          sh.life += 1;

          const lifeRatio = sh.life / sh.maxLife;
          const alpha = Math.max(0, 1 - lifeRatio);

          const tailX = sh.x - sh.vx * 7;
          const tailY = sh.y - sh.vy * 7;
          const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
          grad.addColorStop(0, `rgba(220, 200, 255, ${alpha})`);
          grad.addColorStop(1, 'rgba(220, 200, 255, 0)');

          ctx.beginPath();
          ctx.moveTo(sh.x, sh.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(sh.x, sh.y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          return (
            sh.life < sh.maxLife &&
            sh.x < width + 80 &&
            sh.y < height + 80
          );
        });
      }

      rafId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
}
