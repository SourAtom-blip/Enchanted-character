import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ShimmerButton from './ShimmerButton.jsx';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/characters', label: 'Characters' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/art-showcase', label: 'Art Showcase' },
  { to: '/events', label: 'Events' },
  { to: '/top-performers', label: 'Top Performers' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-secondary/20 shadow-[0_0_15px_rgba(233,195,73,0.1)]">
      <nav className="flex flex-nowrap justify-between items-center gap-4 px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <NavLink to="/" className="flex items-center h-12 w-auto overflow-hidden shrink-0">
          <span className="font-headline-sm text-[20px] leading-none text-secondary italic whitespace-nowrap">Lorrie's Enchanted Arts</span>
        </NavLink>

        <ul className="hidden xl:flex items-center gap-3 2xl:gap-5 shrink-0">
          {LINKS.map((link) => (
            <li key={link.to} className="whitespace-nowrap">
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `font-label-md text-[12px] 2xl:text-label-md uppercase tracking-wide transition-colors pb-1 ${
                    isActive ? 'text-secondary border-b-2 border-secondary' : 'text-on-surface-variant hover:text-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden xl:block shrink-0">
          <ShimmerButton as="link" to="/contact" className="!px-4 !py-2 !text-[12px] 2xl:!text-label-md whitespace-nowrap">
            Magical Inquiry
          </ShimmerButton>
        </div>

        <button
          type="button"
          className="xl:hidden text-on-surface shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
        </button>
      </nav>

      {open && (
        <div className="xl:hidden bg-surface border-t border-secondary/10 px-margin-mobile py-4">
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
