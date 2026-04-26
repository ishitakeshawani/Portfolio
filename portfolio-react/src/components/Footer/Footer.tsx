import type { ComponentType, SVGProps } from 'react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/Icons';
import { socials } from '@/data/socials';
import styles from './Footer.module.css';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const iconByLabel: Record<string, ComponentType<IconProps>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.heading}>Connect with me</div>
        <ul className={styles.list}>
          {socials.map((social) => {
            const Icon = iconByLabel[social.label];
            return (
              <li key={social.label}>
                <a
                  className={styles.link}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                >
                  {Icon ? <Icon size={18} /> : social.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className={styles.copyright}>
          © {year} Ishita Keshawani. Built with React & Vite.
        </div>
      </div>
    </footer>
  );
}
