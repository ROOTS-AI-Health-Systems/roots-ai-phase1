'use client';

// Inner-page design copied from clonedwebsite/app/contact/page.tsx; styles scoped in app/clone-pages.css.

import { useState, type FormEvent } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="clone-page">
      <main id="main" className="route-shell">
      <p className="marketing-kicker">ROOTS / CONTACT</p>
      <h1>Let’s talk.</h1>
      <p className="route-lede">
        Send a message about the platform, research, or professional partnerships.
      </p>
      {submitted ? (
        <section className="success-message">
          <h2>Message received.</h2>
          <p>Thank you. We will route your enquiry to the right team.</p>
        </section>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" required />
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" required />
          <label htmlFor="message">Message</label>
          <textarea id="message" rows={5} required />
          <button className="primary-button" type="submit">
            Send message
          </button>
        </form>
      )}
    </main>
      </div>
  );
}
