import { useEffect, useState } from 'react';
import api from '../api/client.js';
import ShimmerButton from '../components/ShimmerButton.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { getImageStyle } from '../utils/imageCrop.js';

const CATEGORY_ICONS = {
  'Holiday Magic': 'ac_unit',
  'Royal Balls': 'auto_awesome',
  'Superhero Training': 'bolt',
};

function Frame({ item, className = '' }) {
  const ref = useScrollReveal();
  const { title, subtitle, imageUrl } = item;
  return (
    <div ref={ref} className={`reveal relative group overflow-hidden rounded-xl vellum-card gilded-edge ${className}`}>
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ ...getImageStyle(imageUrl), backgroundColor: '#20201c' }}
      />
      {(title || subtitle) && (
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
          {title && <span className="font-headline-sm text-headline-sm text-secondary">{title}</span>}
          {subtitle && (
            <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function CategorySection({ category, items }) {
  const [featured, ...rest] = items;
  return (
    <div className="mb-12">
      <h2 className="font-headline-md text-headline-md text-secondary-fixed-dim flex items-center gap-3 mb-6">
        {CATEGORY_ICONS[category] && <span className="material-symbols-outlined">{CATEGORY_ICONS[category]}</span>}
        {category}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {featured && <Frame item={featured} className="md:col-span-7 h-[400px] md:h-[500px]" />}
        {rest.map((item) => (
          <Frame key={item._id} item={item} className="md:col-span-5 h-[320px] md:h-[400px]" />
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get('/api/gallery?type=photo')
      .then((res) => setItems(Array.isArray(res.data) ? res.data : []))
      .catch(() => setItems([]));
  }, []);

  const categories = [...new Set(items.map((i) => i.category).filter(Boolean))];
  const uncategorized = items.filter((i) => !i.category);

  return (
    <main className="pb-24">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-16">
        <div className="mb-16 text-center">
          <h1 className="font-display-lg text-display-lg text-secondary mb-4">Capturing the Magic</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Explore our gallery of professional character entertainment, where storytelling comes to life through
            exquisite artistry and dedicated performance.
          </p>
        </div>

        {categories.map((category) => (
          <CategorySection key={category} category={category} items={items.filter((i) => i.category === category)} />
        ))}

        {uncategorized.length > 0 && <CategorySection category="Gallery" items={uncategorized} />}

        {items.length === 0 && <p className="text-center text-on-surface-variant">Gallery coming soon.</p>}

        <div className="mt-24 py-16 px-8 rounded-2xl vellum-card relative overflow-hidden text-center border border-secondary/20">
          <div className="relative z-10">
            <h3 className="font-headline-md text-headline-md text-secondary mb-6 italic">
              Ready to create your own magical moment?
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto">
              Whether it's a royal ball, a holiday surprise, or hero training, we bring professional artistry to
              every encounter.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <ShimmerButton as="link" to="/contact">
                Book an Event
              </ShimmerButton>
              <ShimmerButton as="link" to="/art-showcase" variant="ghost">
                View Art Showcase
              </ShimmerButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
