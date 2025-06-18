import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-colored-background text-foreground-inverted p-8 flex flex-col md:items-center gap-10 w-full">
      <nav className="flex flex-col md:flex-row gap-5 md:gap-64">
        <div className="flex flex-col gap-3">
          <p className="font-title text-2xl">Navigation rapide</p>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/" className="underline-offset-2 hover:underline">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/article/category/general" className="underline-offset-2 hover:underline">
                Actualités générales
              </Link>
            </li>
            <li>
              <Link href="/article/category/culture" className="underline-offset-2 hover:underline">
                Culture
              </Link>
            </li>
            <li>
              <Link
                href="/article/category/tech-science"
                className="underline-offset-2 hover:underline"
              >
                Technologies & Sciences
              </Link>
            </li>
            <li>
              <Link
                href="/article/category/divertissement-lifestyle"
                className="underline-offset-2 hover:underline"
              >
                Divertissement & Lifestyle
              </Link>
            </li>
          </ul>
        </div>
        <hr className="md:hidden" />
        <div className="flex flex-col gap-3">
          <p className="font-title text-2xl">Espace membre</p>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/login" className="underline-offset-2 hover:underline">
                Connexion
              </Link>
            </li>
            <li>
              <Link href="/signup" className="underline-offset-2 hover:underline">
                Inscription
              </Link>
            </li>
            <li>
              <Link href="/publisher_requests" className="underline-offset-2 hover:underline">
                Devenir rédacteur
              </Link>
            </li>
            <li>
              <Link href="/journal" className="underline-offset-2 hover:underline">
                Journal
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="flex flex-col gap-3 items-center">
        <Link href="/privacy" className="underline-offset-2 hover:underline">Politique de confidentialité</Link>
        <p>© Le Positivarium - 2025 | Tous droits réservés</p>
      </div>
    </footer>
  );
}
