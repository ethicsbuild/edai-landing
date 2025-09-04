"use client";
import { useState } from "react";

export function CouncilSignupForm() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <form
      className="space-y-5 max-w-xl mx-auto text-left"
      onSubmit={async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setMsg(null);

        const form = e.currentTarget;
        const fd = new FormData(form);
        const payload = {
          name: (fd.get("name") as string)?.trim(),
          email: (fd.get("email") as string)?.trim(),
          background: (fd.get("background") as string)?.trim(),
          honey: (fd.get("honey") as string) || "",
        };

        // Honeypot check
        if (payload.honey) {
          setMsg("Processed.");
          setLoading(false);
          form.reset();
          return;
        }

        try {
          // Use the correct API route name
          const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (res.ok) {
            // redirect on success
            window.location.href = "/thank-you";
            return;
          } else {
            setMsg(data.error || data.message || "Failed");
          }
        } catch {
          setMsg("Network error");
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/70">Name</label>
        <input
          required
          name="name"
          type="text"
          className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-edai-gold/60"
          placeholder="Your name"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/70">Email</label>
        <input
          required
          name="email"
          type="email"
          className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-edai-gold/60"
          placeholder="you@domain.com"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/70">
          Background / Why you want to join
        </label>
        <textarea
          name="background"
          rows={4}
          className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-edai-gold/60"
          placeholder="Share relevant experience or intent..."
        />
      </div>

      {/* Honeypot field (hidden from users) */}
      <input
        type="text"
        name="honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full inline-flex items-center justify-center rounded-xl px-6 py-4 text-lg font-medium bg-yellow-600 text-black hover:bg-yellow-500 transition-colors disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Oath"}
      </button>

      {msg && (
        <p className="text-sm text-white/60">
          {msg}
        </p>
      )}
    </form>
  );
}