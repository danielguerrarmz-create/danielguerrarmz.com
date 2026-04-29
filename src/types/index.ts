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
  awards?: string[];
  course?: string;
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

/** Layout for project gallery: grid (2 cols), grid3 (3 cols), or feature (one large + grid). */
export type GalleryLayout = 'grid' | 'grid3' | 'feature';

export interface GalleryImage {
  src: string;
  title: string;
}

export interface ProjectAssets {
  hero: string;
  thumbnail?: string;
  gallery: GalleryImage[];
  /** How to arrange gallery; default 'grid'. */
  galleryLayout?: GalleryLayout;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  /** If set, used in slot navigation instead of title (e.g. shorter label). */
  slotLabel?: string;
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
