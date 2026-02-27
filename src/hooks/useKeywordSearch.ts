import { keywordDictionary } from '@/data/keywords';
import type { KeywordMatch } from '@/types';

export interface KeywordSearchResult {
  response: string;
  action?: 'navigate' | 'filter' | 'info';
  payload?: unknown;
}

export function useKeywordSearch() {
  const search = (query: string): KeywordSearchResult => {
    const normalized = query.toLowerCase().trim();
    const words = normalized.split(/\s+/);

    let bestMatch: KeywordMatch | null = null;
    let bestScore = 0;

    for (const entry of keywordDictionary) {
      if (entry.keywords.length === 0) continue;
      const score = entry.keywords.filter((kw) =>
        words.some((word) => word.includes(kw) || kw.includes(word))
      ).length;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestScore > 0) {
      return {
        response: bestMatch.response,
        action: bestMatch.action,
        payload: bestMatch.payload,
      };
    }

    const fallback = keywordDictionary.find((e) => e.keywords.length === 0);
    return {
      response: fallback?.response ?? 'Try asking about my skills, projects, or background.',
    };
  };

  return { search };
}
