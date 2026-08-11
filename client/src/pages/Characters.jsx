import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';
import ShimmerButton from '../components/ShimmerButton.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';

const SANTA_SLUGS = { JD: 'jd', Jansen: 'jansen', Fred: 'fred', David: 'david' };
const ORDINALS = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

function CharacterFeature({ character }) {
  const ref = useScrollReveal();
  const { name, tag, imageUrl, description } = character;
  const santaSlug = SANTA_SLUGS[name];
  return (
    <div ref={ref} className="reveal vellum-card rounded-xl overflow-hidden group">
      <div className="relative aspect-[3/4] overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110 flex items-center justify-center"
          style={{ backgroundImage: imageUrl ? `url("${imageUrl}")` : undefined, backgroundColor: '#20201c' }}
        >
          {!imageUrl && <span className="material-symbols-outlined text-on-surface-variant/30 text-7xl">person</span>}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
        {tag && (
          <div className="absolute bottom-4 left-6">
            <span className="font-label-md text-label-md text-primary bg-primary-container/60 px-3 py-1 rounded-full backdrop-blur-md border border-primary/20">
              {tag}
            </span>
          </div>
        )}
      </div>
      <div className="p-8">
        <h3 className="font-headline-md text-headline-md mb-3 text-secondary">{name}</h3>
        {description && <p className="font-body-md text-body-md text-on-surface-variant mb-6">{description}</p>}
        {santaSlug && (
          <Link
            to={`/characters/santas/${santaSlug}`}
            className="w-full mb-3 block text-center py-3 px-6 bg-secondary/10 border border-secondary/40 text-secondary font-label-md text-label-md uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-all rounded-lg"
          >
            View {name}'s Photo Catalog
          </Link>
        )}
        <button
          type="button"
          className="w-full py-3 px-6 vellum-card border-secondary/40 text-secondary font-label-md text-label-md uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-all rounded-lg"
        >
          Inquire About {name}
        </button>
      </div>
    </div>
  );
}

export default function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    api
      .get('/api/characters')
      .then((res) => setCharacters(Array.isArray(res.data) ? res.data : []))
      .catch(() => setCharacters([]));
  }, []);

  const mainCharacters = characters.filter((c) => c.category !== 'Santas');
  const santas = characters.filter((c) => c.category === 'Santas').sort((a, b) => a.order - b.order);

  return (
    <main className="pb-24">
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mb-20 pt-16">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-4 text-on-surface">
          Meet Our <span className="text-secondary italic">Enchanted Cast</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Where professional artistry meets heart-felt performance. Each character is portrayed by trained actors
          dedicated to preserving the wonder of childhood.
        </p>
      </section>

      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {mainCharacters.map((c) => (
            <CharacterFeature key={c._id} character={c} />
          ))}
          {characters.length === 0 && (
            <p className="col-span-full text-center text-on-surface-variant">Characters coming soon.</p>
          )}
        </div>
      </section>

      {santas.length > 0 && (
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-24">
          <div className="text-center mb-12">
            <h2 className="font-headline-md text-headline-md text-secondary mb-3">Our Santas</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
              Meet our beloved Santa performers, ranked by holiday magic.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {santas.map((c, i) => (
              <div key={c._id} className="relative">
                <span className="absolute -top-3 -left-3 z-10 px-4 h-10 rounded-full bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-wider flex items-center justify-center shadow-lg whitespace-nowrap">
                  {ORDINALS[i] || `${i + 1}th`} Performing Santa
                </span>
                <CharacterFeature character={c} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-24 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="vellum-card rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="font-display-lg text-display-lg mb-6 text-on-surface">
                Safe. Professional. <span className="text-secondary italic">Magical.</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                We believe that magic is only possible when built upon a foundation of trust. Every Lorrie's
                Enchanted Arts performer undergoes a rigorous selection process to ensure your family's safety and
                the highest artistic quality.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified_user
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-1">
                      Background Checked
                    </h4>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Comprehensive criminal and safety vetting for every single team member.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      theater_comedy
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-1">
                      Professional Actors
                    </h4>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Trained performers specializing in vocal mimicry, improv, and character integrity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-64 h-64 border-2 border-dashed border-secondary/30 rounded-full flex items-center justify-center p-4">
                <div className="w-full h-full bg-secondary/10 rounded-full flex flex-col items-center justify-center text-center p-6">
                  <span className="material-symbols-outlined text-4xl text-secondary mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  <span className="font-label-md text-label-md text-on-surface uppercase tracking-tighter">
                    Certified Magic
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant mt-2">
                    Member of Character Entertainers Guild
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-center mt-16">
        <ShimmerButton as="link" to="/contact">
          Book a Character
        </ShimmerButton>
      </div>
    </main>
  );
}
