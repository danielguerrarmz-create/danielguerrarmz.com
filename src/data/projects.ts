import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 0,
    slug: 'about-me',
    title: 'About Me',
    disciplines: { arch: 33, prod: 33, sw: 34 },
    metadata: {
      date: '',
      client: '',
      collaborators: [],
      category: 'Personal',
      tools: [],
      duration: '',
    },
    content: {
      summary: 'Architect, product designer, and software engineer.',
      description:
        'I work at the intersection of architecture, product design, and software engineering, creating holistic solutions that bridge physical and digital experiences.',
      disciplines: {
        architecture: 'Architectural thinking and spatial design',
        productDesign: 'User experience and interface design',
        software: 'Full-stack development and system architecture',
      },
    },
    assets: {
      hero: '/assets/projects/about/hero.jpg',
      gallery: [],
    },
  },
  {
    id: 1,
    slug: 'urban-innovation-lab',
    title: 'Urban Innovation Lab',
    disciplines: { arch: 70, prod: 15, sw: 15 },
    metadata: {
      date: '2024',
      client: 'City of [City]',
      collaborators: ['Studio A', 'Dev Team B'],
      professor: 'Prof. [Name]',
      category: 'Installation',
      tools: ['Rhino', 'Grasshopper', 'React', 'Arduino'],
      duration: '8 months',
    },
    content: {
      summary:
        'A responsive urban installation that merges physical architecture with real-time data visualization.',
      description:
        'This project explores the relationship between architectural space and digital interaction, creating a seamless experiential flow that bridges the physical and virtual. The installation responds to environmental data and visitor movement to create a dynamic spatial experience.',
      disciplines: {
        architecture:
          'Parametric facade design, spatial programming, environmental response systems',
        productDesign:
          'Visitor interaction model, wayfinding system, physical interface design',
        software:
          'Real-time sensor integration, data visualization pipeline, responsive control system',
      },
      process:
        'The project began with site analysis and environmental data collection. Parametric models in Grasshopper generated facade variations responsive to solar and wind data. Prototyping with Arduino sensors established the interaction model. The final installation was fabricated using CNC-milled plywood panels with integrated LED arrays controlled by a React-based dashboard.',
      technicalDetails:
        'Stack: Grasshopper + Python for generative design, Arduino Mega for sensor array (12 PIR sensors, 4 environmental sensors), Node.js backend for data aggregation, React + D3.js for real-time visualization dashboard. Total sensor data throughput: ~500 readings/second.',
    },
    assets: {
      hero: '/assets/projects/project-1/hero.jpg',
      gallery: [
        '/assets/projects/project-1/gallery/01-concept.jpg',
        '/assets/projects/project-1/gallery/02-develop.jpg',
        '/assets/projects/project-1/gallery/03-final.jpg',
      ],
    },
  },
  {
    id: 2,
    slug: 'smart-living-ecosystem',
    title: 'Smart Living Ecosystem',
    disciplines: { arch: 25, prod: 55, sw: 20 },
    metadata: {
      date: '2024',
      client: 'Design Collective',
      collaborators: ['Designer C'],
      category: 'Product System',
      tools: ['SolidWorks', 'Python', 'React Native'],
      duration: '6 months',
    },
    content: {
      summary:
        'A connected home product ecosystem that adapts to occupant behavior through embedded intelligence.',
      description:
        'Smart Living Ecosystem reimagines domestic objects as an interconnected system. Each product communicates with the others to create ambient intelligence — lighting responds to activity patterns, furniture suggests ergonomic adjustments, and spatial boundaries adapt to social context.',
      disciplines: {
        architecture:
          'Spatial behavior mapping, domestic circulation analysis, adaptive room programming',
        productDesign:
          'Industrial design of 5 connected objects, material selection, interaction paradigm',
        software:
          'Behavior prediction ML model, mesh networking protocol, companion app',
      },
      process:
        'Started with ethnographic research in 12 households. Behavioral patterns were mapped and clustered. Product forms evolved through 3 rounds of prototyping. The software layer was developed in parallel, with the ML model trained on anonymized usage data from the prototyping phase.',
      technicalDetails:
        'Products: smart lamp, adaptive shelf, context-aware speaker, modular partition, ambient display. Connectivity: Bluetooth mesh (Nordic nRF52840). ML: TensorFlow Lite on-device inference. App: React Native + TypeScript. Cloud: Firebase for OTA updates only — all intelligence runs locally.',
    },
    assets: {
      hero: '/assets/projects/project-2/hero.jpg',
      gallery: [
        '/assets/projects/project-2/gallery/01-concept.jpg',
        '/assets/projects/project-2/gallery/02-develop.jpg',
        '/assets/projects/project-2/gallery/03-final.jpg',
      ],
    },
  },
  {
    id: 3,
    slug: 'data-flow-platform',
    title: 'Data Flow Platform',
    disciplines: { arch: 10, prod: 20, sw: 70 },
    metadata: {
      date: '2023–2024',
      client: 'Green Build Initiative',
      collaborators: ['Platform Team', 'Data Science Lab'],
      category: 'Web App',
      tools: ['TypeScript', 'React', 'Node.js', 'TensorFlow', 'PostgreSQL'],
      duration: '12 months',
    },
    content: {
      summary:
        'A full-stack visual programming platform for real-time data pipelines with ML inference and custom node authoring.',
      description:
        'Data Flow Platform enables non-programmers to build and run data pipelines through a node-based canvas. The system handles real-time ingestion, transformation, and ML inference at scale. A custom visual language was designed for domain experts to extend the node library.',
      disciplines: {
        architecture:
          'Information architecture of pipeline graphs, workspace layout, spatial grouping of nodes',
        productDesign:
          'Node-based canvas UX, drag-and-drop authoring, live preview and debugging interfaces',
        software:
          'Real-time data processing engine, custom visual programming runtime, ML inference service, collaborative editing backend',
      },
      process:
        'Discovery with 8 power users identified pain points in existing ETL tools. We designed a node taxonomy and connection semantics. The runtime was built in TypeScript with a WebSocket sync layer. ML nodes wrap TensorFlow Lite and ONNX models. The custom node SDK allows teams to ship domain-specific blocks.',
      technicalDetails:
        'Frontend: React 18, React Flow–style canvas, Monaco for expression editing. Backend: Node.js, Bull queues, Redis for state. Database: PostgreSQL for pipelines and runs. ML: TensorFlow Lite in Node via tfjs-node. Throughput: 50k events/sec per pipeline. Custom nodes: npm-packaged SDK, sandboxed execution.',
    },
    assets: {
      hero: '/assets/projects/project-3/hero.jpg',
      gallery: [
        '/assets/projects/project-3/gallery/01-concept.jpg',
        '/assets/projects/project-3/gallery/02-develop.jpg',
        '/assets/projects/project-3/gallery/03-final.jpg',
      ],
    },
  },
  {
    id: 4,
    slug: 'adaptive-environments',
    title: 'Adaptive Environments',
    disciplines: { arch: 40, prod: 35, sw: 25 },
    metadata: {
      date: '2023',
      client: 'Smart City Lab',
      collaborators: ['Spatial Design Team', 'IoT Group'],
      category: 'Installation',
      tools: ['Grasshopper', 'Arduino', 'React', 'Raspberry Pi'],
      duration: '10 months',
    },
    content: {
      summary:
        'A multidisciplinary approach to creating adaptive environments that respond to user behavior and environmental conditions in real-time.',
      description:
        'Adaptive Environments combines dynamic facades, context-aware product ecosystems, and IoT infrastructure. Spaces reconfigure based on occupancy and sensor data; furniture and lighting adapt to activity. The project demonstrates a balanced integration of architecture, product, and software.',
      disciplines: {
        architecture:
          'Dynamic facades, responsive structures, spatial reconfiguration logic',
        productDesign:
          'Context-aware product ecosystems, physical controls, feedback interfaces',
        software:
          'IoT infrastructure, sensor aggregation, machine learning for behavior prediction',
      },
      process:
        'We prototyped a single room with motorized partitions and smart fixtures. Grasshopper drove facade variation; Arduino and Raspberry Pi handled sensors and actuation. A React dashboard allowed operators to tune thresholds and view live data.',
      technicalDetails:
        'Spatial: 4 motorized partitions, 12 ceiling fixtures. Hardware: Raspberry Pi 4 per zone, Arduino Mega for sensors (PIR, CO2, light). Software: Node.js aggregation, rule engine, React admin. ML: simple occupancy prediction (TensorFlow Lite) for proactive adjustment.',
    },
    assets: {
      hero: '/assets/projects/project-4/hero.jpg',
      gallery: [
        '/assets/projects/project-4/gallery/01-concept.jpg',
        '/assets/projects/project-4/gallery/02-develop.jpg',
        '/assets/projects/project-4/gallery/03-final.jpg',
      ],
    },
  },
  {
    id: 5,
    slug: 'digital-fabrication-studio',
    title: 'Digital Fabrication Studio',
    disciplines: { arch: 10, prod: 45, sw: 45 },
    metadata: {
      date: '2022–2023',
      client: 'Fab Lab Network',
      collaborators: ['Industrial Design Partner'],
      category: 'Product + Software',
      tools: ['Rhino', 'Blender', 'Processing', 'Node.js', 'CNC'],
      duration: '9 months',
    },
    content: {
      summary:
        'Exploring new paradigms in digital fabrication and parametric design to create customizable, user-centric product experiences.',
      description:
        'Digital Fabrication Studio is a product line plus configurator: users define parameters in a web app; the system generates toolpaths and supports CNC fabrication. The focus is product design and software — mass customization without heavy architectural form.',
      disciplines: {
        architecture:
          'Modular construction principles, assembly logic, spatial packaging',
        productDesign:
          'Mass customization frameworks, material selection, ergonomic variants',
        software:
          'Generative design algorithms, configurator UI, CAM pipeline integration',
      },
      process:
        'We defined a product family (shelving, desk accessories) with parameterized geometry in Rhino/Grasshopper. A Node.js service converted user choices to mesh and then to G-code. The configurator (React) guided users through options and showed real-time previews.',
      technicalDetails:
        'Configurator: React, Three.js for preview. Backend: Node.js, Grasshopper headless (via compute plugin) for geometry. CAM: custom post-processor to CNC formats. Products: 3 shelving units, 5 desk objects. Materials: plywood, acrylic; lead time 2–5 days.',
    },
    assets: {
      hero: '/assets/projects/project-5/hero.jpg',
      gallery: [
        '/assets/projects/project-5/gallery/01-concept.jpg',
        '/assets/projects/project-5/gallery/02-develop.jpg',
        '/assets/projects/project-5/gallery/03-final.jpg',
      ],
    },
  },
  {
    id: 6,
    slug: 'heritage-technology',
    title: 'Heritage + Technology',
    disciplines: { arch: 45, prod: 45, sw: 10 },
    metadata: {
      date: '2022',
      client: 'Heritage Foundation',
      collaborators: ['Conservation Studio', 'Craft Partners'],
      category: 'Installation',
      tools: ['SketchUp', 'Illustrator', 'Vue.js', 'Arduino'],
      duration: '7 months',
    },
    content: {
      summary:
        'A synthesis of traditional craftsmanship and modern technology, creating timeless designs with contemporary functionality.',
      description:
        'Heritage + Technology bridges historic building fabric with subtle digital layers. Physical restoration and artisanal product design lead; software provides wayfinding, lighting control, and archival access. Architecture and product design share equal weight.',
      disciplines: {
        architecture:
          'Heritage restoration, adaptive reuse, smart systems integration',
        productDesign:
          'Artisanal products with embedded tech, signage, physical interfaces',
        software:
          'Legacy system modernization, kiosk and wayfinding app, lighting control',
      },
      process:
        'Site documentation and conservation plan came first. We designed a family of products (signage, seating, displays) that referenced local craft. A lightweight Vue.js kiosk and Arduino-based lighting completed the layer of technology without dominating the space.',
      technicalDetails:
        'Architecture: 2 restored rooms, 1 new insertion. Products: 8 signage units, 4 seating elements, 2 display cases. Software: Vue.js kiosk (3 stations), Arduino Uno for lighting (DMX). Content: static CMS for archival images and text.',
    },
    assets: {
      hero: '/assets/projects/project-6/hero.jpg',
      gallery: [
        '/assets/projects/project-6/gallery/01-concept.jpg',
        '/assets/projects/project-6/gallery/02-develop.jpg',
        '/assets/projects/project-6/gallery/03-final.jpg',
      ],
    },
  },
];
