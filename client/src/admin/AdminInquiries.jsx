import { useEffect, useState } from 'react';
import api from '../api/client.js';

const STATUSES = ['new', 'contacted', 'booked', 'closed'];

export default function AdminInquiries() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  const load = () => {
    api
      .get('/api/inquiries')
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  };

  useEffect(load, []);

  const handleStatusChange = async (id, status) => {
    try {
      await api.put(`/api/inquiries/${id}`, { status });
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Update failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await api.delete(`/api/inquiries/${id}`);
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Delete failed.');
    }
  };

  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-on-surface mb-8">Inquiries</h1>
      {error && <p className="text-error mb-4">{error}</p>}
      <div className="bg-surface-container rounded-xl border border-secondary/10 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-secondary/10 text-on-surface-variant font-label-md text-label-md uppercase">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Event Type</th>
              <th className="p-4">Event Date</th>
              <th className="p-4">Message</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-secondary/5 align-top">
                <td className="p-4 text-on-surface">{item.name}</td>
                <td className="p-4 text-on-surface-variant">{item.email}</td>
                <td className="p-4 text-on-surface-variant">{item.phone}</td>
                <td className="p-4 text-on-surface-variant">{item.eventType}</td>
                <td className="p-4 text-on-surface-variant">
                  {item.eventDate ? new Date(item.eventDate).toLocaleDateString() : ''}
                </td>
                <td className="p-4 text-on-surface-variant max-w-xs">{item.message}</td>
                <td className="p-4">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                    className="bg-surface border border-on-background/20 rounded-lg px-2 py-1 text-on-surface"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-4">
                  <button type="button" onClick={() => handleDelete(item._id)} className="text-error">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-on-surface-variant">
                  No inquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
