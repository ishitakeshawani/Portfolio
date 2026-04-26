import { ArrowUpRightIcon } from '@/components/Icons';
import type { Blog } from '@/types';
import { handleSpotlight } from '@/utils/spotlight';
import styles from '@/components/Card/Card.module.css';

type BlogCardProps = {
  blog: Blog;
};

export function BlogCard({ blog }: BlogCardProps) {
  const { title, date, excerpt, url } = blog;

  return (
    <a
      className={styles.card}
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      onMouseMove={handleSpotlight}
    >
      <div className={styles.headerRow}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.date}>{date}</span>
      </div>
      <p className={styles.description}>{excerpt}</p>
      <div className={styles.linkRow}>
        <span className={`${styles.link} ${styles.secondary}`}>
          Read more <ArrowUpRightIcon size={14} />
        </span>
      </div>
    </a>
  );
}
