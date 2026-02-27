import type { Project, DetailLevel } from '@/types';
import { HeroSection } from './HeroSection';
import { MetadataPanel } from './MetadataPanel';
import { DisciplineColumns } from './DisciplineColumns';
import { ProcessSection } from './ProcessSection';
import { getPlaceholderImage } from '@/utils/placeholders';

export interface ProjectPageProps {
  project: Project;
  heroEnabled: boolean;
  metadataEnabled: boolean;
  detailLevel: DetailLevel;
}

export function ProjectPage({
  project,
  heroEnabled,
  metadataEnabled,
  detailLevel,
}: ProjectPageProps) {
  return (
    <>
      <h1 className="text-3xl font-bold text-red-600 mb-2">{project.title}</h1>
      <p className="text-gray-500 font-mono text-sm mb-8">
        {project.metadata.category} · {project.metadata.date}
      </p>

      {heroEnabled && (
        <HeroSection src={project.assets.hero} title={project.title} />
      )}
      {metadataEnabled && (
        <MetadataPanel metadata={project.metadata} />
      )}

      {(detailLevel === 'balanced' || detailLevel === 'full') && (
        <p className="text-gray-700 leading-relaxed mb-8">
          {project.content.description}
        </p>
      )}

      <DisciplineColumns disciplines={project.content.disciplines} />

      {detailLevel === 'full' && project.content.process && (
        <ProcessSection
          process={project.content.process}
          technicalDetails={project.content.technicalDetails}
        />
      )}

      {detailLevel === 'full' && project.assets.gallery.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-8">
          {project.assets.gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${project.title} gallery ${i + 1}`}
              className="w-full rounded"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget;
                target.src = getPlaceholderImage(
                  1200,
                  800,
                  `${project.title} ${i + 1}`
                );
                target.onerror = null;
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
