import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import styles from './TechBubbles.module.css';

const NATURAL_SIZE = 560;

const DEVICON =
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const ICONIFY = 'https://api.iconify.design';

type Planet = {
  name: string;
  src: string;
  featured?: boolean;
};

type Orbit = {
  radius: number;
  duration: number;
  planetSize: number;
  planets: Planet[];
};

const orbits: Orbit[] = [
  {
    radius: 78,
    duration: 28,
    planetSize: 50,
    planets: [
      { name: 'React', src: `${DEVICON}/react/react-original.svg` },
      {
        name: 'JavaScript',
        src: `${DEVICON}/javascript/javascript-original.svg`,
      },
      {
        name: 'TypeScript',
        src: `${DEVICON}/typescript/typescript-original.svg`,
      },
    ],
  },
  {
    radius: 134,
    duration: 56,
    planetSize: 44,
    planets: [
      { name: 'Java', src: `${DEVICON}/java/java-original.svg` },
      { name: 'Spring Boot', src: `${DEVICON}/spring/spring-original.svg` },
      { name: 'GraphQL', src: `${DEVICON}/graphql/graphql-plain.svg` },
      { name: 'MongoDB', src: `${DEVICON}/mongodb/mongodb-original.svg` },
    ],
  },
  {
    radius: 188,
    duration: 90,
    planetSize: 40,
    planets: [
      { name: 'Redux', src: `${DEVICON}/redux/redux-original.svg` },
      { name: 'MySQL', src: `${DEVICON}/mysql/mysql-original.svg` },
      { name: 'HTML5', src: `${DEVICON}/html5/html5-original.svg` },
      { name: 'C++', src: `${DEVICON}/cplusplus/cplusplus-original.svg` },
    ],
  },
  {
    radius: 244,
    duration: 130,
    planetSize: 50,
    planets: [
      {
        name: 'AI Agents',
        src: `${ICONIFY}/lucide:bot.svg?color=%23c084fc`,
        featured: true,
      },
      {
        name: 'AI Engineering',
        src: `${ICONIFY}/lucide:brain-cog.svg?color=%23c084fc`,
        featured: true,
      },
    ],
  },
];

const planetInstances = orbits.flatMap((orbit, oi) =>
  orbit.planets.map((planet, pi) => {
    const slot = 360 / orbit.planets.length;
    const baseAngle = slot * pi;
    const jitter = (Math.random() - 0.5) * slot * 0.5;
    const startAngle = (baseAngle + jitter + 360) % 360;
    return {
      ...planet,
      radius: orbit.radius,
      duration: orbit.duration,
      planetSize: orbit.planetSize,
      startAngle,
      key: `${oi}-${pi}`,
    };
  }),
);

type CSSVarStyle = CSSProperties & {
  '--start'?: string;
  '--radius'?: string;
  '--duration'?: string;
};

export function TechBubbles() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const update = () => {
      const w = wrapper.clientWidth;
      const scale = Math.min(1, w / NATURAL_SIZE);
      wrapper.style.setProperty('--solar-scale', String(scale));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      aria-label="Technologies I work with"
    >
      <div className={styles.solar}>
        {orbits.map((orbit, oi) => (
          <div
            key={`ring-${oi}`}
            className={styles.orbitRing}
            style={{
              width: orbit.radius * 2,
              height: orbit.radius * 2,
              marginTop: -orbit.radius,
              marginLeft: -orbit.radius,
            }}
            aria-hidden="true"
          />
        ))}

        <div className={styles.sun} aria-hidden="true" />

        {planetInstances.map((p) => {
          const style: CSSVarStyle = {
            '--start': `${p.startAngle}deg`,
            '--radius': `${p.radius}px`,
            '--duration': `${p.duration}s`,
            width: p.planetSize,
            height: p.planetSize,
            marginTop: -p.planetSize / 2,
            marginLeft: -p.planetSize / 2,
          };
          const bubbleClass = p.featured
            ? `${styles.bubble} ${styles.featured}`
            : styles.bubble;
          return (
            <div
              key={p.key}
              className={styles.planet}
              style={style}
              title={p.name}
              data-cursor-interactive="true"
            >
              <div className={bubbleClass}>
                <img
                  src={p.src}
                  alt=""
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <span className={styles.label}>{p.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
