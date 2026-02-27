export function getPlaceholderImage(width: number, height: number, label: string): string {
  return `https://placehold.co/${width}x${height}/e8e8e8/999?text=${encodeURIComponent(label)}&font=mono`;
}
