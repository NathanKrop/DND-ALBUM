"use client";

import { useState } from "react";
import { RiBellLine } from "react-icons/ri";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://formspree.io/f/xpwzgkqb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "New subscriber — breezydallas" }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-navy rounded-2xl px-6 py-8 text-center max-w-lg mx-auto">
      <RiBellLine className="text-gold text-3xl mx-auto mb-3" />
      <h3 className="font-heading font-bold text-cream text-xl mb-1">Stay in the Loop</h3>
      <p className="text-muted text-sm mb-5">Get notified when new music drops.</p>

      {submitted ? (
        <p className="text-gold font-heading font-semibold">You&apos;re on the list 🙌</p>
      ) : (
        <>
          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-bg border border-white/10 rounded-full px-4 py-2.5 text-sm text-cream placeholder:text-muted focus:outline-none focus:border-gold/50"
              disabled={loading}
            />
            <button type="submit" className="btn-gold whitespace-nowrap" disabled={loading}>
              {loading ? "…" : "Notify Me"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
