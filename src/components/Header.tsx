"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { House, Notebook, CircleUserRound, Menu } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { logout } from "@/lib/auth";

export default function Header() {
  const user = useUser();

  // Needs 2 different refs or desktop menu does not work properly (clicks go through)
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        isMenuOpen &&
        !desktopMenuRef.current?.contains(target) &&
        !mobileMenuRef.current?.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="relative top-0 h-16 p-3 px-5 bg-colored-background flex items-center justify-between">
      <nav className="flex items-center gap-6">
        <Link href="/">
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
        </Link>

        <div className="hidden md:flex">
          <ul className="flex gap-5">
            <li className="flex gap-1 cursor-pointer">
              <House />
              <Link href="/">Accueil</Link>
            </li>
            <li className="flex gap-1 cursor-pointer">
              <Link href="/article?cat=general">Actualités générales</Link>
            </li>
            <li className="flex gap-1 cursor-pointer">
              <Link href="/article?cat=culture">Culture</Link>
            </li>
            <li className="flex gap-1 cursor-pointer">
              <Link href="/article?cat=tech-science">
                Technologies & Sciences
              </Link>
            </li>
            <li className="flex gap-1 cursor-pointer">
              <Link href="/article?cat=divertissement-lifestyle">
                Divertissement & Lifestyle
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="md:flex gap-5">
        <ul className="hidden md:flex gap-5">
          {(!user || user?.roles.includes("ROLE_USER")) && (
            <li>
              <Link href={"#"} className="flex gap-1 cursor-pointer">
                <Notebook />
                Journal
              </Link>
            </li>
          )}
          {user ? (
            <li>
              <p className="flex gap-1">
                <CircleUserRound />
                {user.username}
              </p>
            </li>
          ) : (
            <li>
              <Link href={"/login"} className="flex gap-1 cursor-pointer">
                <CircleUserRound />
                Connexion
              </Link>
            </li>
          )}
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
        <div
          ref={desktopMenuRef}
          className="hidden md:flex flex-col top-0 absolute right-0 mt-16 w-52 bg-white dark:bg-gray-800 shadow-lg py-2 z-10"
        >
          <Link
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            À propos
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Nous contacter
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Abonnement
          </Link>
          <Link
            href="#"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Mentions légales
          </Link>
          {user && (
            <div>
              <hr className="my-2 border-gray-300 dark:border-gray-700" />
              <p
                onClick={logout}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Se déconnecter
              </p>
            </div>
          )}
        </div>
      )}

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="absolute top-0 right-0 w-2/3 mt-16 bg-white dark:bg-gray-900 z-20 shadow-md py-4 px-5 flex flex-col gap-3 md:hidden"
        >
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          <Link href="/article?cat=general" className="hover:underline">
            Actualités générales
          </Link>
          <Link href="/article?cat=culture" className="hover:underline">
            Culture
          </Link>
          <Link href="/article?cat=tech-science" className="hover:underline">
            Technologies & Sciences
          </Link>
          <Link
            href="/article?cat=divertissement-lifestyle"
            className="hover:underline"
          >
            Divertissement & Lifestyle
          </Link>
          <hr className="my-2 border-gray-300 dark:border-gray-700" />

          {(!user || user?.roles.includes("ROLE_USER")) && (
            <Link href="#" className="hover:underline">
              Journal
            </Link>
          )}
          {!user && (
            <Link href="/login" className="hover:underline">
              Connexion
            </Link>
          )}

          <Link href="#" className="hover:underline">
            À propos
          </Link>
          <Link href="#" className="hover:underline">
            Nous contacter
          </Link>
          <Link href="#" className="hover:underline">
            Abonnement
          </Link>
          <Link href="#" className="hover:underline">
            Mentions légales
          </Link>
          {user && (
            <div>
              <hr className="my-2 border-gray-300 dark:border-gray-700" />
              <p
                onClick={logout}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Se déconnecter
              </p>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
