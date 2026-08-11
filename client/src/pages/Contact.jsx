import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/client.js';

const LOCATIONS = ['Odessa', 'Midland', 'Gardendale', 'Greenwood', 'Other (Andrews, Crane, Monahans, etc.)'];
const EVENT_TYPES = [
  'Private Family Party',
  'School Function',
  'Community Event',
  'Company Promotional Event',
  'Photographer Session',
  'Other',
];

const INPUT_CLASS =
  'w-full bg-surface-container-low border border-secondary/20 rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all';

const LABEL_CLASS = 'font-label-md text-label-md text-on-surface-variant uppercase tracking-wider';

const YES_NO = ['', 'Yes', 'No'];

const EMPTY_FORM = {
  name: '',
  companyName: '',
  contactPerson: '',
  phone: '',
  email: '',
  location: '',
  locationOther: '',
  eventDate: '',
  startTime: '',
  endTime: '',
  characters: '',
  eventType: '',
  eventTypeOther: '',
  foodServed: '',
  indoorOutdoor: '',
  soundSystem: '',
  alcohol: '',
  smoking: '',
  guestCount: '',
  performerActivities: '',
  discountEligible: '',
  additionalDetails: '',
};

function FormField({ label, children }) {
  return (
    <div className="space-y-2">
      <label className={LABEL_CLASS}>{label}</label>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const subject = searchParams.get('subject');
    if (subject) {
      setForm((f) => ({ ...f, additionalDetails: subject }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const location = form.location === 'Other (Andrews, Crane, Monahans, etc.)' ? form.locationOther : form.location;
      const eventType = form.eventType === 'Other' ? form.eventTypeOther : form.eventType;

      const message = [
        form.companyName && `Company: ${form.companyName}`,
        form.contactPerson && `Event contact person: ${form.contactPerson}`,
        location && `Location: ${location}`,
        (form.startTime || form.endTime) && `Performance time: ${form.startTime || '?'} - ${form.endTime || '?'}`,
        form.characters && `Character(s) requested: ${form.characters}`,
        form.foodServed && `Food served: ${form.foodServed}`,
        form.indoorOutdoor && `Indoor/Outdoor: ${form.indoorOutdoor}`,
        form.soundSystem && `Sound system available: ${form.soundSystem}`,
        form.alcohol && `Alcohol served: ${form.alcohol}`,
        form.smoking && `Smoking allowed: ${form.smoking}`,
        form.guestCount && `Expected guests: ${form.guestCount}`,
        form.performerActivities && `Requested performer activities: ${form.performerActivities}`,
        form.discountEligible === 'Yes' && 'School district employee / first responder family — 10% discount requested (ID to be shown).',
        form.additionalDetails && `Additional details: ${form.additionalDetails}`,
      ]
        .filter(Boolean)
        .join('\n');

      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        eventType,
        eventDate: form.eventDate,
        message,
      };
      await api.post('/api/inquiries', payload);
      setStatus({ ok: true, message: 'Message received! I will be in touch as soon as possible — typically within two or three hours.' });
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus({ ok: false, message: err?.response?.data?.message || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto pt-16">
      <div className="text-center mb-16 md:mb-24">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-secondary mb-4 italic">Ready to Start Your Story?</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Complete the form below and I will be in touch as soon as possible — typically within two or three hours.
          Or call me directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-4 space-y-8">
          <div className="vellum-card gilded-edge ambient-glow rounded-xl p-8">
            <h2 className="font-headline-sm text-headline-sm text-secondary mb-6 italic">Connect With Us</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  call
                </span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">Call Directly</p>
                  <a className="font-body-md text-body-md hover:text-secondary transition-colors" href="tel:4325286942">
                    432-528-6942
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  schedule
                </span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">Response Time</p>
                  <p className="font-body-md text-body-md">Typically within 2–3 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">Service Area</p>
                  <p className="font-body-md text-body-md">
                    Odessa · Midland · Gardendale · Greenwood
                    <br />
                    <span className="text-on-surface-variant text-caption font-caption">
                      Andrews, Crane, Monahans, etc. subject to a travel fee.
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  event
                </span>
                <div>
                  <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-1">Booking Notice</p>
                  <p className="font-body-md text-body-md">
                    Please inquire at least two weeks before your event when possible. Less notice is okay too —
                    flexibility on characters or timing helps us accommodate you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="vellum-card rounded-xl p-6">
            <p className="font-label-md text-label-md text-secondary uppercase tracking-wider mb-2">A Note on Safety</p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              All of our performers pass a background check and drug screening, and are non-smokers. Note:
              characters do not serve food or drinks.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="vellum-card gilded-edge ambient-glow rounded-xl p-8 md:p-12 space-y-10">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-secondary mb-6">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <FormField label="Full Name">
                  <input required name="name" value={form.name} onChange={handleChange} className={INPUT_CLASS} placeholder="Your name" />
                </FormField>
                <FormField label="Company Name (if applicable)">
                  <input name="companyName" value={form.companyName} onChange={handleChange} className={INPUT_CLASS} placeholder="Optional" />
                </FormField>
                <FormField label="Event Contact Person">
                  <input
                    name="contactPerson"
                    value={form.contactPerson}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                    placeholder="Who should we contact day-of?"
                  />
                </FormField>
                <FormField label="Phone Number">
                  <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className={INPUT_CLASS} placeholder="(432) 555-0100" />
                </FormField>
                <FormField label="Email Address">
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                    placeholder="example@email.com"
                  />
                </FormField>
                <FormField label="Address of Performance">
                  <select name="location" value={form.location} onChange={handleChange} className={INPUT_CLASS}>
                    <option value="">Select a location</option>
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l} className="bg-surface text-on-surface">
                        {l}
                      </option>
                    ))}
                  </select>
                </FormField>
                {form.location === 'Other (Andrews, Crane, Monahans, etc.)' && (
                  <FormField label="Please specify the city / venue">
                    <input
                      name="locationOther"
                      value={form.locationOther}
                      onChange={handleChange}
                      className={INPUT_CLASS}
                      placeholder="City or venue name"
                    />
                  </FormField>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-headline-sm text-headline-sm text-secondary mb-6">Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                <FormField label="Date of Event">
                  <input type="date" name="eventDate" value={form.eventDate} onChange={handleChange} className={INPUT_CLASS} />
                </FormField>
                <FormField label="Performers Begin">
                  <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className={INPUT_CLASS} />
                </FormField>
                <FormField label="Performers End">
                  <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className={INPUT_CLASS} />
                </FormField>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-6">
                <FormField label="Character(s) to Book">
                  <input
                    name="characters"
                    value={form.characters}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                    placeholder="e.g. Santa & Mrs. Claus, a princess, a superhero..."
                  />
                </FormField>
                <FormField label="Type of Event">
                  <select name="eventType" value={form.eventType} onChange={handleChange} className={INPUT_CLASS}>
                    <option value="">Select event type</option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-surface text-on-surface">
                        {t}
                      </option>
                    ))}
                  </select>
                </FormField>
                {form.eventType === 'Other' && (
                  <FormField label="Please explain">
                    <input
                      name="eventTypeOther"
                      value={form.eventTypeOther}
                      onChange={handleChange}
                      className={INPUT_CLASS}
                      placeholder="Tell us about your event"
                    />
                  </FormField>
                )}
                <FormField label="How Many People Are Expected?">
                  <input
                    type="number"
                    min="1"
                    name="guestCount"
                    value={form.guestCount}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                    placeholder="Approximate guest count"
                  />
                </FormField>
              </div>
            </div>

            <div>
              <h3 className="font-headline-sm text-headline-sm text-secondary mb-6">Venue &amp; Logistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                <FormField label="Will Food Be Served? (characters do not serve food or drinks)">
                  <select name="foodServed" value={form.foodServed} onChange={handleChange} className={INPUT_CLASS}>
                    {YES_NO.map((v) => (
                      <option key={v} value={v} className="bg-surface text-on-surface">
                        {v || 'Select'}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Indoor or Outdoor Event?">
                  <select name="indoorOutdoor" value={form.indoorOutdoor} onChange={handleChange} className={INPUT_CLASS}>
                    <option value="">Select</option>
                    <option value="Indoor" className="bg-surface text-on-surface">Indoor</option>
                    <option value="Outdoor" className="bg-surface text-on-surface">Outdoor</option>
                  </select>
                </FormField>
                <FormField label="Will You Have a Sound System? (if a princess is expected to sing)">
                  <select name="soundSystem" value={form.soundSystem} onChange={handleChange} className={INPUT_CLASS}>
                    {YES_NO.map((v) => (
                      <option key={v} value={v} className="bg-surface text-on-surface">
                        {v || 'Select'}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Will the Host Be Serving Alcoholic Beverages?">
                  <select name="alcohol" value={form.alcohol} onChange={handleChange} className={INPUT_CLASS}>
                    {YES_NO.map((v) => (
                      <option key={v} value={v} className="bg-surface text-on-surface">
                        {v || 'Select'}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Is Smoking Allowed on the Premises?">
                  <select name="smoking" value={form.smoking} onChange={handleChange} className={INPUT_CLASS}>
                    {YES_NO.map((v) => (
                      <option key={v} value={v} className="bg-surface text-on-surface">
                        {v || 'Select'}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="School District Employee or First Responder Family?">
                  <select name="discountEligible" value={form.discountEligible} onChange={handleChange} className={INPUT_CLASS}>
                    {YES_NO.map((v) => (
                      <option key={v} value={v} className="bg-surface text-on-surface">
                        {v || 'Select'}
                      </option>
                    ))}
                  </select>
                  <p className="font-caption text-caption text-on-surface-variant">
                    Show your ID day-of for a 10% discount.
                  </p>
                </FormField>
              </div>
            </div>

            <div>
              <h3 className="font-headline-sm text-headline-sm text-secondary mb-6">Anything Else?</h3>
              <div className="space-y-6">
                <FormField label="What would you like our performers to do while on location?">
                  <textarea
                    name="performerActivities"
                    rows={3}
                    value={form.performerActivities}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                    placeholder="For example: princesses can sing, superheroes typically don't. Everyone can read to guests, play games, or whatever you have in mind."
                  />
                </FormField>
                <FormField label="Additional Details">
                  <textarea
                    name="additionalDetails"
                    rows={3}
                    value={form.additionalDetails}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                    placeholder="Any other pertinent details we should know..."
                  />
                </FormField>
              </div>
            </div>

            <div className="flex flex-col items-center pt-4">
              <button
                type="submit"
                disabled={submitting}
                className="shimmer-btn bg-secondary text-on-secondary px-12 py-4 rounded-full font-label-md text-label-md uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all duration-300 w-full md:w-auto disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Submit Inquiry'}
              </button>
              <p className="font-caption text-caption text-on-surface-variant mt-4 text-center">
                I will be in touch as soon as possible — typically within two or three hours.
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
            <p className="font-body-md text-body-md text-on-surface-variant">
              All artists pass a background check and drug screening, and are non-smokers.
            </p>
          </div>
          <div className="vellum-card p-6 rounded-lg text-center">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
              theater_comedy
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Real Entertainers</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We sing, tell stories, read books, and play games — not just photo props.
            </p>
          </div>
          <div className="vellum-card p-6 rounded-lg text-center">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
              event_available
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">Fast Response</h4>
            <p className="font-body-md text-body-md text-on-surface-variant">
              We typically respond to inquiries within two to three hours.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
