import { useState } from 'react';
import api from '../api/client.js';

const EVENT_TYPES = ['Birthday Celebration', 'Corporate Gala', 'Wedding Reception', 'Community Event', 'Other Unique Celebration'];
const CHARACTER_OPTIONS = ['The Star Princess', 'Galactic Hero', 'Forest Faerie', 'Elder Wizard', 'Custom Character Request'];

const INPUT_CLASS =
  'w-full bg-surface-container-low border border-secondary/20 rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all';

const FEATURED_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCxm5o_QwzlbrgaE8P1EWxR3YW-L_L2tth9XqVLoiZiUdrcQOFdaJUZuqz6ruOKmRYnheIEAHJFfCX6mLjzByQWsklaOFIQmr0XtvGYikCILU4E6jwrvWZEuM9O11O9Z_gt6XoyFYPmXZAXGM94b-w1iP_OB0clsgOKV_TATv7K1krlo5OQEGYKlR3D1zE-D6HIFxukpPb4FpBSKJ8uSn8ncfaFN1aR4ffKDjXh6G8nRvGXAlnnxCX8bEwCZ571Vr77_y838GrmWvI';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    location: '',
    character: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        eventType: form.eventType,
        eventDate: form.eventDate,
        message: [form.character && `Character requested: ${form.character}`, form.location && `Location: ${form.location}`, form.eventTime && `Time: ${form.eventTime}`, form.message]
          .filter(Boolean)
          .join('\n'),
      };
      await api.post('/api/inquiries', payload);
      setStatus({ ok: true, message: 'Message received! Our magical coordinators typically respond within 24 hours.' });
      setForm({ name: '', email: '', phone: '', eventType: '', eventDate: '', eventTime: '', location: '', character: '', message: '' });
    } catch (err) {
      setStatus({ ok: false, message: err?.response?.data?.message || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-16">
      <div className="text-center mb-16 md:mb-24">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-secondary mb-4 italic">Begin the Story</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Whether it's a royal ballroom or a superhero academy, our performers are ready to bring your vision to
          life. Share your event details below to start the enchantment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 space-y-8">
          <div className="vellum-card gilded-edge ambient-glow rounded-xl p-8">
            <h2 className="font-headline-sm text-headline-sm text-secondary mb-6 italic">Connect With Us</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  mail
                </span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">Email</p>
                  <a className="font-body-md text-body-md hover:text-secondary transition-colors" href="mailto:magic@lorriesarts.com">
                    magic@lorriesarts.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  call
                </span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">Phone</p>
                  <a className="font-body-md text-body-md hover:text-secondary transition-colors" href="tel:+15550001234">
                    (555) 000-1234
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">Studio</p>
                  <p className="font-body-md text-body-md">
                    By Appointment Only
                    <br />
                    Los Angeles, CA
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-secondary/10">
              <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-6 text-center">
                Follow the Magic
              </p>
              <div className="flex justify-center gap-6">
                <a className="text-secondary hover:scale-125 transition-transform" href="#">
                  <span className="material-symbols-outlined">qr_code_2</span>
                </a>
                <a className="text-secondary hover:scale-125 transition-transform" href="#">
                  <span className="material-symbols-outlined">camera</span>
                </a>
                <a className="text-secondary hover:scale-125 transition-transform" href="#">
                  <span className="material-symbols-outlined">video_library</span>
                </a>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative rounded-xl overflow-hidden gilded-edge h-80">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${FEATURED_IMAGE}")` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex flex-col justify-end p-6">
              <p className="font-headline-sm text-headline-sm text-secondary italic">Every detail matters.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="vellum-card gilded-edge ambient-glow rounded-xl p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="name">
                  Full Name
                </label>
                <input id="name" name="name" required value={form.name} onChange={handleChange} className={INPUT_CLASS} placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="email">
                  Email Address
                </label>
                <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={INPUT_CLASS} placeholder="example@email.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="eventDate">
                  Event Date
                </label>
                <input id="eventDate" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} className={INPUT_CLASS} />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="eventTime">
                  Event Time
                </label>
                <input id="eventTime" name="eventTime" type="time" value={form.eventTime} onChange={handleChange} className={INPUT_CLASS} />
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="location">
                  Location
                </label>
                <input id="location" name="location" value={form.location} onChange={handleChange} className={INPUT_CLASS} placeholder="City or Venue" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="character">
                  Character Requested
                </label>
                <select id="character" name="character" value={form.character} onChange={handleChange} className={INPUT_CLASS}>
                  <option value="">Select a Character</option>
                  {CHARACTER_OPTIONS.map((c) => (
                    <option key={c} value={c} className="bg-surface text-on-surface">
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="eventType">
                  Event Type
                </label>
                <select id="eventType" name="eventType" value={form.eventType} onChange={handleChange} className={INPUT_CLASS}>
                  <option value="">Select Event Type</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-surface text-on-surface">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider" htmlFor="message">
                Magical Requirements &amp; Notes
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className={INPUT_CLASS}
                placeholder="Tell us about your event theme, special requests, or specific surprises you have in mind..."
              />
            </div>

            <div className="flex flex-col items-center pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="shimmer-btn bg-secondary text-on-secondary px-12 py-4 rounded-full font-label-md text-label-md uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all duration-300 w-full md:w-auto disabled:opacity-50"
              >
                {submitting ? 'Casting Spell...' : 'Submit Inquiry'}
              </button>
              <p className="font-caption text-caption text-on-surface-variant mt-4 text-center">
                Our magical coordinators typically respond within 24 hours.
              </p>
              {status && (
                <p className={`font-body-md text-body-md text-center mt-4 ${status.ok ? 'text-secondary' : 'text-error'}`}>
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>

      <section className="mt-24">
        <h3 className="font-headline-md text-headline-md text-secondary text-center mb-12 italic">Enchanted Expectations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="vellum-card p-6 rounded-lg text-center">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Vetted Performers</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">All artists undergo rigorous background checks and professional training.</p>
          </div>
          <div className="vellum-card p-6 rounded-lg text-center">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_fix_high
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Handcrafted Costumes</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">Every detail of our attire is artisanal, designed for high-end authenticity.</p>
          </div>
          <div className="vellum-card p-6 rounded-lg text-center">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
              event_available
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Seamless Planning</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">Our dedicated coordinators handle all logistics from start to finish.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
