export function formatDate(date: string): string {
  return date || '—';
}

export function joinList(items: string[], separator = ', '): string {
  return items.length > 0 ? items.join(separator) : '—';
}

export function getDetailLabel(detailDepth: number): 'minimal' | 'balanced' | 'full' {
  if (detailDepth < 33) return 'minimal';
  if (detailDepth < 66) return 'balanced';
  return 'full';
}
