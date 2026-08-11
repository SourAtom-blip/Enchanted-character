import { getImageStyle } from '../utils/imageCrop.js';

export default function CharacterCard({ character }) {
  const { name, tag, imageUrl } = character;

  return (
    <div className="group relative aspect-[3/4] vellum-card rounded-xl overflow-hidden cursor-pointer floating-glow transition-all duration-300 hover:scale-[1.02] hover:border-secondary/50">
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110 flex items-center justify-center"
        style={{ ...getImageStyle(imageUrl), backgroundColor: '#20201c' }}
      >
        {!imageUrl && <span className="material-symbols-outlined text-on-surface-variant/30 text-6xl">person</span>}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {tag && (
          <span className="inline-block px-3 py-1 rounded-full bg-tertiary/20 text-tertiary font-caption text-caption uppercase tracking-tighter mb-2">
            {tag}
          </span>
        )}
        <h3 className="font-headline-sm text-headline-sm text-on-surface">{name}</h3>
      </div>
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/20 rounded-xl transition-all pointer-events-none" />
    </div>
  );
}
