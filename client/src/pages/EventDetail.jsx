import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/client.js';
import ShimmerButton from '../components/ShimmerButton.jsx';
import { getImageStyle } from '../utils/imageCrop.js';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setEvent(null);
    setNotFound(false);
    api
      .get(`/api/events/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setNotFound(true));
  }, [id]);

  if (notFound) {
    return (
      <main className="pt-32 pb-24 px-margin-mobile text-center">
        <h1 className="font-headline-md text-headline-md text-secondary mb-4">Event not found</h1>
        <button onClick={() => navigate('/events')} className="text-secondary underline">
          Back to Events
        </button>
      </main>
    );
  }

  if (!event) {
    return <main className="pt-32 pb-24 px-margin-mobile text-center text-on-surface-variant">Loading...</main>;
  }

  return (
    <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <Link to="/events" className="text-secondary font-label-md uppercase tracking-wider inline-flex items-center gap-2 mb-10 hover:gap-3 transition-all">
        <span className="material-symbols-outlined">arrow_back</span> Back to Events
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {event.imageUrl && (
          <div className="lg:col-span-7">
            <div className="vellum-card p-3 rounded-2xl gilded-edge">
              <div
                className="w-full aspect-[4/3] rounded-xl bg-cover bg-center"
                style={{ ...getImageStyle(event.imageUrl), backgroundColor: '#20201c' }}
              />
            </div>
          </div>
        )}

        <div className={event.imageUrl ? 'lg:col-span-5' : 'lg:col-span-12 max-w-2xl'}>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {event.eventType && (
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-caption font-label-md uppercase tracking-wider">
                {event.eventType}
              </span>
            )}
          </div>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-secondary mb-6">{event.title}</h1>
          {event.description && (
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">{event.description}</p>
          )}

          <div className="vellum-card rounded-xl p-6 mb-8 space-y-4">
            {event.date && (
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-secondary">calendar_today</span>
                <span className="font-label-md">{event.date}</span>
              </div>
            )}
            {event.time && (
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-secondary">schedule</span>
                <span className="font-label-md">{event.time}</span>
              </div>
            )}
            {event.location && (
              <div className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-secondary">location_on</span>
                <span className="font-label-md">{event.location}</span>
              </div>
            )}
          </div>

          <ShimmerButton
            as="link"
            to={`/contact?subject=${encodeURIComponent(`I'd like to know more about "${event.title}".`)}`}
            className="w-full md:w-auto"
          >
            {event.ctaLabel || 'Inquire About This Event'}
          </ShimmerButton>
        </div>
      </div>
    </main>
  );
}
