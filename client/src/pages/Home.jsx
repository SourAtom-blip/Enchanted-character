import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';
import CharacterCard from '../components/CharacterCard.jsx';
import GalleryCard from '../components/GalleryCard.jsx';
import ShimmerButton from '../components/ShimmerButton.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import useSiteSettings from '../hooks/useSiteSettings.js';

const FALLBACK_HERO = {
  heading: 'Where Imagination Meets Professional Artistry',
  body: 'Transforming ordinary events into extraordinary memories through high-end character entertainment and bespoke artistic experiences.',
  imageUrl: '',
};

const FALLBACK_TRUST = {
  heading: 'Professional Performers You Can Trust',
  body: "We believe magic should be seamless and safe. Every member of our troupe undergoes rigorous character training, vocal coaching, and comprehensive background vetting to ensure your family's experience is both spectacular and secure.",
  imageUrl: '',
};

function Reveal({ children }) {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="reveal">
      {children}
    </section>
  );
}

export default function Home() {
  const [characters, setCharacters] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [hero, setHero] = useState(FALLBACK_HERO);
  const [trust, setTrust] = useState(FALLBACK_TRUST);
  const { heroBadgeUrl, heroImageUrl: settingsHeroImage } = useSiteSettings();

  useEffect(() => {
    api
      .get('/api/characters')
      .then((res) => setCharacters(Array.isArray(res.data) ? res.data.slice(0, 4) : []))
      .catch(() => setCharacters([]));

    api
      .get('/api/gallery?type=art')
      .then((res) => setGallery(Array.isArray(res.data) ? res.data : []))
      .catch(() => setGallery([]));

    api
      .get('/api/pages/home')
      .then((res) => {
        const sections = res.data?.sections || [];
        const heroSection = sections.find((s) => s.key === 'hero');
        const trustSection = sections.find((s) => s.key === 'trust');
        if (heroSection) {
          setHero({
            heading: heroSection.heading || FALLBACK_HERO.heading,
            body: heroSection.body || FALLBACK_HERO.body,
            imageUrl: heroSection.imageUrl || '',
          });
        }
        if (trustSection) {
          setTrust({
            heading: trustSection.heading || FALLBACK_TRUST.heading,
            body: trustSection.body || FALLBACK_TRUST.body,
            imageUrl: trustSection.imageUrl || '',
          });
        }
      })
      .catch(() => {});
  }, []);

  const [large, ...rest] = gallery;
  const heroImageUrl = hero.imageUrl || settingsHeroImage;

  return (
    <>
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center scale-105 filter blur-[2px] brightness-50"
            style={{
              backgroundImage: heroImageUrl ? `url("${heroImageUrl}")` : undefined,
              backgroundColor: heroImageUrl ? undefined : '#20201c',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-margin-mobile max-w-4xl">
          {heroBadgeUrl && (
            <div className="flex justify-center mb-8">
              <img src={heroBadgeUrl} alt="Once Upon A Party Logo" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
            </div>
          )}
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight text-on-background">
            {hero.heading.includes('Imagination') ? (
              <>
                Where <span className="text-secondary italic">Imagination</span> Meets Professional Artistry
              </>
            ) : (
              hero.heading
            )}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">{hero.body}</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <ShimmerButton as="link" to="/characters">
              Explore Characters
            </ShimmerButton>
            <ShimmerButton as="link" to="/gallery" variant="ghost" className="shimmer-btn-none">
              Our Gallery
            </ShimmerButton>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="material-symbols-outlined text-secondary opacity-50">expand_more</span>
        </div>
      </section>

      <Reveal>
        <div className="py-24 px-margin-mobile max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-md text-headline-md text-secondary mb-4">Meet Our Characters</h2>
            <div className="h-px w-24 bg-secondary/30 mx-auto mb-6" />
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
              From timeless royalty to legendary heroes, our performers bring your favorite stories to life with
              grace and authenticity.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {characters.map((c) => (
              <Link key={c._id} to="/characters">
                <CharacterCard character={c} />
              </Link>
            ))}
            {characters.length === 0 && (
              <p className="col-span-full text-center text-on-surface-variant">Characters coming soon.</p>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="py-24 bg-surface-container-low relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-background to-transparent" />
          <div className="max-w-container-max mx-auto px-margin-mobile flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 relative">
              <div className="vellum-card p-1 rounded-2xl rotate-3 floating-glow">
                <div
                  className="w-full aspect-square bg-cover bg-center rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
                  style={{
                    backgroundImage: trust.imageUrl ? `url("${trust.imageUrl}")` : undefined,
                    backgroundColor: '#20201c',
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 vellum-card p-4 rounded-xl -rotate-6 shadow-xl hidden md:block">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-4xl">verified_user</span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface leading-tight">Safety First</p>
                    <p className="font-caption text-caption text-on-surface-variant">Background Checked</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6">
                Professional Performers You Can <span className="text-secondary">Trust</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">{trust.body}</p>
              <ul className="space-y-6 mb-10">
                <li className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-secondary">school</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface">Method Training</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      Performers stay in character from the moment they arrive until they leave the venue.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <span className="material-symbols-outlined text-secondary">security</span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md text-on-surface">Vetted for Peace of Mind</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      100% of our staff are background-checked and professionally insured for every event.
                    </p>
                  </div>
                </li>
              </ul>
              <ShimmerButton variant="dark" as="link" to="/about">
                Our Safety Standards
              </ShimmerButton>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="py-24 px-margin-mobile max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-xl">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">The Enchanted Art Showcase</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Bespoke illustrations and physical artworks inspired by the stories we tell. Every piece is a window
                into another world.
              </p>
            </div>
            <Link
              className="mt-6 md:mt-0 text-secondary font-label-md text-label-md flex items-center gap-2 hover:translate-x-2 transition-transform"
              to="/art-showcase"
            >
              View Full Gallery <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-12 gap-gutter items-stretch">
            {large && <GalleryCard item={large} className="col-span-12 md:col-span-7 aspect-video" />}
            <div className="col-span-12 md:col-span-5 flex flex-col gap-gutter">
              {rest.slice(0, 2).map((item) => (
                <GalleryCard key={item._id} item={item} className="flex-1 aspect-square md:aspect-auto" />
              ))}
            </div>
            {gallery.length === 0 && (
              <p className="col-span-full text-center text-on-surface-variant">Gallery coming soon.</p>
            )}
          </div>
        </div>
      </Reveal>

      <Reveal>
        <div className="py-24 px-margin-mobile relative">
          <div className="max-w-4xl mx-auto vellum-card p-12 rounded-3xl text-center floating-glow border-secondary/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-secondary/10" />
            <div className="relative z-10">
              <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md text-on-surface mb-6">
                Ready to <span className="italic text-secondary">Start Your Story?</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto">
                Inquire today for character bookings, custom art commissions, or to plan your next magical event.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <ShimmerButton as="link" to="/contact" className="!px-12 !py-5 shadow-lg shadow-secondary/20">
                  Book an Event
                </ShimmerButton>
                <ShimmerButton
                  as="link"
                  to="/contact"
                  className="!px-12 !py-5 !bg-surface-container-highest !text-on-surface hover:!bg-surface-bright border border-on-surface-variant/20"
                >
                  Custom Art Request
                </ShimmerButton>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}
