import { useEffect, useState } from 'react';
import api from '../api/client.js';
import ImageUploadField from './ImageUploadField.jsx';

const EMPTY_SECTION = { key: '', type: 'text', heading: '', subheading: '', body: '', imageUrl: '', order: 0 };
const EMPTY_PAGE = { slug: '', title: '', published: true, sections: [{ ...EMPTY_SECTION }] };

export default function AdminPages() {
  const [pages, setPages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const load = () => {
    api
      .get('/api/pages?all=true')
      .then((res) => setPages(res.data))
      .catch(() => setPages([]));
  };

  useEffect(load, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editing._id) {
        await api.put(`/api/pages/${editing._id}`, editing);
      } else {
        await api.post('/api/pages', editing);
      }
      setEditing(null);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this page? Core pages cannot be deleted.')) return;
    try {
      await api.delete(`/api/pages/${id}`);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'This page cannot be deleted.');
    }
  };

  const updateSection = (idx, field, value) => {
    const sections = editing.sections.map((s, i) => (i === idx ? { ...s, [field]: value } : s));
    setEditing({ ...editing, sections });
  };

  const addSection = () => {
    setEditing({ ...editing, sections: [...editing.sections, { ...EMPTY_SECTION, order: editing.sections.length }] });
  };

  const removeSection = (idx) => {
    setEditing({ ...editing, sections: editing.sections.filter((_, i) => i !== idx) });
  };

  const moveSection = (idx, dir) => {
    const target = idx + dir;
    if (target < 0 || target >= editing.sections.length) return;
    const sections = [...editing.sections];
    [sections[idx], sections[target]] = [sections[target], sections[idx]];
    setEditing({ ...editing, sections: sections.map((s, i) => ({ ...s, order: i })) });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline-md text-headline-md text-on-surface">Pages</h1>
        <button
          type="button"
          onClick={() => setEditing({ ...EMPTY_PAGE, sections: [{ ...EMPTY_SECTION }] })}
          className="bg-secondary text-on-secondary px-5 py-2 rounded-full font-label-md text-label-md uppercase tracking-wide"
        >
          Create New Page
        </button>
      </div>

      {error && <p className="text-error mb-4">{error}</p>}

      {editing && (
        <form onSubmit={handleSave} className="bg-surface-container rounded-xl border border-secondary/10 p-6 mb-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-1">Slug</label>
              <input
                required
                disabled={!!editing._id}
                value={editing.slug}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                className="w-full bg-surface border border-on-background/20 rounded-lg px-3 py-2 text-on-surface disabled:opacity-50"
              />
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-1">Title</label>
              <input
                required
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="w-full bg-surface border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
              />
            </div>
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editing.published}
              onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
            />
            <span className="font-label-md text-label-md text-on-surface-variant">Published</span>
          </label>

          <div className="space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Sections</h3>
            {editing.sections.map((section, idx) => (
              <div key={idx} className="border border-secondary/10 rounded-lg p-4 space-y-3 bg-surface">
                <div className="flex justify-between items-center">
                  <p className="font-label-md text-label-md text-secondary">Section {idx + 1}</p>
                  <div className="space-x-2">
                    <button type="button" onClick={() => moveSection(idx, -1)} className="text-on-surface-variant">
                      Up
                    </button>
                    <button type="button" onClick={() => moveSection(idx, 1)} className="text-on-surface-variant">
                      Down
                    </button>
                    <button type="button" onClick={() => removeSection(idx)} className="text-error">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="font-caption text-caption text-on-surface-variant block mb-1">Key</label>
                    <input
                      value={section.key}
                      onChange={(e) => updateSection(idx, 'key', e.target.value)}
                      className="w-full bg-surface-container border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
                    />
                  </div>
                  <div>
                    <label className="font-caption text-caption text-on-surface-variant block mb-1">Type</label>
                    <select
                      value={section.type}
                      onChange={(e) => updateSection(idx, 'type', e.target.value)}
                      className="w-full bg-surface-container border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
                    >
                      <option value="hero">Hero</option>
                      <option value="text">Text</option>
                      <option value="image">Image</option>
                      <option value="richtext">Rich Text</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-caption text-caption text-on-surface-variant block mb-1">Heading</label>
                  <input
                    value={section.heading}
                    onChange={(e) => updateSection(idx, 'heading', e.target.value)}
                    className="w-full bg-surface-container border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
                  />
                </div>
                <div>
                  <label className="font-caption text-caption text-on-surface-variant block mb-1">Subheading</label>
                  <input
                    value={section.subheading}
                    onChange={(e) => updateSection(idx, 'subheading', e.target.value)}
                    className="w-full bg-surface-container border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
                  />
                </div>
                <div>
                  <label className="font-caption text-caption text-on-surface-variant block mb-1">Body</label>
                  <textarea
                    rows={4}
                    value={section.body}
                    onChange={(e) => updateSection(idx, 'body', e.target.value)}
                    className="w-full bg-surface-container border border-on-background/20 rounded-lg px-3 py-2 text-on-surface"
                  />
                </div>
                <ImageUploadField value={section.imageUrl} onChange={(url) => updateSection(idx, 'imageUrl', url)} />
              </div>
            ))}
            <button
              type="button"
              onClick={addSection}
              className="px-4 py-2 rounded-full font-label-md text-label-md uppercase border border-secondary/40 text-secondary"
            >
              Add Section
            </button>
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
              <th className="p-4">Slug</th>
              <th className="p-4">Title</th>
              <th className="p-4">Core</th>
              <th className="p-4">Published</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page._id} className="border-b border-secondary/5">
                <td className="p-4 text-on-surface">/{page.slug}</td>
                <td className="p-4 text-on-surface-variant">{page.title}</td>
                <td className="p-4">{page.isCore ? 'Yes' : 'No'}</td>
                <td className="p-4">{page.published ? 'Yes' : 'No'}</td>
                <td className="p-4 space-x-3">
                  <button type="button" onClick={() => setEditing(page)} className="text-secondary">
                    Edit
                  </button>
                  {!page.isCore && (
                    <button type="button" onClick={() => handleDelete(page._id)} className="text-error">
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-on-surface-variant">
                  No pages yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
