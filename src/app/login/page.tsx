import LoginPage from "@/components/auth/LoginPage";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ success: string; next: string }>;
}) {
  const message =
    (await searchParams).success === "1"
      ? "Inscription réussie ! Vous pouvez maintenant vous connecter."
      : "";
  const next = (await searchParams).next;

  return (
    <div className="min-h-[46vh] md:w-1/4 md:mx-auto mx-4 my-12 flex flex-col items-center gap-8">
      <h1 className="font-title text-2xl md:text-4xl">Connexion</h1>
      <LoginPage next={next} />
    </div>
  );
}
