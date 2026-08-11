import { useParams, Link, Navigate } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal.js';

const JD_EXTS = ['jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'png', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'png', 'jpg', 'png', 'jpg', 'png', 'jpg', 'png', 'jpg', 'png', 'jpg', 'png', 'jpg', 'png', 'jpg', 'png', 'jpg', 'png'];
const JANSEN_EXTS = ['jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'png'];
const FRED_EXTS = ['jpg', 'png', 'jpg', 'png'];
const DAVID_EXTS = ['jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg'];
const LORRIE_EXTS = ['jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'png', 'jpg', 'jpg', 'png'];
const LISA_EXTS = ['jpg', 'jpg', 'jpg'];

const SANTAS = {
  jd: {
    name: 'JD',
    tag: '1st Performing Santa',
    images: JD_EXTS.map((ext, i) => `/santas/jd/${i + 1}.${ext}`),
  },
  jansen: {
    name: 'Jansen',
    tag: '2nd Performing Santa',
    images: JANSEN_EXTS.map((ext, i) => `/santas/jansen/${i + 1}.${ext}`),
  },
  fred: {
    name: 'Fred',
    tag: '3rd Performing Santa',
    images: FRED_EXTS.map((ext, i) => `/santas/fred/${i + 1}.${ext}`),
  },
  david: {
    name: 'David',
    tag: '4th Performing Santa',
    images: DAVID_EXTS.map((ext, i) => `/santas/david/${i + 1}.${ext}`),
  },
  lorrie: {
    name: 'Lorrie',
    tag: 'Mrs. Claus',
    images: LORRIE_EXTS.map((ext, i) => `/mrs-claus/lorrie/${i + 1}.${ext}`),
  },
  lisa: {
    name: 'Lisa',
    tag: 'Mrs. Claus',
    images: LISA_EXTS.map((ext, i) => `/mrs-claus/lisa/${i + 1}.${ext}`),
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
