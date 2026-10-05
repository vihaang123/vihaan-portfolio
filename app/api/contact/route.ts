import { links } from "@/lib/content";

/**
 * POST /api/contact
 *
 * Sends the message by email through Resend when these environment variables
 * are set on your host (all optional):
 *   RESEND_API_KEY      your Resend API key
 *   CONTACT_TO_EMAIL    where messages go (defaults to links.email)
 *   CONTACT_FROM_EMAIL  verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 *
 * Without them the route answers { ok: true, delivered: false }, and the
 * contact form falls back to opening the visitor's email app. Nothing is
 * stored on the server.
 */

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.replace(/\r/g, "").trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const topic = clean(body.topic, 60);
  const message = clean(body.message, 4000);

  // Bots fill the hidden field or submit instantly. Reply as if it worked.
  const elapsed = typeof body.elapsed === "number" ? body.elapsed : 9999;
  if (clean(body.company, 100) || elapsed < 1200) {
    return Response.json({ ok: true, delivered: true });
  }

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || message.length < 10) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return Response.json({ ok: false, error: "rate-limited" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || links.email;
  if (!apiKey || !to) {
    // Not an error: the form falls back to the visitor's email app.
    return Response.json({ ok: true, delivered: false });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Portfolio message from ${name}${topic ? ` (${topic})` : ""}`,
      text: `${message}\n\n${name}\n${email}`,
    }),
  });

  if (!response.ok) {
    return Response.json({ ok: false, error: "send-failed" }, { status: 502 });
  }
  return Response.json({ ok: true, delivered: true });
}
