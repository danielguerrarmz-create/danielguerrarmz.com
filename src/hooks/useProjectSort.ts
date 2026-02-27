import { useMemo } from 'react';
import { projects } from '@/data/projects';
import { scoreProject } from '@/utils/disciplineMath';
import type { DisciplineMix, Project } from '@/types';

export function useProjectSort(mix: DisciplineMix): Project[] {
  return useMemo(() => {
    const aboutMe = projects[0];
    const rest = projects.slice(1) as Project[];
    const scored = rest
      .map((p) => ({ project: p, score: scoreProject(p, mix) }))
      .sort((a, b) => b.score - a.score);
    return [aboutMe, ...scored.map((s) => s.project)];
  }, [mix]);
}
