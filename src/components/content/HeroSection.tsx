import { getPlaceholderImage } from '@/utils/placeholders';

export interface HeroSectionProps {
  src: string;
  title: string;
}

export function HeroSection({ src, title }: HeroSectionProps) {
  return (
    <div className="w-full aspect-video bg-gray-200 rounded-lg mb-8 overflow-hidden">
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          target.src = getPlaceholderImage(1920, 1080, title);
          target.onerror = null;
        }}
      />
    </div>
  );
}
