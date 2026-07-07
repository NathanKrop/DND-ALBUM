"use client";

import { useState } from "react";
import { RiSendPlaneLine } from "react-icons/ri";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "booking", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (field: string, val: string) => setForm((f) => ({ ...f, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://formspree.io/f/xpwzgkqb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSubmitted(true);
      setForm({ name: "", email: "", type: "booking", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-heading font-extrabold text-4xl text-cream mb-2">Get in Touch</h1>
      <p className="text-muted mb-10">Bookings, collaborations, press inquiries — reach out below.</p>

      {submitted ? (
        <div className="bg-navy rounded-2xl p-10 text-center">
          <p className="text-gold font-heading font-bold text-2xl mb-2">Message Sent 🙌</p>
          <p className="text-muted text-sm">We'll get back to you as soon as possible.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 text-gold text-sm font-heading hover:underline"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-navy rounded-2xl p-6 sm:p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-heading font-semibold text-muted uppercase tracking-wider mb-1.5">
                Name
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Your name"
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm text-cream placeholder:text-muted focus:outline-none focus:border-gold/50"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-xs font-heading font-semibold text-muted uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm text-cream placeholder:text-muted focus:outline-none focus:border-gold/50"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold text-muted uppercase tracking-wider mb-1.5">
              Inquiry Type
            </label>
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              className="w-full bg-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm text-cream focus:outline-none focus:border-gold/50"
              disabled={loading}
            >
              <option value="booking">Booking / Event</option>
              <option value="collab">Collaboration</option>
              <option value="press">Press / Media</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-heading font-semibold text-muted uppercase tracking-wider mb-1.5">
              Message
            </label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder="Tell us more…"
              className="w-full bg-bg border border-white/10 rounded-lg px-4 py-2.5 text-sm text-cream placeholder:text-muted focus:outline-none focus:border-gold/50 resize-none disabled:opacity-50"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            <RiSendPlaneLine /> {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
