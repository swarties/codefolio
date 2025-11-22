import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const body = await req.json();
    const { access_token, refresh_token, expires_at } = body || {};

    if (!access_token) {
      return NextResponse.json({ error: "Missing access_token" }, { status: 400 });
    }

    const cookieStore = cookies();
    const secure = process.env.NODE_ENV === "production";

    // expires_at from Supabase is seconds since epoch (number) — convert to ms
    const expires = expires_at ? new Date(expires_at * 1000) : undefined;

    cookieStore.set({
      name: "sb-access-token",
      value: access_token,
      httpOnly: true,
      secure,
      path: "/",
      sameSite: "lax",
      expires,
    });

    if (refresh_token) {
      cookieStore.set({
        name: "sb-refresh-token",
        value: refresh_token,
        httpOnly: true,
        secure,
        path: "/",
        sameSite: "lax",
        // refresh tokens often have longer lifetime; keep session cookie (no expires) if not provided
        expires,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
