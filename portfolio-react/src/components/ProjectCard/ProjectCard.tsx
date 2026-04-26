import { ExternalLinkIcon, GithubIcon } from '@/components/Icons';
import type { Project } from '@/types';
import { handleSpotlight } from '@/utils/spotlight';
import styles from '@/components/Card/Card.module.css';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, date, techStack, description, liveUrl, sourceUrl } = project;
  const techList = techStack.split(',').map((t) => t.trim());

  return (
    <article className={styles.card} onMouseMove={handleSpotlight}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.date}>{date}</span>
      </div>
      <div className={styles.tech}>
        {techList.map((tech) => (
          <span key={tech} className={styles.techItem}>
            {tech}
          </span>
        ))}
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.linkRow}>
        {liveUrl ? (
          <a
            className={`${styles.link} ${styles.primary}`}
            href={liveUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Live <ExternalLinkIcon size={14} />
          </a>
        ) : null}
        {sourceUrl ? (
          <a
            className={`${styles.link} ${styles.secondary}`}
            href={sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubIcon size={14} /> Source
          </a>
        ) : null}
      </div>
    </article>
  );
}
