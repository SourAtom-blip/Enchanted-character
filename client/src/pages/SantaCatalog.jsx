import { useParams, Link, Navigate } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal.js';

const SANTAS = {
  jd: {
    name: 'JD',
    tag: 'Santa #1',
    images: ['/santas/jd/1.jpg', '/santas/jd/2.jpg', '/santas/jd/3.jpg', '/santas/jd/4.jpg', '/santas/jd/5.png', '/santas/jd/6.jpg', '/santas/jd/7.jpg'],
  },
  jansen: {
    name: 'Jansen',
    tag: 'Santa #2',
    images: [
      '/santas/jansen/1.jpg',
      '/santas/jansen/2.jpg',
      '/santas/jansen/3.jpg',
      '/santas/jansen/4.jpg',
      '/santas/jansen/5.jpg',
      '/santas/jansen/6.jpg',
      '/santas/jansen/7.jpg',
      '/santas/jansen/8.jpg',
      '/santas/jansen/9.jpg',
    ],
  },
};

function Photo({ src }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal vellum-card gilded-edge rounded-xl overflow-hidden aspect-[3/4]">
      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${src}")` }} />
    </div>
  );
}

export default function SantaCatalog() {
  const { slug } = useParams();
  const santa = SANTAS[slug];

  if (!santa) return <Navigate to="/characters" replace />;

  return (
    <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <Link to="/characters" className="text-secondary font-label-md uppercase tracking-wider inline-flex items-center gap-2 mb-10 hover:gap-3 transition-all">
        <span className="material-symbols-outlined">arrow_back</span> Back to Characters
      </Link>

      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-widest mb-4">
          {santa.tag}
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-secondary">{santa.name}</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
        {santa.images.map((src) => (
          <Photo key={src} src={src} />
        ))}
      </div>
    </main>
  );
}
