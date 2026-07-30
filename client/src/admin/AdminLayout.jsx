import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const LINKS = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/characters', label: 'Characters' },
  { to: '/admin/gallery', label: 'Gallery' },
  { to: '/admin/events', label: 'Events' },
  { to: '/admin/pages', label: 'Pages' },
  { to: '/admin/inquiries', label: 'Inquiries' },
  { to: '/admin/newsletter', label: 'Newsletter' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest flex text-on-surface">
      <aside className="w-64 bg-surface-container border-r border-secondary/10 flex flex-col shrink-0">
        <div className="p-6 border-b border-secondary/10">
          <h1 className="font-headline-sm text-headline-sm text-secondary">Enchanted Arts</h1>
          <p className="font-caption text-caption text-on-surface-variant">Admin Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg font-label-md text-label-md tracking-wide transition-colors ${
                  isActive ? 'bg-secondary/20 text-secondary' : 'text-on-surface-variant hover:bg-surface-bright/40'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-secondary/10">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-bright/40 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
