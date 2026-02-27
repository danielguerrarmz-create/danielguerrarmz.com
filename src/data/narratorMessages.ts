export const DEFAULT_NARRATOR =
  "Welcome. Scroll the project slot to browse work.\nUse the controls to filter and explore.";

export const IDLE_TIP = "Tip: hover the slot and scroll to navigate.";

export const NARRATOR_VIEWING = (title: string) => `Viewing: ${title}.`;

export const NARRATOR_BALANCED = "Balanced mix. All disciplines weighted equally.";

export const NARRATOR_ARCH_EXCLUDED =
  "Architecture excluded. Showing product design and software projects.";
export const NARRATOR_PROD_EXCLUDED =
  "Product design excluded. Showing architecture and software projects.";
export const NARRATOR_SW_EXCLUDED =
  "Software excluded. Showing architecture and product design projects.";

export const NARRATOR_ARCH_EMPHASIS =
  "Emphasizing architecture. Projects reordered by architectural relevance.";
export const NARRATOR_PROD_EMPHASIS =
  "Emphasizing product design. Projects reordered by product design relevance.";
export const NARRATOR_SW_EMPHASIS =
  "Emphasizing software. Projects reordered by software relevance.";

export const NARRATOR_MIX = (arch: number, prod: number, sw: number) =>
  `Mixing: ARCH ${arch}% · PROD ${prod}% · SW ${sw}%`;

export const NARRATOR_HERO_ON = "Hero view enabled.";
export const NARRATOR_HERO_OFF = "Hero view disabled.";
export const NARRATOR_META_ON = "Metadata shown.";
export const NARRATOR_META_OFF = "Metadata hidden.";
export const NARRATOR_DETAIL = (level: string) => `Detail: ${level}.`;

export const NARRATOR_ASK_ACTIVE =
  "Ask mode active.\nTry: 'what tools?' or 'architecture work'";
export const NARRATOR_SEARCHING = (query: string) => `Searching: '${query}'...`;
