import { getImageStyle } from '../utils/imageCrop.js';

export default function GalleryCard({ item, className = '' }) {
  const { title, subtitle, imageUrl } = item;

  return (
    <div className={`vellum-card rounded-2xl overflow-hidden relative group ${className}`}>
      <div
        className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
        style={{ ...getImageStyle(imageUrl), backgroundColor: '#20201c' }}
      />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
      {(title || subtitle) && (
        <div className="absolute bottom-6 left-6 p-4 vellum-card rounded-xl opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
          {title && <p className="font-label-md text-label-md text-on-surface">{title}</p>}
          {subtitle && <p className="font-caption text-caption text-on-surface-variant">{subtitle}</p>}
        </div>
      )}
    </div>
  );
}
