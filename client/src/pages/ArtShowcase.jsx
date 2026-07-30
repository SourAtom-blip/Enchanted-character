import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { getImageStyle } from '../utils/imageCrop.js';

function Piece({ item }) {
  const ref = useScrollReveal();
  const { _id, title, subtitle, imageUrl } = item;
  return (
    <div ref={ref} className="reveal vellum-card ambient-glow rounded-xl p-4 flex flex-col group mb-gutter break-inside-avoid">
      <Link to={`/art-showcase/${_id}`} className="relative overflow-hidden rounded-lg mb-4 gilded-edge aspect-[4/5] block">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ ...getImageStyle(imageUrl), backgroundColor: '#20201c' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
          <span className="text-secondary font-label-md uppercase tracking-widest">View Piece</span>
        </div>
      </Link>
      <Link to={`/art-showcase/${_id}`}>
        <h3 className="font-headline-sm text-headline-sm text-secondary mb-2 hover:underline">{title}</h3>
      </Link>
      {subtitle && (
        <p className="font-body-md text-body-md text-on-surface-variant flex-grow italic mb-4 leading-relaxed">
          {subtitle}
        </p>
      )}
      <Link
        to={`/art-showcase/${_id}`}
        className="w-full text-center border border-secondary text-secondary font-label-md py-3 rounded-lg hover:bg-secondary hover:text-on-secondary transition-all"
      >
        Inquire About This Piece
      </Link>
    </div>
  );
}

export default function ArtShowcase() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get('/api/gallery?type=art')
      .then((res) => setItems(Array.isArray(res.data) ? res.data : []))
      .catch(() => setItems([]));
  }, []);

  return (
    <main className="pb-24">
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-20 text-center pt-16">
        <h1 className="font-display-lg text-display-lg mb-4 text-secondary">The Enchanted Gallery</h1>
        <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-surface-variant italic">
          Step into a world where every brushstroke tells a story. Lorrie's original paintings blend classical
          technique with a whimsical spirit.
        </p>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-gutter [column-fill:balance]">
          {items.map((item) => (
            <Piece key={item._id} item={item} />
          ))}
          {items.length === 0 && (
            <p className="text-center text-on-surface-variant font-body-md">New showcase pieces coming soon.</p>
          )}
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="vellum-card rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="material-symbols-outlined text-secondary text-5xl mb-6" style={{ fontVariationSettings: "'FILL' 1" }}>
              palette
            </span>
            <h2 className="font-headline-md text-headline-md mb-6">Bespoke Creations</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-3xl mx-auto leading-relaxed">
              Looking for something uniquely yours? Lorrie accepts limited commissions throughout the year. Whether
              it's a portrait of a loved one or a scene from your own imagination, each custom piece is crafted with
              the same magical touch.
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center border-t border-secondary/20 pt-8 mt-8">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">payments</span>
                <span className="font-label-md uppercase">Venmo / PayPal / Cash App</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">verified_user</span>
                <span className="font-label-md uppercase">Secure Personal Transactions</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
