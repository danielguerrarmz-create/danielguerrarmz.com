import type { KeywordMatch } from '@/types';

export const keywordDictionary: KeywordMatch[] = [
  {
    keywords: ['tools', 'software', 'stack', 'tech', 'technologies'],
    response:
      'I work with Rhino, Grasshopper, SolidWorks, React, TypeScript, Python, Node.js, Arduino, and various fabrication tools. My stack bridges physical and digital — from parametric modeling to full-stack development.',
  },
  {
    keywords: ['architecture', 'arch', 'building', 'spatial', 'space'],
    response:
      'My architecture work focuses on parametric design, spatial programming, and responsive environments. I use computational tools to create spaces that adapt to their occupants and context.',
    action: 'filter',
    payload: { arch: 80, prod: 10, sw: 10 },
  },
  {
    keywords: ['product', 'design', 'industrial', 'ux', 'ui', 'interface'],
    response:
      'My product design practice spans physical and digital — from industrial design and material selection to UX/UI and interaction paradigms. I design systems, not just objects.',
    action: 'filter',
    payload: { arch: 10, prod: 80, sw: 10 },
  },
  {
    keywords: ['software', 'code', 'programming', 'develop', 'engineer'],
    response:
      'I build full-stack applications, real-time systems, and embedded software. My engineering work is always in service of a spatial or product design goal — code as a material.',
    action: 'filter',
    payload: { arch: 10, prod: 10, sw: 80 },
  },
  {
    keywords: ['education', 'school', 'degree', 'university', 'study'],
    response:
      'I studied architecture and computer science, combining both disciplines throughout my academic work. My thesis explored computational approaches to adaptive spatial design.',
  },
  {
    keywords: ['experience', 'work', 'job', 'career', 'background'],
    response:
      'I have worked across architecture studios, product design firms, and software teams. This interdisciplinary experience is what drives my integrated approach to every project.',
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'available', 'freelance'],
    response:
      'You can reach me at daniel@example.com. I am currently open to opportunities at the intersection of architecture, product design, and software engineering.',
  },
  {
    keywords: ['most technical', 'complex', 'hardest', 'challenging'],
    response:
      'Search by Assembly was the most technically complex — multi-modal precedent search with DINOv2 embeddings, FAISS retrieval, and a node-based canvas with designer-steerable fusion.',
    action: 'navigate',
    payload: { projectId: 4 },
  },
  {
    keywords: ['favorite', 'best', 'proud', 'proudest'],
    response:
      'I am most proud of Synergy with the Cosmos — it brought together zero-mile architecture, biogenic materials research, and computational aggregation in one project.',
    action: 'navigate',
    payload: { projectId: 1 },
  },
  // Project 1: Synergy with the Cosmos
  {
    keywords: [
      'synergy', 'cosmos', 'bamboo', 'hemp', 'plentify', 'biogenic', 'zero-mile',
      'coyoacan', 'mexico city', 'wasp', 'grasshopper', 'aggregation', 'planter',
      'living walls', 'compression test', 'hempcrete', 'cultivation', 'harvest',
    ],
    response:
      'Synergy with the Cosmos is zero-mile urban infill with on-site bamboo and hemp cultivation and Plentify biogenic composite research. Want me to open that project?',
    action: 'navigate',
    payload: { projectId: 1 },
  },
  // Project 2: Pressure Ulcer Medical Device
  {
    keywords: [
      'pressure ulcer', 'wound', 'kenya', 'eldoret', 'moi university', 'medical',
      'wedge', 'cardboard', 'vernacular', 'nursing', 'bed sore', 'positioning',
      'global learning', 'clinical', 'patient care', 'resource-limited',
    ],
    response:
      'That’s the Pressure Ulcer Medical Device — vernacular design with cardboard wedges and visual instructions for wound care in Kenya. Want me to open it?',
    action: 'navigate',
    payload: { projectId: 2 },
  },
  // Project 3: Hydraulic Commons
  {
    keywords: [
      'hydraulic', 'commons', 'water', 'infrastructure', 'aquaponics', 'austin',
      'colorado river', 'filtration', 'treatment', 'triennale', 'lisbon',
      'riverbank', 'community', 'pool', 'vertical farming', 'fish',
    ],
    response:
      'Hydraulic Commons is water-driven architecture on the Colorado River — treatment, aquaponics, and community space. Want me to open it?',
    action: 'navigate',
    payload: { projectId: 3 },
  },
  // Project 4: Search by Assembly
  {
    keywords: [
      'search by assembly', 'precedent', 'archdaily', 'dino', 'faiss', 'embedding',
      'node', 'canvas', 'fusion', 'retrieval', 'caadria', 'acm dis', 'research',
      'multi-modal', 'visual search', 'sketch', 'llm', 'patch', 'activation',
    ],
    response:
      'Search by Assembly is my precedent search tool — node-based canvas, DINOv2/FAISS, designer-steerable fusion. Want me to open it?',
    action: 'navigate',
    payload: { projectId: 4 },
  },
  // Project 5: Dougherty Arts Center
  {
    keywords: [
      'dougherty', 'arts center', 'adaptive reuse', 'catenary', 'arch', 'floodplain',
      'austin', 'garrison', 'comprehensive studio', 'salvaged', 'refuge', 'park',
      'art studio', 'mobile office', 'timber', 'truss', 'facade',
    ],
    response:
      'Dougherty Arts Center is adaptive reuse with catenary arches and salvaged materials. Want me to open it?',
    action: 'navigate',
    payload: { projectId: 5 },
  },
  {
    keywords: [],
    response:
      'I am not sure how to answer that. Try asking about my tools, architecture work, product design, software skills, education, or contact info.',
  },
];
