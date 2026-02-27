import type { DisciplineMix, Project } from '@/types';

export function updateDisciplineMix(
  current: DisciplineMix,
  changed: 'arch' | 'prod' | 'sw',
  newValue: number
): DisciplineMix {
  newValue = Math.max(0, Math.min(100, Math.round(newValue)));

  const keys: Array<'arch' | 'prod' | 'sw'> = ['arch', 'prod', 'sw'];
  const others = keys.filter((k) => k !== changed);

  const oldValue = current[changed];
  const delta = newValue - oldValue;

  if (delta === 0) return current;

  const otherSum = others.reduce((sum, k) => sum + current[k], 0);

  const result: DisciplineMix = { ...current };
  result[changed] = newValue;

  if (otherSum === 0) {
    const share = (100 - newValue) / others.length;
    let remaining = 100 - newValue;
    others.forEach((k, i) => {
      if (i === others.length - 1) {
        result[k] = remaining;
      } else {
        result[k] = Math.round(share);
        remaining -= result[k];
      }
    });
  } else {
    let remaining = 100 - newValue;
    others.forEach((k, i) => {
      if (i === others.length - 1) {
        result[k] = Math.max(0, remaining);
      } else {
        const proportion = current[k] / otherSum;
        const newOtherValue = Math.max(0, Math.round(remaining * proportion));
        result[k] = newOtherValue;
        remaining -= newOtherValue;
      }
    });
  }

  others.forEach((k) => {
    result[k] = Math.max(0, result[k]);
  });

  const sum = result.arch + result.prod + result.sw;
  if (sum !== 100) {
    result[changed] += 100 - sum;
  }
  return result;
}

export function scoreProject(project: Project, mix: DisciplineMix): number {
  const d = project.disciplines;
  return (
    (d.arch / 100) * (mix.arch / 100) +
    (d.prod / 100) * (mix.prod / 100) +
    (d.sw / 100) * (mix.sw / 100)
  );
}
