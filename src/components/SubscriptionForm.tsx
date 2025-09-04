"use client";
import { useState } from "react";

export function SubscriptionForm() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <form
      className="mt-6 flex flex-col sm:flex-row gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setMsg(null);
        const form = e.currentTarget;
        const emailInput = form.elements.namedItem("email") as HTMLInputElement;
        const email = emailInput.value.trim();

        try {
          const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, honey: "" }),
          });
          const data = await res.json();
            if (res.ok) {
              setMsg(data.message || "Subscribed");
              form.reset();
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
      <input
        required
        type="email"
        name="email"
        placeholder="you@domain.com"
        className="w-full rounded-xl bg-white/5 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-edai-gold/60"
      />
      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Request Access"}
      </button>
      {msg && <p className="text-sm text-white/60 sm:col-span-2">{msg}</p>}
    </form>
  );
}

create table if not exists public.edai_subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  user_ip inet,
  user_agent text,
  created_at timestamptz not null default now()
);
alter table public.edai_subscriptions enable row level security;
create policy "public insert" on public.edai_subscriptions for insert with check (true);