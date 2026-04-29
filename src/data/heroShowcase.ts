/** Optional: how the image fits the hero area. Default is 'cover' (fill, may crop). Use 'contain' to show full image with letterboxing. */
export type HeroObjectFit = 'cover' | 'contain';

/** Optional: where to anchor the image when cropping. e.g. 'center', 'top', 'bottom', 'left', 'right', or '50% 30%'. */
export type HeroObjectPosition = string;

export interface HeroShowcaseSlide {
  projectId: number;
  title: string;
  src: string;
  /** How to fit this image. Default 'cover'. Use 'contain' for portrait or when you don't want cropping. */
  objectFit?: HeroObjectFit;
  /** Where to anchor when using cover. e.g. 'center' (default), 'top', 'bottom'. */
  objectPosition?: HeroObjectPosition;
}

export const heroShowcaseSlides: HeroShowcaseSlide[] = [
  { projectId: 1, title: 'Synergy with the Cosmos', src: '/assets/projects/hero/01-synergy.png' },
  { projectId: 2, title: 'Pressure Ulcer Medical Device', src: '/assets/projects/hero/02-pressure-ulcer.png' },
  { projectId: 3, title: 'Hydraulic Commons: Water Infrastructure', src: '/assets/projects/hero/03-hydraulic-commons.png' },
  { projectId: 4, title: 'Search by Assembly', src: '/assets/projects/hero/04-search-by-assembly.png' },
  { projectId: 5, title: 'Dougherty Arts Center Renovation', src: '/assets/projects/hero/05-dougherty.png' },
];
