import { Link } from 'react-router-dom';
import { ArrowRightIcon, GithubIcon } from '@/components/Icons';
import { ProjectCard } from '@/components/ProjectCard';
import { BlogCard } from '@/components/BlogCard';
import { Reveal } from '@/components/Reveal';
import { TechBubbles } from '@/components/TechBubbles';
import { experience } from '@/data/experience';
import { projects } from '@/data/projects';
import { blogs } from '@/data/blogs';
import { handleSpotlight } from '@/utils/spotlight';
import styles from './Home.module.css';

const FEATURED_COUNT = 3;

export function Home() {
  const featuredProjects = projects.slice(0, FEATURED_COUNT);
  const featuredBlogs = blogs.slice(0, FEATURED_COUNT);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Currently @ ServiceNow
          </div>
          <h1 className={styles.title}>
            Hi, I'm <span className={styles.gradient}>Ishita</span>
          </h1>
          <p className={styles.role}>
            Software Engineer II · Full-stack developer
          </p>
          <p className={styles.intro}>
            I'm a software engineer at ServiceNow, building AI-powered
            experiences for IT asset management — autonomous agents, AI
            specialists, and LLM evaluation tooling. Previously at Housing.com
            and Turvo, I shipped full-stack features end-to-end with React,
            GraphQL, and Java.
          </p>
          <div className={styles.ctaRow}>
            <Link to="/projects" className={styles.btnPrimary}>
              View Projects
              <ArrowRightIcon size={16} />
            </Link>
            <a
              href="https://github.com/ishitakeshawani"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.btnSecondary}
            >
              <GithubIcon size={16} />
              GitHub
            </a>
          </div>
        </div>
        <div className={styles.heroArt}>
          <TechBubbles />
        </div>
      </section>

      <Reveal>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Experience</h2>
          </div>
          <div className={styles.timeline}>
            {experience.map((item) => (
              <div
                key={item.company}
                className={styles.timelineItem}
                onMouseMove={handleSpotlight}
              >
                <div className={styles.timelineMeta}>
                  <div className={styles.company}>{item.company}</div>
                  <div className={styles.period}>{item.period}</div>
                </div>
                <div className={styles.timelineBody}>
                  <div className={styles.role}>{item.role}</div>
                  <p className={styles.summary}>{item.summary}</p>
                  <div className={styles.stackRow}>
                    {item.techStack.map((tech) => (
                      <span key={tech} className={styles.stackItem}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <Link to="/projects" className={styles.sectionLink}>
              See all <ArrowRightIcon size={14} />
            </Link>
          </div>
          <div className={styles.featuredGrid}>
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Latest Writing</h2>
            <Link to="/blogs" className={styles.sectionLink}>
              See all <ArrowRightIcon size={14} />
            </Link>
          </div>
          <div className={styles.featuredGrid}>
            {featuredBlogs.map((blog) => (
              <BlogCard key={blog.url} blog={blog} />
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
