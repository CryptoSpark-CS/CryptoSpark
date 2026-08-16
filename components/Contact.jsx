"use client";

/**
 * Contact page — Next.js 16.2 (App Router, Turbopack, React 19).
 * Sends messages via EmailJS (https://www.emailjs.com), no backend required.
 *
 * File location: app/contact/page.jsx  →  serves at /contact
 * Do NOT also keep a pages/contact.jsx or embed <ContactPage /> inside
 * app/page.tsx — pick ONE location for this route to avoid the duplicate-
 * component confusion from earlier.
 *
 * Setup:
 *   1. pnpm add @emailjs/browser
 *   2. Create a free EmailJS account → add an Email Service → add an Email Template.
 *      In the template, use variables matching the field names below:
 *        {{from_name}}, {{from_email}}, {{subject}}, {{message}}
 *   3. Add these to .env.local (safe to expose client-side — that's how EmailJS works):
 *        NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
 *        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
 *        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
 *      Restart `pnpm run dev` after adding env vars — Next only reads them at boot.
 *   4. Add the rules from contact-form.css to app/globals.css.
 */

import { useState } from "react";
import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const INITIAL_FORM = {
  from_name: "",
  from_email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg(
        "EmailJS isn't configured yet — check the env vars in the file header, then restart the dev server.",
      );
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY,
      });
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err?.text ||
          "Something went wrong sending your message. Please try again.",
      );
    }
  }

  return (
    <section className="section contact-section">
      <div className="wrap contact-wrap">
        <div className="section-tag">// Contact</div>
        <h2 className="section-title">Tell us what you&apos;re building.</h2>
        <p className="section-desc">
          Fill this in and it lands straight in our inbox — no scheduling tool,
          no gatekeeping.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="from_name">Name</label>
            <input
              id="from_name"
              name="from_name"
              type="text"
              required
              value={form.from_name}
              onChange={handleChange}
              placeholder="Jane Doe"
              disabled={status === "sending"}
            />
          </div>

          <div className="form-row">
            <label htmlFor="from_email">Email</label>
            <input
              id="from_email"
              name="from_email"
              type="email"
              required
              value={form.from_email}
              onChange={handleChange}
              placeholder="jane@company.com"
              disabled={status === "sending"}
            />
          </div>

          <div className="form-row">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={form.subject}
              onChange={handleChange}
              placeholder="Fintech platform build"
              disabled={status === "sending"}
            />
          </div>

          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={form.message}
              onChange={handleChange}
              placeholder="What are you building, and what stage is it at?"
              disabled={status === "sending"}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send message →"}
          </button>

          <div className="form-status" role="status" aria-live="polite">
            {status === "success" && (
              <p className="form-success">
                Message sent — we&apos;ll reply within one business day.
              </p>
            )}
            {status === "error" && <p className="form-error">{errorMsg}</p>}
          </div>
        </form>
      </div>
    </section>
  );
}
