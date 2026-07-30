import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      await api.post('/api/newsletter', { email });
      setStatus({ ok: true, message: 'Thank you for subscribing!' });
      setEmail('');
    } catch (err) {
      setStatus({ ok: false, message: err?.response?.data?.message || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-secondary/10 mt-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto">
        <div className="flex flex-col gap-4">
          <div className="font-headline-sm text-headline-sm text-secondary italic">Lorrie's Enchanted Arts</div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
            Professional character entertainment and bespoke artistic wonders for the discerning magic-seeker.
          </p>
          <div className="flex gap-4 mt-2">
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
              <span className="material-symbols-outlined">qr_code_2</span>
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
              <span className="material-symbols-outlined">camera_enhance</span>
            </a>
            <a className="text-on-surface-variant hover:text-secondary transition-colors" href="#">
              <span className="material-symbols-outlined">video_library</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h5 className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4">Navigate</h5>
            <ul className="space-y-3 font-body-md text-body-md">
              <li>
                <Link className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/50" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/50" to="/characters">
                  Characters
                </Link>
              </li>
              <li>
                <Link className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/50" to="/gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <Link className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/50" to="/art-showcase">
                  Art Showcase
                </Link>
              </li>
              <li>
                <Link className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/50" to="/events">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4">Legal</h5>
            <ul className="space-y-3 font-body-md text-body-md">
              <li>
                <a className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/50" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/50" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="text-on-surface-variant hover:text-secondary hover:underline decoration-secondary/50" href="#">
                  Booking Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h5 className="font-label-md text-label-md text-secondary uppercase tracking-widest mb-4">Newsletter</h5>
          <p className="font-caption text-caption text-on-surface-variant">
            Stay updated on new character additions and art releases.
          </p>
          <form className="flex mt-2" onSubmit={handleSubmit}>
            <input
              className="bg-surface-container p-3 rounded-l-lg border-none focus:ring-1 focus:ring-secondary w-full text-on-surface"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-secondary text-on-secondary px-4 rounded-r-lg hover:bg-secondary-container transition-colors"
              aria-label="Subscribe"
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </form>
          {status && (
            <p className={`font-caption text-caption ${status.ok ? 'text-secondary' : 'text-error'}`}>{status.message}</p>
          )}
        </div>
      </div>
      <div className="border-t border-secondary/5 py-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <p className="font-body-md text-body-md text-on-surface-variant text-center opacity-80">
          © 2024 Lorrie's Character Entertainment. All performers are fully vetted and background-checked for your
          family's safety.
        </p>
      </div>
    </footer>
  );
}
