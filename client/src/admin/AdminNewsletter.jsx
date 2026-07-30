import { useEffect, useState } from 'react';
import api from '../api/client.js';

export default function AdminNewsletter() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get('/api/newsletter')
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  }, []);

  return (
    <div>
      <h1 className="font-headline-md text-headline-md text-on-surface mb-8">Newsletter Subscribers</h1>
      <div className="bg-surface-container rounded-xl border border-secondary/10 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-secondary/10 text-on-surface-variant font-label-md text-label-md uppercase">
              <th className="p-4">Email</th>
              <th className="p-4">Subscribed On</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-secondary/5">
                <td className="p-4 text-on-surface">{item.email}</td>
                <td className="p-4 text-on-surface-variant">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={2} className="p-4 text-center text-on-surface-variant">
                  No subscribers yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
