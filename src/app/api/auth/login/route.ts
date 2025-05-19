import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const error = errorData?.error || "Erreur inconnue";
    return new Response(JSON.stringify({ error }), { status: 401 });
  }

  const data = await res.json();

  (await cookies()).set({
    name: "access_token",
    value: data.token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60, // 1h
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
