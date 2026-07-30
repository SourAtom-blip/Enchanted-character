import { useEffect, useState } from 'react';
import api from '../api/client.js';

function StatCard({ label, value }) {
  return (
    <div className="bg-surface-container rounded-xl border border-secondary/10 p-6">
      <p className="font-caption text-caption text-on-surface-variant uppercase tracking-widest mb-2">{label}</p>
      <p className="font-headline-md text-headline-md text-secondary">{value}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ characters: 0, gallery: 0, pages: 0, inquiries: 0, newsletter: 0 });

  useEffect(() => {
    Promise.allSettled([
      api.get('/api/characters?all=true'),
      api.get('/api/gallery?all=true'),
      api.get('/api/pages?all=true'),
      api.get('/api/inquiries'),
      api.get('/api/newsletter'),
    ]).then(([chars, gallery, pages, inquiries, newsletter]) => {
      setStats({
        characters: chars.status === 'fulfilled' ? chars.value.data.length : 0,
        gallery: gallery.status === 'fulfilled' ? gallery.value.data.length : 0,
        pages: pages.status === 'fulfilled' ? pages.value.data.length : 0,
        inquiries: inquiries.status === 'fulfilled' ? inquiries.value.data.length : 0,
        newsletter: newsletter.status === 'fulfilled' ? newsletter.value.data.length : 0,
      });
    });
  }, []);

  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-on-surface mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Characters" value={stats.characters} />
        <StatCard label="Gallery Items" value={stats.gallery} />
        <StatCard label="Pages" value={stats.pages} />
        <StatCard label="Inquiries" value={stats.inquiries} />
        <StatCard label="Subscribers" value={stats.newsletter} />
      </div>
    </div>
  );
}
