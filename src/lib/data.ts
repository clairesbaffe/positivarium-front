export async function getCurrentUser() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) return null;

  return await res.json();
}
