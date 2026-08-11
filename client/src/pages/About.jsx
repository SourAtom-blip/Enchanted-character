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
          From the Permian Basin Santa Crew <br />
          to Once Upon A Party
        </h1>
        <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-surface-variant">
          We are not just photo props — we are entertainers, and we love what we do. What began as a beloved Santa
          service has grown into a full roster of characters available to book all year long.
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
              <h3 className="font-headline-md text-headline-md text-secondary mb-2">13 Years of Tradition</h3>
              <p className="font-body-md text-body-md text-on-surface">
                Once Upon A Party started as the Permian Basin Santa Crew. Owner Lorrie Norris and her husband JD
                have been performing as Mr. and Mrs. Claus for thirteen years, building a solid reputation
                throughout the Permian Basin — so much so that many clients pre-book their spots year after year.
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
              We worked so hard to build our reputation that we found the need to expand our Santa team to
              accommodate more clients. In 2026, we added the Easter Bunny to the family — and while running an ad
              for bunny bookings, we saw an opportunity to offer characters that could be booked year-round. That's
              the moment Once Upon A Party was born.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-surface-container rounded-lg p-4 text-center border border-white/5">
                <span className="block text-secondary font-headline-md text-headline-md">13+</span>
                <span className="text-caption font-caption text-on-surface-variant uppercase">Years</span>
              </div>
              <div className="bg-surface-container rounded-lg p-4 text-center border border-white/5">
                <span className="block text-secondary font-headline-md text-headline-md">Year-Round</span>
                <span className="text-caption font-caption text-on-surface-variant uppercase">Booking</span>
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
              "We are not cardboard cut-out characters. Our performers are entertainers — and we love what we do."
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">verified_user</span>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface uppercase mb-1">Vetted Performers</h4>
                  <p className="text-on-surface-variant">
                    Every performer is carefully vetted, able to pass a background check and drug screening, and is
                    a non-smoker — so you can have complete peace of mind.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary mt-1">theater_comedy</span>
                <div>
                  <h4 className="font-label-md text-label-md text-on-surface uppercase mb-1">Real Entertainers</h4>
                  <p className="text-on-surface-variant">
                    Many of our performers come from a theater or music background. They sing, tell stories, read
                    books, play games, and interact with your guests to make the event even more magical.
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
              <h2 className="font-display-lg text-display-lg text-on-surface mb-6">Lorrie Norris: Owner &amp; Mrs. Claus</h2>
              <div className="space-y-6 font-body-lg text-body-lg text-on-surface-variant">
                <p>
                  Lorrie Norris and her husband JD have been performing as Mr. and Mrs. Claus for thirteen years,
                  starting out as the Permian Basin Santa Crew. Together they built a loyal following across the
                  Permian Basin — proof that families were looking for real entertainers, not just photo props.
                </p>
                <p>
                  As demand grew, Lorrie expanded the Santa team to accommodate more clients, then added the Easter
                  Bunny in 2026. That's when she saw the opportunity to offer beloved characters year-round —
                  princesses, superheroes, and more — and Once Upon A Party was born.
                </p>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container">
                <span className="material-symbols-outlined text-[20px]">storefront</span>
                <span className="font-label-md text-label-md">Owner</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container">
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                <span className="font-label-md text-label-md">Mrs. Claus Performer</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary-container text-on-primary-container">
                <span className="material-symbols-outlined text-[20px]">star</span>
                <span className="font-label-md text-label-md">13+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* What We Offer */}
      <Reveal className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-32">
        <div className="text-center mb-12">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">
            Need a Single Princess, a Lone Superhero, <span className="text-secondary italic">or a Whole Team?</span>
          </h2>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-surface-variant">
            However you imagine your event, we can help bring it to life.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {[
            { icon: 'emoji_food_beverage', title: 'Princess Tea Party', desc: 'A royal afternoon with your favorite storybook princesses.' },
            { icon: 'celebration', title: 'Superhero Pizza Party', desc: 'Action-packed fun with your favorite heroes.' },
            { icon: 'auto_awesome', title: 'Quinceañera Fairies', desc: 'A whole team of fairies for her special day.' },
            { icon: 'home', title: 'Home Birthday Parties', desc: 'Bringing the magic straight to your front door.' },
            { icon: 'diversity_3', title: 'Community & Business Events', desc: 'Outreach events, promotions, and school functions.' },
            { icon: 'local_hospital', title: 'Hospital Visits', desc: 'Because every child deserves a little magic.' },
          ].map((item) => (
            <div key={item.title} className="vellum-card rounded-xl p-6 text-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
                {item.icon}
              </span>
              <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">{item.title}</h4>
              <p className="text-on-surface-variant font-body-md text-body-md">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center font-body-md text-body-md text-on-surface-variant mt-10 max-w-xl mx-auto italic">
          Don't see the character you're looking for? Message us — we may be able to work it out.
        </p>
      </Reveal>

      {/* Mission */}
      <Reveal className="mb-8">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center vellum-card ambient-glow rounded-2xl py-20 px-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-50" />
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-8">Our Mission</h2>
          <p className="max-w-3xl mx-auto font-headline-sm text-headline-sm text-secondary-fixed-dim leading-relaxed">
            We love performing for everyone — of all ages, all backgrounds, all cultures, and all abilities. We
            also visit children in hospitals, because every child deserves a little magic.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-2">favorite</span>
              <p className="text-caption font-caption uppercase tracking-widest text-on-surface-variant">Heart-First Service</p>
            </div>
            <div className="text-center">
              <span className="material-symbols-outlined text-secondary text-4xl mb-2">diversity_3</span>
              <p className="text-caption font-caption uppercase tracking-widest text-on-surface-variant">Inclusive for All</p>
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
