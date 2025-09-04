import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { name, email, background } = await request.json().catch(() => ({}));

    // Basic validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = createRouteHandlerClient(
      { cookies },
      {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      }
    );

    const ip =
      (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || null;
    const ua = request.headers.get("user-agent") || null;

    const { error } = await supabase.from("edai_signups").insert({
      name: name?.toString().trim() || null,
      email: email.toLowerCase().trim(),
      background: background?.toString().trim() || null,
      user_ip: ip,
      user_agent: ua,
    });

    if (error) {
      // Unique violation (Postgres code 23505)
      if ((error as any).code === "23505") {
        return NextResponse.json({ message: "Already signed up" }, { status: 200 });
      }
      // RLS hint
      if (error.message.toLowerCase().includes("row level")) {
        return NextResponse.json({ error: "RLS blocked insert" }, { status: 403 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}

// SQL setup for the edai_signups table
export const setupSQL = `
create table if not exists public.edai_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text,
  background text,
  user_ip inet,
  user_agent text,
  created_at timestamptz not null default now()
);
alter table public.edai_signups enable row level security;
create policy if not exists "public insert signup" on public.edai_signups for insert with check (true);
`;