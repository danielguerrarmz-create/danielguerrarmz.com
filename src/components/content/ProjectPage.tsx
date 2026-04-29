import type { Project, DetailLevel } from '@/types';
import { HeroSection } from './HeroSection';
import { MetadataPanel } from './MetadataPanel';
import { ProcessSection } from './ProcessSection';

export interface ProjectPageProps {
  project: Project;
  projects: Project[];
  heroEnabled: boolean;
  metadataEnabled: boolean;
  detailLevel: DetailLevel;
}

export function ProjectPage({
  project,
  projects,
  heroEnabled,
  metadataEnabled,
  detailLevel,
}: ProjectPageProps) {
  const idx = projects.findIndex((p) => p.id === project.id);
  return (
    <article className="page page-project">
      <header className="proj-head">
        <div className="proj-eyebrow">
          PROJECT · {String(idx).padStart(2, '0')} / {String(projects.length - 1).padStart(2, '0')} · {project.metadata.category} · {project.metadata.date}
        </div>
        <h1 className="proj-title">{project.title}</h1>
        <p className="proj-tagline">{project.content.summary}</p>
      </header>

      {heroEnabled && (
        <HeroSection src={project.assets.hero} title={project.title} />
      )}
      {metadataEnabled && (
        <MetadataPanel metadata={project.metadata} disciplines={project.disciplines} />
      )}

      {(detailLevel === 'balanced' || detailLevel === 'full') && (
        <p className="proj-lede">{project.content.description}</p>
      )}

      {detailLevel === 'full' && project.content.process && (
        <ProcessSection
          process={project.content.process}
          technicalDetails={project.content.technicalDetails}
        />
      )}

      {detailLevel === 'full' && project.assets.gallery.length > 0 && (
        <section className="proj-section">
          <h2>Selected views</h2>
          <div className="gallery">
            {project.assets.gallery.slice(0, 4).map((item, i) => (
              <figure key={i}>
                <img src={item.src} alt={item.title} />
              </figure>
            ))}
          </div>
        </section>
      )}
      <footer className="page-footer"><span>{project.title.toUpperCase()}</span><span>—</span><span>{project.metadata.date}</span></footer>
    </article>
  );
}
