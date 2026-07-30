import { useState } from 'react';
import api from '../api/client.js';

export default function ImageUploadField({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onChange(res.data.imageUrl);
    } catch (err) {
      setError(err?.response?.data?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="font-label-md text-label-md text-on-surface-variant block mb-2">{label}</label>
      {value && (
        <div className="w-32 h-32 bg-cover bg-center rounded-lg mb-2 border border-secondary/20" style={{ backgroundImage: `url("${value}")` }} />
      )}
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Image URL"
        className="w-full bg-surface border border-on-background/20 rounded-lg px-3 py-2 text-on-surface text-sm mb-2 focus:outline-none focus:border-secondary"
      />
      <input type="file" accept="image/*" onChange={handleFile} className="text-sm text-on-surface-variant" />
      {uploading && <p className="text-xs text-secondary mt-1">Uploading...</p>}
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  );
}
