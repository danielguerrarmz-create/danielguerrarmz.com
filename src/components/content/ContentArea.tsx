import type { Project, AboutData, ViewControls, DetailLevel } from '@/types';
import { HeroPage } from './HeroPage';
import { AboutPage } from './AboutPage';
import { ProjectPage } from './ProjectPage';

export interface ContentAreaProps {
  project: Project;
  activeProjectId: number | null;
  aboutData: AboutData;
  viewControls: ViewControls;
  projects: Project[];
  onOpenProject: (id: number) => void;
}

export function ContentArea({
  project,
  activeProjectId,
  aboutData,
  viewControls,
  projects,
  onOpenProject,
}: ContentAreaProps) {
  const detailLevel: DetailLevel =
    viewControls.detailDepth < 33
      ? 'minimal'
      : viewControls.detailDepth < 66
        ? 'balanced'
        : 'full';

  const isHero = activeProjectId === null;
  const isAbout = !isHero && project.slug === 'about-me';

  if (isHero) {
    return <HeroPage projects={projects} onOpen={onOpenProject} />;
  }

  return isAbout ? (
    <AboutPage data={aboutData} detailLevel={detailLevel} />
  ) : (
    <ProjectPage
      project={project}
      projects={projects}
      heroEnabled={viewControls.heroEnabled}
      metadataEnabled={viewControls.metadataEnabled}
      detailLevel={detailLevel}
    />
  );
}
