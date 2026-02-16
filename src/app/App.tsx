import { useState } from 'react';
import { DialNavigation } from './components/DialNavigation';
import { ProjectContent } from './components/ProjectContent';

export interface ControlState {
  architectureEmphasis: number; // 0-100
  productDesignEmphasis: number; // 0-100
  softwareEmphasis: number; // 0-100
  viewMode: 'hero' | 'breakdown'; // Toggle switch 1
  showMetadata: boolean; // Toggle switch 2
  detailDepth: number; // 0-100 (slider 1)
  timelineProgress: number; // 0-100 (slider 2)
}

// Mock project data
const projects = [
  {
    id: 0,
    title: 'About Me',
    type: 'about',
    overview: 'Welcome to my portfolio. I work at the intersection of architecture, product design, and software engineering, creating holistic solutions that bridge physical and digital experiences.',
    architecture: 'Architectural thinking and spatial design',
    productDesign: 'User experience and interface design',
    software: 'Full-stack development and system architecture',
    hasTimeline: false,
  },
  {
    id: 1,
    title: 'Project 1',
    type: 'project',
    position: 'Urban Innovation Lab',
    overview: 'This project explores the relationship between architectural space and digital interaction, creating a seamless experiential flow that bridges the physical and virtual.',
    architecture: 'Spatial design and environmental innovation',
    productDesign: 'User-centered interfaces with adaptive design systems',
    software: 'Full-stack development with real-time data integration',
    metadata: {
      date: '2024-2025',
      collaborators: 'Studio XYZ, Tech Labs',
      tools: 'Rhino, Figma, React, Node.js',
      duration: '8 months'
    },
    hasTimeline: true,
  },
  {
    id: 2,
    title: 'Project 2',
    type: 'project',
    position: 'Smart Living Ecosystem',
    overview: 'This project explores the relationship between architectural space and digital interaction, creating a seamless experiential flow that bridges the physical and virtual.',
    architecture: 'Spatial design and environmental innovation',
    productDesign: 'User-centered interfaces with adaptive design systems',
    software: 'Full-stack development with real-time data integration',
    metadata: {
      date: '2024',
      collaborators: 'Design Collective',
      tools: 'AutoCAD, Sketch, Python',
      duration: '6 months'
    },
    hasTimeline: true,
  },
  {
    id: 3,
    title: 'Project 3',
    type: 'project',
    position: 'Sustainable Design Framework',
    overview: 'This project explores innovative design solutions at the intersection of form and function, leveraging cutting-edge technology for sustainable outcomes.',
    architecture: 'Modular construction with biophilic elements',
    productDesign: 'Ergonomic interfaces with haptic feedback',
    software: 'Cloud-based platforms with AI integration',
    metadata: {
      date: '2023-2024',
      collaborators: 'Green Build Initiative',
      tools: 'Revit, Adobe XD, TensorFlow',
      duration: '12 months'
    },
    hasTimeline: true,
  },
  {
    id: 4,
    title: 'Project 4',
    type: 'project',
    position: 'Adaptive Environments',
    overview: 'A multidisciplinary approach to creating adaptive environments that respond to user behavior and environmental conditions in real-time.',
    architecture: 'Dynamic facades and responsive structures',
    productDesign: 'Context-aware product ecosystems',
    software: 'IoT infrastructure with machine learning',
    metadata: {
      date: '2023',
      collaborators: 'Smart City Lab',
      tools: 'Grasshopper, Framer, Arduino',
      duration: '10 months'
    },
    hasTimeline: true,
  },
  {
    id: 5,
    title: 'Project 5',
    type: 'project',
    position: 'Digital Fabrication Studio',
    overview: 'Exploring new paradigms in digital fabrication and parametric design to create customizable, user-centric experiences.',
    architecture: 'Computational design with 3D printing',
    productDesign: 'Mass customization frameworks',
    software: 'Generative design algorithms',
    metadata: {
      date: '2022-2023',
      collaborators: 'Fab Lab Network',
      tools: 'Rhino, Blender, Processing',
      duration: '9 months'
    },
    hasTimeline: false,
  },
  {
    id: 6,
    title: 'Project 6',
    type: 'project',
    position: 'Heritage + Technology',
    overview: 'A synthesis of traditional craftsmanship and modern technology, creating timeless designs with contemporary functionality.',
    architecture: 'Heritage restoration with smart systems',
    productDesign: 'Artisanal products with embedded tech',
    software: 'Legacy system modernization',
    metadata: {
      date: '2022',
      collaborators: 'Heritage Foundation',
      tools: 'SketchUp, Illustrator, Vue.js',
      duration: '7 months'
    },
    hasTimeline: true,
  },
];

export default function App() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [controls, setControls] = useState<ControlState>({
    architectureEmphasis: 33.33,
    productDesignEmphasis: 33.33,
    softwareEmphasis: 33.33,
    viewMode: 'hero',
    showMetadata: false,
    detailDepth: 100,
    timelineProgress: 100,
  });

  const updateControl = (key: keyof ControlState, value: any) => {
    setControls(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-50 flex">
      {/* Left 1/3 - DJ Control Board */}
      <div className="w-1/3 relative bg-gradient-to-br from-gray-100 to-gray-200 border-r border-gray-300">
        <DialNavigation
          projects={projects}
          activeIndex={activeProjectIndex}
          onProjectChange={setActiveProjectIndex}
          controls={controls}
          onControlChange={updateControl}
        />
      </div>

      {/* Right 2/3 - Project Content */}
      <div className="w-2/3 overflow-auto">
        <ProjectContent 
          project={projects[activeProjectIndex]} 
          controls={controls}
        />
      </div>
    </div>
  );
}