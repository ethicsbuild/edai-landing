// src/app/api/subscribe/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs"; // ensure Node (not Edge)

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Create a server-only Supabase client using the Service Role key
const supabase = createClient(
  process.env.SUPABASE_URL!,              // NOT NEXT_PUBLIC
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // powerful, server-only
);

export async function POST(request: Request) {
  try {
    const { name, email, background } = await request.json().catch(() => ({}));

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const ip =
      (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || null;
    const ua = request.headers.get("user-agent") || null;

    // Upsert on email so duplicates return 200 without errors
    const { error } = await supabase
      .from("edai_signups")
      .upsert(
        [
          {
            email: email.toLowerCase().trim(),
            name: name?.toString().trim() || null,
            background: background?.toString().trim() || null,
            user_ip: ip,
            user_agent: ua,
          },
        ],
        { onConflict: "email" }
      );

    if (error) {
      // Postgres unique violation code: 23505 (shouldn't happen with upsert, but safe guard)
      if ((error as any).code === "23505") {
        return NextResponse.json({ message: "Already signed up" }, { status: 200 });
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