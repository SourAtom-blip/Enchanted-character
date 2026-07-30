import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client.js';

export default function GenericPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setPage(null);
    setNotFound(false);
    api
      .get(`/api/pages/${slug}`)
      .then((res) => setPage(res.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="py-32 px-margin-mobile max-w-container-max mx-auto text-center">
        <h1 className="font-headline-md text-headline-md text-on-surface mb-4">Page Not Found</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          This page hasn't been enchanted yet.
        </p>
      </div>
    );
  }

  const sections = (page?.sections || []).slice().sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="py-24 px-margin-mobile max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <h1 className="font-headline-md text-headline-md text-secondary mb-4">{page?.title}</h1>
        <div className="h-px w-24 bg-secondary/30 mx-auto mb-6" />
      </div>
      {sections.map((s) => (
        <div key={s.key || s._id} className="vellum-card rounded-2xl p-8 md:p-12 mb-12">
          {s.heading && <h2 className="font-headline-md text-headline-md text-on-surface mb-2">{s.heading}</h2>}
          {s.subheading && <p className="font-body-lg text-body-lg text-secondary italic mb-6">{s.subheading}</p>}
          {s.imageUrl && (
            <div
              className="w-full aspect-video bg-cover bg-center rounded-xl mb-6 gilded-edge"
              style={{ backgroundImage: `url("${s.imageUrl}")` }}
            />
          )}
          {s.body && <p className="font-body-md text-body-md text-on-surface-variant whitespace-pre-line">{s.body}</p>}
        </div>
      ))}
    </div>
  );
}
