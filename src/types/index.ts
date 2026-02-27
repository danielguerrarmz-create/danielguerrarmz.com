// ─── Project Data ───

export interface ProjectDisciplines {
  arch: number;
  prod: number;
  sw: number;
}

export interface ProjectMetadata {
  date: string;
  client: string;
  collaborators: string[];
  professor?: string;
  category: string;
  tools: string[];
  duration: string;
}

export interface ProjectContent {
  summary: string;
  description: string;
  disciplines: {
    architecture: string;
    productDesign: string;
    software: string;
  };
  process?: string;
  technicalDetails?: string;
}

export interface ProjectAssets {
  hero: string;
  thumbnail?: string;
  gallery: string[];
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  disciplines: ProjectDisciplines;
  metadata: ProjectMetadata;
  content: ProjectContent;
  assets: ProjectAssets;
}

// ─── About Me Data ───

export interface AboutData {
  name: string;
  tagline: string;
  bio: string;
  skills: {
    architecture: string[];
    productDesign: string[];
    software: string[];
  };
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  contact: {
    email: string;
    linkedin?: string;
    portfolio?: string;
    location: string;
  };
}

// ─── Control State ───

export interface DisciplineMix {
  arch: number;
  prod: number;
  sw: number;
}

export interface ViewControls {
  heroEnabled: boolean;
  metadataEnabled: boolean;
  detailDepth: number;
}

export type DetailLevel = 'minimal' | 'balanced' | 'full';

// ─── Ask System ───

export interface KeywordMatch {
  keywords: string[];
  response: string;
  action?: 'navigate' | 'filter' | 'info';
  payload?: unknown;
}
