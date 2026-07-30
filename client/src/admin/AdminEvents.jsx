import { useEffect, useState } from 'react';
import api from '../api/client.js';
import ImageUploadField from './ImageUploadField.jsx';

const EMPTY = {
  title: '',
  eventType: '',
  date: '',
  time: '',
  location: '',
  description: '',
  imageUrl: '',
  featured: false,
  ctaLabel: 'Inquire',
  order: 0,
  published: true,
};

export default function AdminEvents() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = () => {
    api
      .get('/api/events?all=true')
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  };

  useEffect(load, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing._id) {
        await api.put(`/api/events/${editing._id}`, editing);
      } else {
        await api.post('/api/events', editing);
      }
      setEditing(null);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      await api.delete(`/api/events/${id}`);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Delete failed.');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface">Events</h1>
        <button
          type="button"
          onClick={() => setEditing({ ...EMPTY })}
          className="bg-secondary text-on-secondary px-5 py-2 rounded-full font-label-md text-label-md uppercase tracking-wide"
        >
          Add New
        </button>
      </div>

      {error && <p className="text-error mb-4">{error}</p>}

      {editing && (
        <form onSubmit={handleSave} className="bg-surface-container rounded-xl border border-secondary/10 p-6 mb-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-1">Title</label>
              <input
                required
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full bg-surface border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
              />
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-1">Event Type</label>
              <input
                value={editing.eventType}
                onChange={(e) => setEditing({ ...editing, eventType: e.target.value })}
                className="w-full bg-surface border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-1">Date</label>
              <input
                value={editing.date}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                placeholder="e.g. July 15, 2024"
                className="w-full bg-surface border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
              />
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-1">Time</label>
              <input
                value={editing.time}
                onChange={(e) => setEditing({ ...editing, time: e.target.value })}
                placeholder="e.g. 2:00 PM — 4:30 PM"
                className="w-full bg-surface border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
              />
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-1">Location</label>
              <input
                value={editing.location}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                className="w-full bg-surface border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
              />
            </div>
          </div>
          <ImageUploadField value={editing.imageUrl} onChange={(url) => setEditing({ ...editing, imageUrl: url })} />
          <div>
            <label className="font-label-md text-label-md text-on-surface-variant block mb-1">Description</label>
            <textarea
              rows={3}
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full bg-surface border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
            />
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-1">CTA Label</label>
              <input
                value={editing.ctaLabel}
                onChange={(e) => setEditing({ ...editing, ctaLabel: e.target.value })}
                className="w-full bg-surface border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
              />
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-1">Order</label>
              <input
                type="number"
                value={editing.order}
                onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                className="w-full bg-surface border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
              />
            </div>
            <label className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
              />
              <span className="font-label-md text-label-md text-on-surface-variant">Featured</span>
            </label>
            <label className="flex items-center gap-2 mt-6">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
              />
              <span className="font-label-md text-label-md text-on-surface-variant">Published</span>
            </label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-secondary text-on-secondary px-5 py-2 rounded-full font-label-md text-label-md uppercase">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-5 py-2 rounded-full font-label-md text-label-md uppercase border border-on-surface-variant/30 text-on-surface-variant"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-surface-container rounded-xl border border-secondary/10 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-secondary/10 text-on-surface-variant font-label-md text-label-md uppercase">
              <th className="p-4">Title</th>
              <th className="p-4">Date</th>
              <th className="p-4">Featured</th>
              <th className="p-4">Published</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-secondary/5">
                <td className="p-4 text-on-surface">{item.title}</td>
                <td className="p-4 text-on-surface-variant">{item.date}</td>
                <td className="p-4">{item.featured ? 'Yes' : 'No'}</td>
                <td className="p-4">{item.published ? 'Yes' : 'No'}</td>
                <td className="p-4 space-x-3">
                  <button type="button" onClick={() => setEditing(item)} className="text-secondary">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(item._id)} className="text-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-on-surface-variant">
                  No events yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
