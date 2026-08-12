import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client.js';
import ShimmerButton from '../components/ShimmerButton.jsx';
import useScrollReveal from '../hooks/useScrollReveal.js';
import { getImageStyle } from '../utils/imageCrop.js';

const VENUE_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD5CCW0xZVQquXf04zb26Gbj-cIl0yqbqc2DKviVCweMpAPtZ7t-U7-TWneENLJFxiVwxMIF4_jJcDjdzXiHHdA7xomdT3pLTEFzp4ssCG83VGuEoUTRjPEWULziz88G9mrTJu7xhH19RRZhrmV0lM3b4JWqPpKrttCUQ91p471fJOOfu09LbaeoUq30zq_X1Ryb1vYlAPLxKK_EynuBVJV0OIsi-JdQCaCA43l8NyGdaG0f0aiXg48SzO5hxFrXuuxt4b6auzUkps';

const PAST_EVENTS = [
  { src: '/past-events/10.jpeg', caption: 'A royal reunion — Cinderella, Moana, Elsa & Belle' },
  { src: '/past-events/9.jpg', caption: 'Elsa with our owner, Lorrie' },
  { src: '/past-events/2.png', caption: 'Storytime & crafts with Moana' },
  { src: '/past-events/3.png', caption: 'Elsa & Belle read a story together' },
  { src: '/past-events/4.png', caption: 'Belle takes the mic for storytime' },
  { src: '/past-events/16.png', caption: 'Batman meets Moana' },
  { src: '/past-events/6.jpeg', caption: 'Bubble party fun with Belle & Moana' },
  { src: '/past-events/7.jpeg', caption: 'Belle & Moana lighting up the night' },
  { src: '/past-events/8.jpg', caption: 'Moana takes the mic' },
  { src: '/past-events/11.jpeg', caption: 'Elsa & Belle, story time' },
  { src: '/past-events/12.jpeg', caption: 'Moana & Cinderella coloring together' },
  { src: '/past-events/13.jpeg', caption: 'Elsa greets a young guest' },
  { src: '/past-events/14.jpeg', caption: 'Belle at a backyard celebration' },
  { src: '/past-events/15.jpeg', caption: 'A magical family portrait' },
];

const PAST_EVENT_VIDEOS = [
  { src: 'https://res.cloudinary.com/fl5vkej3/video/upload/f_auto,q_auto/v1786482877/enchanted-arts/past-events-videos/uljpogkpplsxdskdgar5.mp4', caption: 'A magical moment in motion' },
  { src: 'https://res.cloudinary.com/fl5vkej3/video/upload/f_auto,q_auto/v1786482884/enchanted-arts/past-events-videos/ljgoenkajad7g15rcvc1.mp4', caption: 'Bringing the story to life' },
];

function PastEventVideo({ video }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal vellum-card gilded-edge rounded-xl overflow-hidden mb-gutter break-inside-avoid">
      <video src={video.src} controls playsInline preload="metadata" className="w-full h-auto block" />
      <p className="font-label-md text-label-md text-secondary p-4">{video.caption}</p>
    </div>
  );
}

function PastEventPhoto({ photo }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal vellum-card gilded-edge rounded-xl overflow-hidden group relative aspect-[3/4] mb-gutter break-inside-avoid">
      <div
        className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url("${photo.src}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
        <span className="font-label-md text-label-md text-secondary">{photo.caption}</span>
      </div>
    </div>
  );
}

function FeaturedEvent({ event }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal md:col-span-8 group relative rounded-xl overflow-hidden vellum-card gilded-edge flex flex-col md:flex-row min-h-[400px]">
      <Link to={`/events/${event._id}`} className="md:w-1/2 h-64 md:h-auto relative block">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ ...getImageStyle(event.imageUrl), backgroundColor: '#20201c' }}
        />
      </Link>
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
        <Link to={`/events/${event._id}`}>
          <h3 className="font-headline-md text-headline-md mb-4 text-secondary hover:underline">{event.title}</h3>
        </Link>
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
        <ShimmerButton as="link" to={`/events/${event._id}`} className="w-full md:w-fit !px-8 !py-3">
          {event.ctaLabel || 'Reserve Seating'}
        </ShimmerButton>
      </div>
    </div>
  );
}

function SecondaryEvent({ event }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal md:col-span-4 group vellum-card rounded-xl p-6 flex flex-col transition-all hover:translate-y-[-8px]">
      {event.imageUrl && (
        <Link to={`/events/${event._id}`} className="rounded-lg h-48 mb-6 overflow-hidden block">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={getImageStyle(event.imageUrl)}
          />
        </Link>
      )}
      {event.eventType && (
        <span className="text-secondary font-label-md text-label-md mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px]">brush</span> {event.eventType}
        </span>
      )}
      <Link to={`/events/${event._id}`}>
        <h4 className="font-headline-sm text-headline-sm mb-3 hover:underline">{event.title}</h4>
      </Link>
      {event.description && <p className="text-on-surface-variant text-body-md mb-6 flex-grow">{event.description}</p>}
      <div className="flex justify-between items-center pt-4 border-t border-secondary/10">
        <div className="text-caption">
          <div className="font-bold text-on-surface">{event.date}</div>
          <div className="text-on-surface-variant uppercase tracking-tighter">{event.time}</div>
        </div>
        <Link to={`/events/${event._id}`} className="text-secondary font-label-md uppercase tracking-wider flex items-center gap-1 hover:gap-3 transition-all">
          Details <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}

function SmallEvent({ event }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className="reveal md:col-span-4 vellum-card rounded-xl p-6 flex flex-col border border-secondary/5">
      {event.eventType && <span className="text-secondary font-label-md text-label-md mb-2">{event.eventType}</span>}
      <Link to={`/events/${event._id}`}>
        <h4 className="font-headline-sm text-headline-sm mb-3 hover:underline">{event.title}</h4>
      </Link>
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
      <Link
        to={`/events/${event._id}`}
        className="mt-6 text-center border border-secondary text-secondary py-2 rounded-lg font-label-md uppercase tracking-widest hover:bg-secondary/10 transition-colors"
      >
        {event.ctaLabel || 'Inquire'}
      </Link>
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

      {/* Past Events */}
      <section className="pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="text-center mb-12">
          <span className="font-label-md text-label-md text-secondary uppercase tracking-[0.3em] mb-4 block">Moments We've Created</span>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-4">Past Events</h2>
          <p className="max-w-2xl mx-auto font-body-lg text-body-lg text-on-surface-variant">
            A look back at the parties, festivals, and celebrations we've had the pleasure of bringing to life.
          </p>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-gutter [column-fill:balance]">
          {PAST_EVENT_VIDEOS.map((video) => (
            <PastEventVideo key={video.src} video={video} />
          ))}
          {PAST_EVENTS.map((photo) => (
            <PastEventPhoto key={photo.src} photo={photo} />
          ))}
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
