export default function Footer() {
  return (
    <footer className="bg-dark-colored-background text-foreground-inverted p-8 flex flex-col md:items-center gap-10 w-full">
      <nav className="flex flex-col md:flex-row gap-5 md:gap-64">
        <div className="flex flex-col gap-3">
          <p className="font-title text-2xl">Navigation rapide</p>
          <ul className="flex flex-col gap-1">
            <li>
              <a href="#" className="cursor-pointer">
                Accueil
              </a>
            </li>
            <li>
              <a href="#" className="cursor-pointer">
                Société
              </a>
            </li>
            <li>
              <a href="#" className="cursor-pointer">
                Environnement
              </a>
            </li>
            <li>
              <a href="#" className="cursor-pointer">
                Culture
              </a>
            </li>
            <li>
              <a href="#" className="cursor-pointer">
                Technologies & Sciences
              </a>
            </li>
          </ul>
        </div>
        <hr className="md:hidden" />
        <div className="flex flex-col gap-3">
          <p className="font-title text-2xl">Espace membre</p>
          <ul className="flex flex-col gap-1">
            <li>
              <a href="#" className="cursor-pointer">
                Connexion
              </a>
            </li>
            <li>
              <a href="#" className="cursor-pointer">
                Inscription
              </a>
            </li>
            <li>
              <a href="#" className="cursor-pointer">
                Devenir rédacteur
              </a>
            </li>
            <li>
              <a href="#" className="cursor-pointer">
                Journal
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <p>© Le Positivarium - 2025 | Tous droits réservés</p>
    </footer>
  );
}
