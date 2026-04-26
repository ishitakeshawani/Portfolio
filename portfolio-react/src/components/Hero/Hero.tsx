import type { ReactNode } from 'react';
import styles from './Hero.module.css';

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <section className={styles.pageHeader}>
      {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </section>
  );
}

export const Accent = ({ children }: { children: ReactNode }) => (
  <span className={styles.accent}>{children}</span>
);
