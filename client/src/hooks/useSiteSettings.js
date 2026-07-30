import { useEffect, useState } from 'react';
import api from '../api/client.js';

const FALLBACK = { logoUrl: '', heroBadgeUrl: '', heroImageUrl: '' };

let cache = null;

export default function useSiteSettings() {
  const [settings, setSettings] = useState(cache || FALLBACK);

  useEffect(() => {
    if (cache) return;
    api
      .get('/api/settings')
      .then((res) => {
        cache = res.data || FALLBACK;
        setSettings(cache);
      })
      .catch(() => {
        // gracefully keep fallback so Navbar/Home can still render their text-only fallbacks
      });
  }, []);

  return settings;
}
