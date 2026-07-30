import { useEffect, useState } from 'react';
import api from '../api/client.js';
import ShimmerButton from '../components/ShimmerButton.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { getImageStyle } from '../utils/imageCrop.js';

const VENUE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD5CCW0xZVQquXf04zb26Gbj-cIl0yqbqc2DKviVCweMpAPtZ7t-U7-TWneENLJFxiVwxMIF4_jJcDjdzXiHHdA7xomdT3pLTEFzp4ssCG83VGuEoUTRjPEWULziz88G9mrTJu7xhH19RRZhrmV0lM3b4JWqPpKrttCUQ91p471fJOOfu09LbaeoUq30zq_X1Ryb1vYlAPLxKK_EynuBVJV0OIsi-JdQCaCA43l8NyGdaG0f0aiXg48SzO5hxFrXuuxt4b6auzUkps';

function FeaturedEvent({ event }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal md:col-span-8 group relative rounded-xl overflow-hidden vellum-card gilded-edge flex flex-col md:flex-row min-h-[400px]">
      <div className="md:w-1/2 h-64 md:h-auto relative">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ ...getImageStyle(event.imageUrl), backgroundColor: '#20201c' }}
        />
      </div>
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {event.eventType && (
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-caption font-label-md uppercase tracking-wider">
              {event.eventType}
            </span>
          )}
          {event.date && (
            <span className="text-secondary flex items-center gap-1 font-label-md text-label-md">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              {event.date}
            </span>
          )}
        </div>
        <h3 className="font-headline-md text-headline-md mb-4 text-secondary">{event.title}</h3>
        {event.description && (
          <p className="text-on-surface-variant mb-6 font-body-md line-clamp-3">{event.description}</p>
        )}
        <div className="flex flex-col gap-3 mb-8">
          {event.location && (
            <div className="flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-secondary">location_on</span>
              <span className="font-label-md">{event.location}</span>
            </div>
          )}
          {event.time && (
            <div className="flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-secondary">schedule</span>
              <span className="font-label-md">{event.time}</span>
            </div>
          )}
        </div>
        <ShimmerButton className="w-full md:w-fit !px-8 !py-3">{event.ctaLabel || 'Reserve Seating'}</ShimmerButton>
      </div>
    </div>
  );
}

function SecondaryEvent({ event }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal md:col-span-4 group vellum-card rounded-xl p-6 flex flex-col transition-all hover:translate-y-[-8px]">
      {event.imageUrl && (
        <div className="rounded-lg h-48 mb-6 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={getImageStyle(event.imageUrl)}
          />
        </div>
      )}
      {event.eventType && (
        <span className="text-secondary font-label-md text-label-md mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">brush</span> {event.eventType}
        </span>
      )}
      <h4 className="font-headline-sm text-headline-sm mb-3">{event.title}</h4>
      {event.description && <p className="text-on-surface-variant text-body-md mb-6 flex-grow">{event.description}</p>}
      <div className="flex justify-between items-center pt-4 border-t border-secondary/10">
        <div className="text-caption">
          <div className="font-bold text-on-surface">{event.date}</div>
          <div className="text-on-surface-variant uppercase tracking-tighter">{event.time}</div>
        </div>
        <a className="text-secondary font-label-md uppercase tracking-wider flex items-center gap-1 hover:gap-3 transition-all cursor-pointer">
          Details <span className="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
    </div>
  );
}

function SmallEvent({ event }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal md:col-span-4 vellum-card rounded-xl p-6 flex flex-col border border-secondary/5">
      {event.eventType && <span className="text-secondary font-label-md text-label-md mb-2">{event.eventType}</span>}
      <h4 className="font-headline-sm text-headline-sm mb-3">{event.title}</h4>
      {event.description && <p className="text-on-surface-variant text-body-md mb-6">{event.description}</p>}
      <div className="mt-auto space-y-2">
        {event.location && (
          <div className="flex items-center gap-2 text-on-surface-variant text-caption">
            <span className="material-symbols-outlined text-secondary scale-75">location_on</span> {event.location}
          </div>
        )}
        {event.date && (
          <div className="flex items-center gap-2 text-on-surface-variant text-caption">
            <span className="material-symbols-outlined text-secondary scale-75">calendar_today</span> {event.date}
          </div>
        )}
      </div>
      <button
        type="button"
        className="mt-6 border border-secondary text-secondary py-2 rounded-lg font-label-md uppercase tracking-widest hover:bg-secondary/10 transition-colors"
      >
        {event.ctaLabel || 'Inquire'}
      </button>
    </div>
  );
}

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api
      .get('/api/events')
      .then((res) => setEvents(Array.isArray(res.data) ? res.data : []))
      .catch(() => setEvents([]));
  }, []);

  const featured = events.find((e) => e.featured);
  const rest = events.filter((e) => e !== featured);
  const [secondary, ...small] = rest;

  return (
    <main className="pb-24">
      <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <span className="font-label-md text-label-md text-secondary uppercase tracking-[0.3em] mb-4 block">Magic in the Making</span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight">
          Events &amp; Public <br className="hidden md:block" /> Appearances
        </h1>
        <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-surface-variant">
          Join us for spectacular public gatherings, whimsical workshops, and community events where storybooks come
          to life before your eyes.
        </p>
      </section>

      <section className="pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {featured && <FeaturedEvent event={featured} />}
          {secondary && <SecondaryEvent event={secondary} />}
          {small.map((event) => (
            <SmallEvent key={event._id} event={event} />
          ))}
          {events.length === 0 && (
            <p className="col-span-full text-center text-on-surface-variant">No upcoming events right now — check back soon.</p>
          )}
          <div className="md:col-span-4 rounded-xl bg-primary-container p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-10 rounded-full translate-x-16 -translate-y-16" />
            <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '48px' }}>
              auto_awesome
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-primary-container mb-4">Don't see your event?</h4>
            <p className="text-on-surface-variant text-body-md mb-6">
              We are constantly adding new appearances. Sign up for our newsletter to be the first to know about
              upcoming dates.
            </p>
            <a
              href="/contact"
              className="w-full bg-secondary text-on-secondary py-2 rounded-lg font-label-md uppercase tracking-widest shimmer-btn text-center"
            >
              Subscribe
            </a>
          </div>
        </div>
      </section>

      {/* Private Venue Booking (static marketing copy, not event data) */}
      <section className="py-24 bg-surface-container-low relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="order-2 md:order-1">
            <div className="rounded-2xl overflow-hidden gilded-edge aspect-[4/5] relative">
              <div className="absolute inset-0 bg-cover bg-center" style={getImageStyle(VENUE_IMAGE)} />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <span className="font-label-md text-secondary uppercase tracking-widest">Coming Soon</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">The Grand Atelier Venue</h3>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="font-label-md text-secondary uppercase tracking-[0.2em] mb-4 block">Exclusive Bookings</span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-headline-md lg:text-display-lg mb-6">Host Your Legacy</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
              Our future dedicated venue space will offer a fully immersive backdrop for your most cherished
              milestones. From curated princess parties to gothic-themed corporate retreats, the Grand Atelier is
              designed to be the physical embodiment of our artistic vision.
            </p>
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary">theater_comedy</span>
                </div>
                <div>
                  <h5 className="font-headline-sm text-on-surface mb-1">Character Concierge</h5>
                  <p className="text-on-surface-variant font-body-md">Dedicated performers assigned to your event from start to finish.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-secondary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-secondary">palette</span>
                </div>
                <div>
                  <h5 className="font-headline-sm text-on-surface mb-1">Custom Scenography</h5>
                  <p className="text-on-surface-variant font-body-md">Personalized set design and lighting to match your specific story theme.</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="bg-surface border border-secondary text-secondary px-10 py-4 rounded-full font-label-md uppercase tracking-[0.2em] hover:bg-secondary hover:text-on-secondary transition-all duration-500 flex items-center gap-4"
            >
              Join Waitlist <span className="material-symbols-outlined">verified</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 text-center px-margin-mobile">
        <div className="max-w-3xl mx-auto vellum-card p-12 rounded-3xl gilded-edge">
          <h3 className="font-headline-md text-headline-md mb-4 text-secondary italic">Ready to host your own magic?</h3>
          <p className="font-body-lg text-on-surface-variant mb-8">
            While our venue is in preparation, we are currently booking private home and external venue
            appearances. Let us bring the enchantment to you.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <ShimmerButton as="link" to="/contact">
              Book Character
            </ShimmerButton>
            <ShimmerButton as="link" to="/contact" variant="ghost" className="!border-on-surface-variant !text-on-surface shimmer-btn-none">
              View Pricing
            </ShimmerButton>
          </div>
        </div>
      </section>
    </main>
  );
}
