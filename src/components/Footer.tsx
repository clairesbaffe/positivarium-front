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
              <Link href="#" className="cursor-pointer">
                Société
              </Link>
            </li>
            <li>
              <Link href="#" className="cursor-pointer">
                Environnement
              </Link>
            </li>
            <li>
              <Link href="#" className="cursor-pointer">
                Culture
              </Link>
            </li>
            <li>
              <Link href="#" className="cursor-pointer">
                Technologies & Sciences
              </Link>
            </li>
          </ul>
        </div>
        <hr className="md:hidden" />
        <div className="flex flex-col gap-3">
          <p className="font-title text-2xl">Espace membre</p>
          <ul className="flex flex-col gap-1">
            <li>
              <Link href="#" className="cursor-pointer">
                Connexion
              </Link>
            </li>
            <li>
              <Link href="#" className="cursor-pointer">
                Inscription
              </Link>
            </li>
            <li>
              <Link href="#" className="cursor-pointer">
                Devenir rédacteur
              </Link>
            </li>
            <li>
              <Link href="#" className="cursor-pointer">
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
