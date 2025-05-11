"use client";

import { useState } from "react";
import { House, Notebook, CircleUserRound, Menu } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="h-16 p-3 px-5 bg-colored-background flex items-center justify-between">
      <nav className="flex items-center gap-6">
        <a href="#">
          <picture className="cursor-pointer">
            {/* Import different image in dark mode */}
            <source
              srcSet="/logo/favicon/monogram-dark-hq.png"
              media="(prefers-color-scheme: dark)"
            />
            <img
              src="/logo/favicon/monogram-hq.png"
              alt="Logo"
              className="h-10"
            />
          </picture>
        </a>

        <div className="hidden md:flex">
          <ul className="flex gap-5">
            <li className="flex gap-1 cursor-pointer">
              <House />
              <a href="#">Accueil</a>
            </li>
            <li className="flex gap-1 cursor-pointer">
              <a href="#">Société</a>
            </li>
            <li className="flex gap-1 cursor-pointer">
              <a href="#">Environnement</a>
            </li>
            <li className="flex gap-1 cursor-pointer">
              <a href="#">Culture</a>
            </li>
            <li className="flex gap-1 cursor-pointer">
              <a href="#">Technologies & Sciences</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="md:flex gap-5">
        <ul className="hidden md:flex gap-5">
          <li className="flex gap-1 cursor-pointer">
            <Notebook />
            Journal
          </li>
          <li className="flex gap-1 cursor-pointer">
            <CircleUserRound />
            Connexion
          </li>
        </ul>
        <button
          className="cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu />
        </button>
      </div>

      {/* DESKTOP MENU */}
      {isMenuOpen && (
        <div className="hidden md:flex flex-col top-0 absolute right-0 mt-16 w-52 h-full bg-white dark:bg-gray-800 shadow-lg py-2 z-10">
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            À propos
          </a>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Nous contacter
          </a>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Abonnement
          </a>
          <a
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Mentions légales
          </a>
        </div>
      )}

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="absolute top-0 right-0 w-2/3 mt-16 bg-white dark:bg-gray-900 z-20 shadow-md py-4 px-5 flex flex-col gap-3 md:hidden">
          <a href="#" className="hover:underline">
            Accueil
          </a>
          <a href="#" className="hover:underline">
            Société
          </a>
          <a href="#" className="hover:underline">
            Environnement
          </a>
          <a href="#" className="hover:underline">
            Culture
          </a>
          <a href="#" className="hover:underline">
            Technologies & Sciences
          </a>
          <hr className="my-2 border-gray-300 dark:border-gray-700" />
          <a href="#" className="hover:underline">
            Journal
          </a>
          <a href="#" className="hover:underline">
            Connexion
          </a>
          <a href="#" className="hover:underline">
            À propos
          </a>
          <a href="#" className="hover:underline">
            Nous contacter
          </a>
          <a href="#" className="hover:underline">
            Abonnement
          </a>
          <a href="#" className="hover:underline">
            Mentions légales
          </a>
        </div>
      )}
    </header>
  );
}
