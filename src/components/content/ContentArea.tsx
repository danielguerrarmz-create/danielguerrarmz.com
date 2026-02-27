import type { Project, AboutData, ViewControls, DetailLevel } from '@/types';
import { AboutPage } from './AboutPage';
import { ProjectPage } from './ProjectPage';

export interface ContentAreaProps {
  project: Project;
  aboutData: AboutData;
  viewControls: ViewControls;
  askResponse: string | null;
}

export function ContentArea({
  project,
  aboutData,
  viewControls,
  askResponse,
}: ContentAreaProps) {
  const detailLevel: DetailLevel =
    viewControls.detailDepth < 33
      ? 'minimal'
      : viewControls.detailDepth < 66
        ? 'balanced'
        : 'full';

  const isAbout = project.slug === 'about-me';

  return (
    <div className="h-screen overflow-y-auto">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {askResponse && (
          <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded font-mono text-sm text-gray-700">
            {askResponse}
          </div>
        )}

        {isAbout ? (
          <AboutPage data={aboutData} detailLevel={detailLevel} />
        ) : (
          <ProjectPage
            project={project}
            heroEnabled={viewControls.heroEnabled}
            metadataEnabled={viewControls.metadataEnabled}
            detailLevel={detailLevel}
          />
        )}
      </div>
    </div>
  );
}
