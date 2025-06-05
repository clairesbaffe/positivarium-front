import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-colored-background text-foreground-inverted p-8 flex flex-col md:items-center gap-10 w-full">
      <nav className="flex flex-col md:flex-row gap-5 md:gap-64">
        <div className="flex flex-col gap-3">
          <p className="font-title text-2xl">Navigation rapide</p>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="/" className="cursor-pointer">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/article?cat=general" className="cursor-pointer">
                Actualités générales
              </Link>
            </li>
            <li>
              <Link href="/article?cat=culture" className="cursor-pointer">
                Culture
              </Link>
            </li>
            <li>
              <Link href="/article?cat=tech-science" className="cursor-pointer">
                Technologies & Sciences
              </Link>
            </li>
            <li>
              <Link
                href="/article?cat=divertissement-lifestyle"
                className="cursor-pointer"
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
              <Link href="/login" className="cursor-pointer">
                Connexion
              </Link>
            </li>
            <li>
              <Link href="/signup" className="cursor-pointer">
                Inscription
              </Link>
            </li>
            <li>
              <Link href="/publisher_requests" className="cursor-pointer">
                Devenir rédacteur
              </Link>
            </li>
            <li>
              <Link href="/journal" className="cursor-pointer">
                Journal
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <p>© Le Positivarium - 2025 | Tous droits réservés</p>
    </footer>
  );
}
