import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/client.js';
import ShimmerButton from '../components/ShimmerButton.jsx';
import { getImageStyle } from '../utils/imageCrop.js';

export default function ArtPieceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setItem(null);
    setNotFound(false);
    api
      .get(`/api/gallery/${id}`)
      .then((res) => setItem(res.data))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <main className="pt-32 pb-24 px-margin-mobile text-center">
        <h1 className="font-headline-md text-headline-md text-secondary mb-4">Piece not found</h1>
        <button onClick={() => navigate('/art-showcase')} className="text-secondary underline">
          Back to Art Showcase
        </button>
      </main>
    );
  }

  if (!item) {
    return <main className="pt-32 pb-24 px-margin-mobile text-center text-on-surface-variant">Loading...</main>;
  }

  return (
    <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <Link to="/art-showcase" className="text-secondary font-label-md uppercase tracking-wider inline-flex items-center gap-2 mb-10 hover:gap-3 transition-all">
        <span className="material-symbols-outlined">arrow_back</span> Back to Gallery
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <div className="vellum-card p-3 rounded-2xl gilded-edge">
            <div
              className="w-full aspect-[4/5] rounded-xl bg-cover bg-center"
              style={{ ...getImageStyle(item.imageUrl), backgroundColor: '#20201c' }}
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-secondary mb-4">{item.title}</h1>
          {item.subtitle && (
            <p className="font-body-lg text-body-lg text-on-surface-variant italic mb-8 leading-relaxed">{item.subtitle}</p>
          )}

          <div className="vellum-card rounded-xl p-6 mb-8 space-y-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">payments</span>
              <span className="font-label-md text-label-md uppercase text-on-surface-variant">Venmo / PayPal / Cash App accepted</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              <span className="font-label-md text-label-md uppercase text-on-surface-variant">Secure personal transactions</span>
            </div>
          </div>

          <ShimmerButton
            as="link"
            to={`/contact?subject=${encodeURIComponent(`I'm interested in "${item.title}" from the Art Showcase.`)}`}
            className="w-full md:w-auto"
          >
            Inquire About This Piece
          </ShimmerButton>
        </div>
      </div>
    </main>
  );
}
