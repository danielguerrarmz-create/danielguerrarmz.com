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
      'Project 3 was the most technically complex — a full-stack platform involving real-time data processing, ML inference, and a custom visual programming language.',
    action: 'navigate',
    payload: { projectId: 3 },
  },
  {
    keywords: ['favorite', 'best', 'proud', 'proudest'],
    response:
      'I am most proud of the Urban Innovation Lab — it brought together everything I care about: responsive architecture, physical computing, and real-time software, at city scale.',
    action: 'navigate',
    payload: { projectId: 1 },
  },
  {
    keywords: [],
    response:
      'I am not sure how to answer that. Try asking about my tools, architecture work, product design, software skills, education, or contact info.',
  },
];
