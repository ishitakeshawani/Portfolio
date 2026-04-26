import { PageHeader, Accent } from '@/components/Hero';
import { BlogCard } from '@/components/BlogCard';
import { Reveal } from '@/components/Reveal';
import { blogs } from '@/data/blogs';
import styles from '@/pages/Grid/Grid.module.css';

export function Blogs() {
  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Writing"
        title={
          <>
            Read my <Accent>blogs</Accent>
          </>
        }
        subtitle="Long-form posts on engineering, learning in public, and the journey so far."
      />
      <div className={styles.grid}>
        {blogs.map((blog, idx) => (
          <Reveal key={blog.url} delay={Math.min(idx * 60, 240)}>
            <BlogCard blog={blog} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
