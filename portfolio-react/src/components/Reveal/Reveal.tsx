import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';
import styles from './Reveal.module.css';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, revealed } = useReveal();
  const style: CSSProperties | undefined = delay
    ? { transitionDelay: `${delay}ms` }
    : undefined;

  const cls = [styles.reveal, revealed ? styles.revealed : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={cls} style={style}>
      {children}
    </div>
  );
}
