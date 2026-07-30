import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ShimmerButton from './ShimmerButton.jsx';
import useSiteSettings from '../hooks/useSiteSettings.js';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/characters', label: 'Characters' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/art-showcase', label: 'Art Showcase' },
  { to: '/events', label: 'Events' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { logoUrl } = useSiteSettings();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-secondary/20 shadow-[0_0_15px_rgba(233,195,73,0.1)]">
      <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <NavLink to="/" className="flex items-center h-12 w-auto overflow-hidden">
          {logoUrl ? (
            <img src={logoUrl} alt="Lorrie's Enchanted Arts Logo" className="h-full w-auto object-contain" />
          ) : (
            <span className="font-headline-sm text-headline-sm text-secondary italic">Lorrie's Enchanted Arts</span>
          )}
        </NavLink>

        <ul className="hidden md:flex space-x-8">
          {LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-label-md text-label-md uppercase tracking-wider transition-colors pb-1 ${
                    isActive ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <ShimmerButton as="link" to="/contact" className="!px-6 !py-2">
            Magical Inquiry
          </ShimmerButton>
        </div>

        <button
          type="button"
          className="md:hidden text-on-surface"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-surface border-t border-secondary/10 px-margin-mobile py-4">
          <ul className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-label-md text-label-md uppercase tracking-wider ${
                      isActive ? 'text-secondary' : 'text-on-surface-variant'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <ShimmerButton as="link" to="/contact" onClick={() => setOpen(false)} className="!px-6 !py-2 w-full">
              Magical Inquiry
            </ShimmerButton>
          </div>
        </div>
      )}
    </header>
  );
}
