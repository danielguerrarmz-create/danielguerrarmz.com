import { motion } from 'motion/react';
import type { ControlState } from '../App';
import exampleImage from 'figma:asset/6dd37bc01a9108bbd6e216efedee3953c8760647.png';

interface Project {
  id: number;
  title: string;
  type?: string;
  position?: string;
  overview: string;
  architecture: string;
  productDesign: string;
  software: string;
  metadata?: {
    date: string;
    collaborators: string;
    tools: string;
    duration: string;
  };
  hasTimeline?: boolean;
}

interface ProjectContentProps {
  project: Project;
  controls: ControlState;
}

export function ProjectContent({ project, controls }: ProjectContentProps) {
  const isAboutPage = project.type === 'about';
  
  // Calculate column widths based on emphasis knobs
  const total = controls.architectureEmphasis + controls.productDesignEmphasis + controls.softwareEmphasis;
  const archWidth = (controls.architectureEmphasis / total) * 100;
  const prodWidth = (controls.productDesignEmphasis / total) * 100;
  const softWidth = (controls.softwareEmphasis / total) * 100;

  // Calculate opacities based on emphasis
  const archOpacity = 0.4 + (controls.architectureEmphasis / 100) * 0.6;
  const prodOpacity = 0.4 + (controls.productDesignEmphasis / 100) * 0.6;
  const softOpacity = 0.4 + (controls.softwareEmphasis / 100) * 0.6;

  // Determine what content to show based on detail depth
  const showOverview = controls.detailDepth >= 20;
  const showColumns = controls.detailDepth >= 40;
  const showProcessImages = controls.detailDepth >= 60;
  const showSpecs = controls.detailDepth >= 80;

  // Timeline stage labels
  const getTimelineStage = () => {
    const progress = controls.timelineProgress;
    if (progress < 20) return 'CONCEPT';
    if (progress < 40) return 'DEVELOPMENT';
    if (progress < 60) return 'REFINEMENT';
    if (progress < 80) return 'BUILD';
    return 'FINAL';
  };

  const isHeroMode = controls.viewMode === 'hero';
  
  return (
    <motion.div
      key={project.id}
      className="min-h-full p-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Position header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {!isAboutPage && project.position && (
          <div className="mb-12">
            <h1 className="text-red-600 text-xl">{project.position}</h1>
          </div>
        )}
        
        {isAboutPage && (
          <div className="mb-12">
            <h1 className="text-red-600 text-xl">{project.title}</h1>
          </div>
        )}
      </motion.div>

      {/* Metadata overlay */}
      {controls.showMetadata && project.metadata && (
        <motion.div
          className="fixed top-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xs font-mono space-y-2">
            <div><span className="text-gray-500">DATE:</span> <span className="text-gray-900">{project.metadata.date}</span></div>
            <div><span className="text-gray-500">TEAM:</span> <span className="text-gray-900">{project.metadata.collaborators}</span></div>
            <div><span className="text-gray-500">TOOLS:</span> <span className="text-gray-900">{project.metadata.tools}</span></div>
            <div><span className="text-gray-500">DURATION:</span> <span className="text-gray-900">{project.metadata.duration}</span></div>
          </div>
        </motion.div>
      )}

      {/* Timeline stage indicator */}
      {project.hasTimeline && controls.timelineProgress !== 100 && (
        <motion.div
          className="mb-4 inline-block bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-mono"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          STAGE: {getTimelineStage()}
        </motion.div>
      )}

      {/* Project image - responsive to view mode */}
      {!isAboutPage && (
        <motion.div
          className="mb-16 bg-gray-100 rounded-lg overflow-hidden shadow-sm"
          animate={{
            height: isHeroMode ? 'auto' : '200px',
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          <div className={`${isHeroMode ? 'aspect-[16/9]' : 'h-full'} flex items-center justify-center relative`}>
            <motion.img 
              src={exampleImage} 
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{
                filter: project.hasTimeline 
                  ? `grayscale(${(100 - controls.timelineProgress) / 100}) brightness(${0.8 + (controls.timelineProgress / 100) * 0.2})`
                  : 'none',
              }}
              transition={{ duration: 0.35 }}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-10 transition-all">
              <span className="text-gray-400 text-sm opacity-0 hover:opacity-100 transition-opacity">
                {project.title}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Project Overview section */}
      <motion.div
        className="mb-12"
        animate={{ opacity: showOverview ? 1 : 0.3 }}
        transition={{ duration: 0.35 }}
      >
        <h2 className="text-red-600 text-lg mb-4">{isAboutPage ? 'Introduction' : 'Project Overview'}</h2>
        {showOverview && (
          <motion.p
            className="text-gray-700 mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {project.overview}
          </motion.p>
        )}

        {/* Three columns - responsive to knob adjustments */}
        <motion.div
          className="flex gap-8"
          animate={{ opacity: showColumns ? 1 : 0.2 }}
          transition={{ duration: 0.35 }}
        >
          {/* Architecture */}
          <motion.div
            animate={{
              width: `${archWidth}%`,
              opacity: showColumns ? archOpacity : 0.2,
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <h3 className="text-red-600 text-sm mb-3">Architecture</h3>
            {showColumns && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {project.architecture}
              </p>
            )}
          </motion.div>

          {/* Product Design */}
          <motion.div
            animate={{
              width: `${prodWidth}%`,
              opacity: showColumns ? prodOpacity : 0.2,
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <h3 className="text-red-600 text-sm mb-3">Product Design</h3>
            {showColumns && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {project.productDesign}
              </p>
            )}
          </motion.div>

          {/* Software */}
          <motion.div
            animate={{
              width: `${softWidth}%`,
              opacity: showColumns ? softOpacity : 0.2,
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <h3 className="text-red-600 text-sm mb-3">Software</h3>
            {showColumns && (
              <p className="text-gray-600 text-sm leading-relaxed">
                {project.software}
              </p>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Process Images - shown when detail depth is high */}
      {showProcessImages && !isAboutPage && (
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-red-600 text-sm mb-4">Process Documentation</h3>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-lg" />
            ))}
          </div>
        </motion.div>
      )}

      {/* Technical Specifications - shown when detail depth is very high */}
      {showSpecs && !isAboutPage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="text-red-600 text-sm mb-4">Technical Specifications</h3>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500 mb-1">Materials</p>
              <p className="text-gray-700">Steel, Glass, Concrete, Digital Interfaces</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Dimensions</p>
              <p className="text-gray-700">Variable, Context-Dependent</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Technologies</p>
              <p className="text-gray-700">IoT Sensors, ML Algorithms, Cloud Infrastructure</p>
            </div>
            <div>
              <p className="text-gray-500 mb-1">Sustainability</p>
              <p className="text-gray-700">LEED Platinum, Net-Zero Energy</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}