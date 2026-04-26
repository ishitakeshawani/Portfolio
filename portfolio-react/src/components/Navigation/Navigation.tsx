import { NavLink } from 'react-router-dom';
import {
  BookOpenIcon,
  BriefcaseIcon,
  HomeIcon,
  MailIcon,
} from '@/components/Icons';
import styles from './Navigation.module.css';

const CONTACT_EMAIL = 'keshwaniishita054@gmail.com';

type IconType = (props: { size?: number }) => JSX.Element;

const navItems: { to: string; label: string; Icon: IconType }[] = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/projects', label: 'Projects', Icon: BriefcaseIcon },
  { to: '/blogs', label: 'Blogs', Icon: BookOpenIcon },
];

export function Navigation() {
  return (
    <>
      <nav className={styles.topNav} aria-label="Primary">
        <div className={styles.inner}>
          <div className={styles.spacer} aria-hidden="true" />
          <ul className={styles.list}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    isActive ? `${styles.link} ${styles.active}` : styles.link
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <a
              className={styles.cta}
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Get in touch via email"
            >
              <MailIcon size={14} />
              <span>Get in touch</span>
            </a>
          </div>
        </div>
      </nav>

      <nav className={styles.bottomNav} aria-label="Mobile primary">
        <ul className={styles.bottomList}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.bottomLink} ${styles.bottomActive}`
                    : styles.bottomLink
                }
              >
                <item.Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
          <li>
            <a
              className={styles.bottomLink}
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label="Get in touch via email"
            >
              <MailIcon size={20} />
              <span>Contact</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
