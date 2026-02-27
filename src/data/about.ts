import type { AboutData } from '@/types';

export const aboutData: AboutData = {
  name: 'Daniel',
  tagline: 'Architect, product designer, and software engineer.',
  bio: 'I work at the intersection of architecture, product design, and software engineering, creating holistic solutions that bridge physical and digital experiences. My practice spans parametric design, user-centered interfaces, and full-stack development.',
  skills: {
    architecture: [
      'Parametric design',
      'Spatial programming',
      'Environmental response systems',
      'Computational modeling',
    ],
    productDesign: [
      'User experience design',
      'Interface design',
      'Industrial design',
      'Interaction paradigms',
    ],
    software: [
      'Full-stack development',
      'Real-time systems',
      'Embedded software',
      'Data visualization',
    ],
  },
  education: [
    { institution: 'School of Architecture & CS', degree: 'Dual focus', year: '2020–2024' },
  ],
  contact: {
    email: 'daniel@example.com',
    linkedin: 'https://linkedin.com/in/example',
    portfolio: 'https://example.com',
    location: 'Your City',
  },
};
