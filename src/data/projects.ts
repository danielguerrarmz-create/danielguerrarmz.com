import type { Project } from '@/types';

export const projects: Project[] = [
  // ═══════════════════════════════════════════
  // INDEX 0: ABOUT ME (always first in slot)
  // ═══════════════════════════════════════════
  {
    id: 0,
    slug: 'about-me',
    title: 'About Me',
    disciplines: { arch: 33, prod: 33, sw: 34 },
    metadata: {
      date: '2021–2025',
      client: '',
      collaborators: [],
      category: 'Personal',
      tools: [],
      duration: '',
    },
    content: {
      summary: 'Architect, product designer, and software engineer.',
      description: "I'm Daniel. UTSoA student, living at the intersection of architecture, product design, and software engineering — designing systems that bridge physical space and digital interaction (learning hardware next).",
      disciplines: {
        architecture: 'Parametric design, spatial programming, computational modeling, environmental response systems',
        productDesign: 'User experience design, interface design, industrial design, interaction paradigms',
        software: 'Full-stack development, real-time systems, embedded software, data visualization',
      },
    },
    assets: {
      hero: '/assets/projects/about/hero.jpg',
      gallery: [],
      galleryLayout: 'grid',
    },
  },

  // ═══════════════════════════════════════════
  // INDEX 1: SYNERGY WITH THE COSMOS
  // ═══════════════════════════════════════════
  {
    id: 1,
    slug: 'synergy-with-the-cosmos',
    title: 'Synergy with the Cosmos',
    disciplines: { arch: 75, prod: 10, sw: 15 },
    metadata: {
      date: 'Fall 2023',
      client: 'Academic',
      collaborators: ['Clay Seifert'],
      professor: 'Assistant Professor Daniel Koehler',
      category: 'Zero-Mile Architecture',
      tools: ['Rhino', 'Grasshopper', 'Wasp', 'Python', 'Physical Testing Lab'],
      duration: '4 months',
      awards: ['Fall 2023 Design Excellence Nominee'],
      course: 'Design V',
    },
    content: {
      summary: 'Zero-mile urban infill integrating on-site material cultivation with biogenic composite research.',
      description: 'This project proposes zero-mile architecture: on-site cultivation of bamboo and hemp to create Plentify, a biogenic composite material and construction technique. Through systematic compression testing, Plentify demonstrated 30% enhanced strength over traditional hempcrete, with optimal performance at 10% bamboo fiber inclusion. The architectural design explores farming using modular planters that transition into structural walls and circulation systems: living architecture symbiotic with its surroundings.',
      disciplines: {
        architecture: 'Parametric spatial aggregations using Wasp, modular planter-to-structure systems, zero-mile material sourcing, case study in Coyoacan Mexico City informal settlements',
        productDesign: 'Planter Cell system design — Wall Cells, Storage Cells, Vertical Circulation Cells — as human-scaled 6\'x6\'x8\' building units',
        software: 'Hierarchical aggregation algorithm (under 15 parts per unit), digital scripting for spatial module generation, Wasp plugin integration',
      },
      process: 'Workflow began with Plentify-compatible module development integrating bamboo culms and Plentify infill. Initial Wasp aggregations proved spatially incoherent. Enhanced script introduced human-scaled spatial modules using corner units as anchors. Process prioritized exterior wall placement before central areas. Final iteration employed a hierarchical algorithm at microscale combining various modules for programmatically viable spaces.',
      technicalDetails: 'Plentify composite: hemp hurd + Moso bamboo fibers + hydrated lime + hydraulic lime + pozzolan in 1:1.5:2 base ratio. Compression testing per ASTM C109 protocols. Four sample groups (0%, 5%, 10%, 25% bamboo fiber). MTS Insight system, 100 kN capacity, 0.2-0.3 MPa/s loading rate. Optimal A10 sample: compressive strength 3.19 MPa (+30.2%), modulus of elasticity 421 MPa (+89.6%), energy absorption +48.7%, ductility +50.6%.',
    },
    assets: {
      hero: '/assets/projects/01-synergy/hero.jpg',
      galleryLayout: 'grid',
      gallery: [
        { src: '/assets/projects/01-synergy/01-conceptual-perspective.jpg', title: 'Conceptual perspective' },
        { src: '/assets/projects/01-synergy/02-site-preparation.jpg', title: 'Site preparation' },
        { src: '/assets/projects/01-synergy/03-active-cultivation.jpg', title: 'Active cultivation' },
        { src: '/assets/projects/01-synergy/04-first-harvest.jpg', title: 'First harvest' },
        { src: '/assets/projects/01-synergy/05-expansion-phase.jpg', title: 'Expansion phase' },
        { src: '/assets/projects/01-synergy/06-axonometric-aggregations.jpg', title: 'Axonometric aggregations' },
        { src: '/assets/projects/01-synergy/07-modular-spatial-modules.jpg', title: 'Modular spatial modules' },
        { src: '/assets/projects/01-synergy/08-planter-cell-types.jpg', title: 'Planter cell types' },
        { src: '/assets/projects/01-synergy/09-wall-cell-schematics.jpg', title: 'Wall cell schematics' },
        { src: '/assets/projects/01-synergy/10-plentify-construction-steps.jpg', title: 'Plentify construction steps' },
        { src: '/assets/projects/01-synergy/11-brick-samples.jpg', title: 'Brick samples' },
        { src: '/assets/projects/01-synergy/12-compression-testing.jpg', title: 'Compression testing' },
        { src: '/assets/projects/01-synergy/13-test-results-charts.jpg', title: 'Test results charts' },
        { src: '/assets/projects/01-synergy/14-coyoacan-site.jpg', title: 'Coyoacan site' },
        { src: '/assets/projects/01-synergy/15-rods-of-hope.jpg', title: 'Rods of hope' },
        { src: '/assets/projects/01-synergy/16-transformed-block.jpg', title: 'Transformed block' },
        { src: '/assets/projects/01-synergy/17-living-walls.jpg', title: 'Living walls' },
        { src: '/assets/projects/01-synergy/18-city-in-a-block.jpg', title: 'City in a block' },
      ],
    },
  },

  // ═══════════════════════════════════════════
  // INDEX 2: PRESSURE ULCER MEDICAL DEVICE
  // ═══════════════════════════════════════════
  {
    id: 2,
    slug: 'pressure-ulcer-medical-device',
    title: 'Pressure Ulcer Medical Device',
    disciplines: { arch: 5, prod: 85, sw: 10 },
    metadata: {
      date: '2023–2024',
      client: 'Moi University, Eldoret, Kenya',
      collaborators: ['Meron Terafi', 'Mackenzie Noell', 'Lauren Guerra-Flores'],
      professor: 'Dr. Julie Zuniga & Dr. Janet Ellzey',
      category: 'Medical Product Design',
      tools: ['Cardboard prototyping', 'Visual communication design', 'Clinical protocols'],
      duration: '6 months',
      awards: ["President's Award for Global Learning"],
      course: 'Wound Care in Kenya',
    },
    content: {
      summary: 'Vernacular medical design integrating household materials with universal visual communication for pressure ulcer prevention.',
      description: 'Pressure ulcers affect millions of immobilized patients globally, yet specialized medical positioning equipment remains inaccessible in home care and resource-limited settings. This project reimagines pressure ulcer prevention through vernacular design: a cardboard wedge and universal visual instructions. The solution uses materials found in any household — a cardboard box, scissors, ruler, and shirt for padding — elevating vulnerable body parts to prevent sustained pressure that leads to tissue breakdown.',
      disciplines: {
        architecture: 'Spatial thinking applied to body positioning and support geometry',
        productDesign: 'Vernacular material selection, universal visual instruction system transcending language and literacy barriers, iconographic communication, step-by-step assembly diagrams, 2-hour rotation cycle protocols',
        software: 'Documentation and distribution system design for cascading training model',
      },
      process: 'Developed through collaboration with Moi University in Eldoret, Kenya. Nurses identified wound care as urgent: pressure ulcers occur in 17% of hospitalized patients. Solution employs cascading training: Moi University nurses teach regional hospital staff, who present at seminars to county hospitals, who distribute instructions to discharged patients.',
      technicalDetails: 'Prototype uses second-life cardboard boxes before recycling. Visual instruction system uses dimensional labeling for precision. Integrated clinical protocols guide 2-hour rotation cycles and multiple positioning configurations. Design remains open to modification based on local needs.',
    },
    assets: {
      hero: '/assets/projects/02-pressure-ulcer/hero.jpg',
      galleryLayout: 'grid',
      gallery: [
        { src: '/assets/projects/02-pressure-ulcer/01-brochure-cover.jpg', title: 'Brochure cover' },
        { src: '/assets/projects/02-pressure-ulcer/02-staged-prototype.jpg', title: 'Staged prototype' },
        { src: '/assets/projects/02-pressure-ulcer/03-assembly-instructions.jpg', title: 'Assembly instructions' },
        { src: '/assets/projects/02-pressure-ulcer/04-standalone-wedge.jpg', title: 'Standalone wedge' },
        { src: '/assets/projects/02-pressure-ulcer/05-materials-diagram.jpg', title: 'Materials diagram' },
      ],
    },
  },

  // ═══════════════════════════════════════════
  // INDEX 3: HYDRAULIC COMMONS
  // ═══════════════════════════════════════════
  {
    id: 3,
    slug: 'hydraulic-commons',
    title: 'Hydraulic Commons: Water Infrastructure',
    slotLabel: 'Hydraulic Commons',
    disciplines: { arch: 70, prod: 15, sw: 15 },
    metadata: {
      date: 'Fall 2024',
      client: 'Academic / Competition',
      collaborators: [],
      professor: 'Lecturer Rasa Navasaityte',
      category: 'Infrastructural Architecture',
      tools: ['Rhino', 'Grasshopper', 'Midjourney', 'Photoshop', 'Illustrator'],
      duration: '4 months',
      awards: ['Fall 2024 Design Excellence Nominee', 'Lisbon Triennale Millennium Competition'],
      course: 'Advanced Studio',
    },
    content: {
      summary: 'Integrated water treatment and aquaponics facility positioning essential infrastructure as productive community commons through circular resource systems.',
      description: "A water-driven architecture along Austin's Colorado River where infrastructure shapes architectural form. The project challenges conventional approaches by integrating water treatment and food production into experiential spaces that serve surrounding suburban neighborhoods. Water flow carves through the structure, creating interconnected environments that serve ecological and community functions while providing sustainable resources. The building emerges from the riverbank as a natural extension of the landscape, where treatment processes become visible features and production spaces double as public areas for learning and gathering.",
      disciplines: {
        architecture: 'River-integrated structural design, landscape-emergent form, circular water treatment spatial programming, community-scale food production architecture',
        productDesign: 'Public pool and recreational water feature design, market/food service spatial layout, community gathering space programming',
        software: 'Production capacity analysis, programmatic flow diagrams, circular resource system modeling',
      },
      process: 'Began with programmatic analysis of community needs within a 0.75-mile food supply radius and 1.10-mile water supply radius. Developed circular logic diagrams connecting water treatment, aquaponics, vertical farming, and community program. Iterative design process explored river-integrated structural forms using AI-assisted design iteration.',
      technicalDetails: 'Program includes: Main Filtration Hall, Water Intake, Secondary/Tertiary Treatment Areas, Specialized Crop Zones, Vertical Farming, Main Gallery/Market, Research Lab, Library, Fish Rearing Pools, Public Pools, Shaded Outdoor Areas. Production: 500 gallons/hour water processing, fish produce, electricity via hydropower. Food supply sustains 0.75-mile radius, water supply serves 1.10-mile radius.',
    },
    assets: {
      hero: '/assets/projects/03-hydraulic-commons/hero.jpg',
      galleryLayout: 'feature',
      gallery: [
        { src: '/assets/projects/03-hydraulic-commons/01-scale-of-production.jpg', title: 'Scale of production' },
        { src: '/assets/projects/03-hydraulic-commons/02-programmatic-collage.jpg', title: 'Programmatic collage' },
        { src: '/assets/projects/03-hydraulic-commons/03-river-perspective.jpg', title: 'River perspective' },
        { src: '/assets/projects/03-hydraulic-commons/04-outdoor-perspective.jpg', title: 'Outdoor perspective' },
        { src: '/assets/projects/03-hydraulic-commons/05-community-pools.jpg', title: 'Community pools' },
        { src: '/assets/projects/03-hydraulic-commons/06-iterations-database.jpg', title: 'Iterations database' },
        { src: '/assets/projects/03-hydraulic-commons/07-circular-logic-diagram.jpg', title: 'Circular logic diagram' },
        { src: '/assets/projects/03-hydraulic-commons/08-ground-floor-plan.jpg', title: 'Ground floor plan' },
      ],
    },
  },

  // ═══════════════════════════════════════════
  // INDEX 4: SEARCH BY ASSEMBLY
  // ═══════════════════════════════════════════
  {
    id: 4,
    slug: 'search-by-assembly',
    title: 'Search by Assembly: Node-Based Precedent Engine',
    slotLabel: 'Search by Assembly',
    disciplines: { arch: 20, prod: 25, sw: 55 },
    metadata: {
      date: '2024–2025',
      client: 'Independent Research',
      collaborators: ['Clay Seifert', 'Armaan Kazi', 'Patrick Danahy'],
      category: 'Research Software',
      tools: ['Python', 'DINOv2', 'FAISS', 'React', 'TypeScript', 'LLM embeddings'],
      duration: '8+ months',
      awards: ['CAADRIA 2025 Accepted', 'ACM DIS 2025 Working Submission'],
      course: 'Independent Research',
    },
    content: {
      summary: 'Multi-modal precedent search platform making architectural relationships discoverable through designer-steerable fusion of visual embeddings, spatial descriptors, and contextual attributes.',
      description: 'Architectural precedent search typically optimizes for "best match," but design thinking operates through relational networks and iterative exploration. Search by Assembly reframes retrieval as interactive evidence composition: users assemble queries from reference images, plan sketches, and attribute chips. Each component contributes an evidence stream — visual embeddings, plan-derived spatial descriptors, structured metadata — fused through designer-controlled weighting. Patch-aware activation maps reveal which motifs drive similarity, making AI reasoning visible, steerable, and reversible.',
      disciplines: {
        architecture: 'Architectural precedent analysis, plan-derived spatial descriptors, typology/climate/massing classification across 1,497+ ArchDaily projects',
        productDesign: 'Node-based visual workflow canvas, tri-slider fusion control, patch-aware explanation UI, latent map navigation for exploratory search',
        software: 'DINOv2 global and patch embeddings, FAISS real-time retrieval (5-6ms latency), three parallel encoding streams (visual, spatial, contextual), LLM-generated semantic embeddings',
      },
      process: 'Developed a composable query model treating multi-evidence assembly as first-class interaction. Built node palette: IMAGE, TEXT, ATTRIBUTES, CONSTRAINTS, AND, OR, NOT, RESULTS. Designer-steerable fusion through real-time tri-slider control across visual, spatial, and contextual dimensions.',
      technicalDetails: 'Evaluation across 1,497+ ArchDaily images and 50 curated queries: nDCG@10 = 0.53, P@5 = 0.53, mAP@10 = 0.37. User study (n=12, students and practitioners) in progress. Node types: IMAGE (DINOv2 encoding), TEXT (LLM embeddings), ATTRIBUTES (fusion weight sliders), CONSTRAINTS (parametric filters — floor count, room count, corridor ratios), AND/OR/NOT (set operations), RESULTS (preview grid).',
    },
    assets: {
      hero: '/assets/projects/04-search-by-assembly/hero.jpg',
      galleryLayout: 'grid3',
      gallery: [
        { src: '/assets/projects/04-search-by-assembly/01-workflow-canvas.jpg', title: 'Workflow canvas' },
        { src: '/assets/projects/04-search-by-assembly/02-node-palette.jpg', title: 'Node palette' },
        { src: '/assets/projects/04-search-by-assembly/03-ranked-results.jpg', title: 'Ranked results' },
        { src: '/assets/projects/04-search-by-assembly/04-fusion-weights-ui.jpg', title: 'Fusion weights UI' },
        { src: '/assets/projects/04-search-by-assembly/05-and-combine.jpg', title: 'AND combine' },
        { src: '/assets/projects/04-search-by-assembly/06-not-exclude.jpg', title: 'NOT exclude' },
        { src: '/assets/projects/04-search-by-assembly/07-or-best-of-each.jpg', title: 'OR best of each' },
        { src: '/assets/projects/04-search-by-assembly/08-constraints-ui.jpg', title: 'Constraints UI' },
      ],
    },
  },

  // ═══════════════════════════════════════════
  // INDEX 5: DOUGHERTY ARTS CENTER
  // ═══════════════════════════════════════════
  {
    id: 5,
    slug: 'dougherty-arts-center',
    title: 'Dougherty Arts Center Renovation',
    slotLabel: 'Dougherty Arts Center',
    disciplines: { arch: 80, prod: 10, sw: 10 },
    metadata: {
      date: 'Spring 2024',
      client: 'Academic',
      collaborators: ['Clay Seifert'],
      professor: 'Professor Michael Garrison',
      category: 'Adaptive Reuse',
      tools: ['Rhino', 'Revit', 'Physical Model', 'Enscape', 'Photoshop'],
      duration: '4 months',
      awards: ['Spring 2024 Design Excellence Nominee'],
      course: 'Comprehensive Studio',
    },
    content: {
      summary: 'Material-responsive adaptive reuse repositioning salvaged structure elements and 3D-printed catenary arches as thermal refuge and flexible programmatic infrastructure.',
      description: "Dougherty Art Center is an adaptive-reuse project that integrates with the surrounding landscape. The design draws inspiration from the former Dougherty Arts Center's form and incorporates recycled materials from the original structure. Given the site's location in a floodplain near a park, the ideal solution would be no building at all. However, the center was reconceived as a refuge from the intense Texas sun. The building features distinctive catenary curved entrances on three sides facing the park. The center underwent a significant programmatic transformation, converting traditional classrooms into flexible art studios where teachers operate from mobile offices, encouraging dynamic space utilization.",
      disciplines: {
        architecture: 'Adaptive reuse, catenary arch structural system, floodplain-responsive siting, passive solar design, salvaged material integration',
        productDesign: 'Flexible art studio programming, mobile office concept, courtyard as shaded gathering/performance space',
        software: 'Structural load distribution analysis, environmental simulation for solar shading',
      },
      process: 'Nine-phase design process from initial massing studies through structural resolution. Iterative exploration of catenary arch geometry, roof structure, and relationship to existing park landscape. Physical model construction validated proportions and material expression.',
      technicalDetails: 'Structural system: catenary arches on three park-facing facades. Roof: exposed timber truss system with clerestory lighting. Wall section: south-facing east wing with integrated shading. Load distribution through primary arch-to-foundation path with secondary truss system.',
    },
    assets: {
      hero: '/assets/projects/05-dougherty/hero.jpg',
      galleryLayout: 'grid',
      gallery: [
        { src: '/assets/projects/05-dougherty/01-design-process-diagrams.jpg', title: 'Design process diagrams' },
        { src: '/assets/projects/05-dougherty/02-site-plan.jpg', title: 'Site plan' },
        { src: '/assets/projects/05-dougherty/03-ground-floor-plan.jpg', title: 'Ground floor plan' },
        { src: '/assets/projects/05-dougherty/04-second-floor-plan.jpg', title: 'Second floor plan' },
        { src: '/assets/projects/05-dougherty/05-wall-section.jpg', title: 'Wall section' },
        { src: '/assets/projects/05-dougherty/06-building-details.jpg', title: 'Building details' },
        { src: '/assets/projects/05-dougherty/07-structural-diagram.jpg', title: 'Structural diagram' },
        { src: '/assets/projects/05-dougherty/08-load-distribution.jpg', title: 'Load distribution' },
        { src: '/assets/projects/05-dougherty/09-sw-facade-perspective.jpg', title: 'Southwest facade perspective' },
        { src: '/assets/projects/05-dougherty/10-north-facade-perspective.jpg', title: 'North facade perspective' },
        { src: '/assets/projects/05-dougherty/11-west-model-perspective.jpg', title: 'West model perspective' },
        { src: '/assets/projects/05-dougherty/12-roof-model-detail.jpg', title: 'Roof model detail' },
      ],
    },
  },
];
