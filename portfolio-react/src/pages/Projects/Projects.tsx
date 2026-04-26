import { PageHeader } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { Reveal } from '@/components/Reveal';
import { projects } from '@/data/projects';
import styles from '@/pages/Grid/Grid.module.css';

export function Projects() {
  return (
    <div className={styles.page}>
      <PageHeader
        eyebrow="Portfolio"
        title="Things I've built"
        subtitle="A collection of projects I've shipped while learning, exploring, and solving problems."
      />
      <div className={styles.grid}>
        {projects.map((project, idx) => (
          <Reveal key={project.title} delay={Math.min(idx * 60, 240)}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
