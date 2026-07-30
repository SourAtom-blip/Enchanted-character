import useScrollReveal from '../hooks/useScrollReveal.js';

function Reveal({ children, className = '' }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

const IMG = {
  santa:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCVNYkvFZ7sXrwoEEIndFoIrG_wPyljTTJAVv4gZY-5B-m2qZ4hLGnR8DCgwHHEPb4wOVte_uPvcVrtx_QO0pnwxy4c7DAkqPFs8MmGV-YQlq5P4jpoDcgL7ZbunrJZT1S4YSPyNn2p-2UWJYtbOd6nV6rMRhofvjOsfQwatzNnDKGLcfMBwnejsiJYAieXv44I54anvDT_0cy2LghTZ6y9NIQBnA7QTHi0lPmROg9CAr4jfnPUYaDOQJdDp3o1wNnBC3W4C5cTngs',
  backstage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCejpbFYexYUvENz9PfXaVcI0YAg216H4lvj5lEpp1lcFwLn41QTXiQNHMbhA3k9sVR79teBWo0xJ_7enT-1Y-H9Ea3no7_peUldbs9tAAr4MJCtKQMJ2DtHG90OSKQ0WhSwebHMKk-FLUhVKoRBW9LrjAfGyBKfceXpaYPHjPoDM4QcRcxXvYIKzi-uNEqHI_iIEBT_FgIRzNNWygJ0Xtjj9fsyr4trkF4cZCFRQ7Z4MgbzPr1Mtf95tdOnF9HNuvX_pjI5FuNfzM',
  lorrie:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBGnVHs6ipRuR_2Sbyx2K9y_lsbuG4rSjpHlz8heeoLNWY5FNOnY3yXqEFNhAVeMcdEczVcLcb5bdeQY_bIbmxT3Jr9Ix4xXr9Tz_0UDZmV8mBSqH92UPeUpGmX9fmFINUlDpC40s2Py9l0jG3VQS3mAcJDH-rn4WfnlC84Xdxtpy7d4ai55v3oyTDWLasBOn9fZa-eb2BkCPGtesO_WzN9pZ5uzdV72iDkVJZgzhRPluhx2N7OcMyEysw0MDHMMSpg4etenxoRGhM',
};

export default function About() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-24 pt-16 text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-tertiary-container text-tertiary font-label-md text-label-md uppercase tracking-widest mb-6">
          Our Legacy
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-secondary mb-8 leading-tight">
          From Seasonal Magic to <br />
          Year-Round Enchantment
        </h1>
        <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-surface-variant">
          For over a decade, we've specialized in the art of belief. What began as a premium Santa service has
          blossomed into a full-scale character entertainment studio.
        </p>
      </section>

      {/* Origin story bento */}
      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-7 vellum-card gilded-edge rounded-xl overflow-hidden group relative">
            <div
              className="w-full h-full min-h-[400px] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url("${IMG.santa}")` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-8">
              <h3 className="font-headline-md text-headline-md text-secondary mb-2">12 Years of Traditions</h3>
              <p className="font-body-md text-body-md text-on-surface">
                The foundation of Lorrie's Enchanted Arts was built on twelve seasons of providing the most authentic
                Santa experiences in the region.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 vellum-card rounded-xl p-8 flex flex-col justify-center gap-6 ambient-glow">
            <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-secondary">The Evolution</h3>
            <p className="text-on-surface-variant">
              As the demand for professional character work grew, Lorrie recognized a need for higher standards in
              children's entertainment. In 2024, she expanded the business to include a full roster of fairytale
              royalty, superheroes, and mythical beings.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-surface-container rounded-lg p-4 text-center border border-white/5">
                <span className="block text-secondary font-headline-md text-headline-md">15+</span>
                <span className="text-caption font-caption text-on-surface-variant uppercase">Characters</span>
              </div>
              <div className="bg-surface-container rounded-lg p-4 text-center border border-white/5">
                <span className="block text-secondary font-headline-md text-headline-md">500+</span>
                <span className="text-caption font-caption text-on-surface-variant uppercase">Events</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Professionalism */}
      <Reveal className="bg-surface-container-low py-32 mb-32 relative overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary/10 blur-3xl rounded-full" />
              <div className="relative vellum-card gilded-edge p-2 rounded-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div
                  className="aspect-[4/5] bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url("${IMG.backstage}")` }}
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 space-y-8">
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              The Standard of <span className="text-secondary">Professional Magic</span>
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant italic">
              "We don't just put on costumes; we inhabit stories."
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">verified_user</span>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface uppercase mb-1">Vetted Performers</h4>
                  <p className="text-on-surface-variant">
                    Every member of our team undergoes rigorous background checks and character safety training to
                    ensure peace of mind for every family.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">theater_comedy</span>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface uppercase mb-1">Theatrical Excellence</h4>
                  <p className="text-on-surface-variant">
                    Our actors are professionally trained in character improv, vocal performance, and stage presence
                    to maintain the illusion from start to finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Meet Lorrie */}
      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32">
        <div className="flex flex-col lg:flex-row gap-gutter items-stretch">
          <div className="lg:w-1/3 flex flex-col gap-6">
            <div className="vellum-card gilded-edge p-1 rounded-xl h-full">
              <div
                className="w-full h-full min-h-[500px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: `url("${IMG.lorrie}")` }}
              />
            </div>
          </div>
          <div className="lg:w-2/3 vellum-card rounded-xl p-10 flex flex-col justify-between">
            <div>
              <span className="text-secondary font-label-md text-label-md uppercase tracking-widest mb-4 block">
                Meet the Founder
              </span>
              <h2 className="font-display-lg text-display-lg text-on-surface mb-6">Lorrie: Artist &amp; Storyteller</h2>
              <div className="space-y-6 font-body-lg text-body-lg text-on-surface-variant">
                <p>
                  Lorrie's journey is rooted in a lifelong passion for both the visual and performing arts. As a
                  classically trained artist, she spent decades mastering the fine details of character design and
                  portraiture, which naturally transitioned into the world of live entertainment.
                </p>
                <p>
                  Her unique perspective allows her to approach every event as a canvas. She doesn't just manage the
                  performance; she curates the visual aesthetic, from the hand-painted details on a crown to the
                  specific fabric choices that catch the light during a royal ball.
                </p>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container">
                <span className="material-symbols-outlined text-[20px]">palette</span>
                <span className="font-label-md text-label-md">Professional Painter</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
                <span className="font-label-md text-label-md">Creative Director</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container">
                <span className="material-symbols-outlined text-[20px]">star</span>
                <span className="font-label-md text-label-md">Performative Specialist</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Mission */}
      <Reveal className="mb-8">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center vellum-card ambient-glow rounded-2xl py-20 px-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8">Our Mission</h2>
          <p className="max-w-3xl mx-auto font-headline-sm text-headline-sm text-secondary-fixed-dim leading-relaxed">
            To bridge the gap between imagination and reality by providing world-class, professional character
            entertainment that honors the wonder of childhood and the artistry of performance.
          </p>
          <div className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-2">favorite</span>
              <p className="text-caption font-caption uppercase tracking-widest text-on-surface-variant">Heart-First Service</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-2">brush</span>
              <p className="text-caption font-caption uppercase tracking-widest text-on-surface-variant">Artistic Integrity</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-2">safety_check</span>
              <p className="text-caption font-caption uppercase tracking-widest text-on-surface-variant">
                Uncompromising Safety
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
