const PERFORMERS = [
  { name: 'Lorrie', tag: 'Owner & Performer', image: '/top-performers/1.jpg' },
  { name: 'Performer', tag: '', image: '/top-performers/2.jpg' },
  { name: 'Performer', tag: '', image: '/top-performers/4.jpg' },
  { name: 'Moana', tag: '', image: '/top-performers/5.jpg' },
  { name: 'Jose', tag: '', image: '/top-performers/6.jpg' },
  { name: 'Ameri', tag: '', image: '/top-performers/7.jpg' },
  { name: 'Addison', tag: '', image: '/top-performers/8.jpg' },
  { name: 'Ryley', tag: '', image: '/top-performers/9.jpg' },
  { name: 'Abbie', tag: '', image: '/top-performers/10.jpg' },
  { name: 'Sonya', tag: '', image: '/top-performers/11.jpg' },
  { name: 'Mia', tag: '', image: '/top-performers/unnamed.jpg' },
];

function PerformerCard({ performer }) {
  return (
    <div className="vellum-card gilded-edge rounded-xl overflow-hidden group relative aspect-[3/4] transition-transform duration-500 hover:scale-[1.02]">
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url("${performer.image}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-headline-sm text-headline-sm text-secondary">{performer.name}</h3>
        {performer.tag && (
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mt-1">{performer.tag}</p>
        )}
      </div>
    </div>
  );
}

export default function TopPerformers() {
  return (
    <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-secondary mb-4">Top Performers</h1>
        <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-surface-variant">
          Meet the talented artists and performers who bring Lorrie's Enchanted Arts to life at every event.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {PERFORMERS.map((performer, i) => (
          <PerformerCard key={i} performer={performer} />
        ))}
      </div>
    </main>
  );
}
