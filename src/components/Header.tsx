"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  House,
  Notebook,
  CircleUserRound,
  Menu,
  Flag,
  PenLine,
  SquarePen,
} from "lucide-react";
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
          <ul className="flex gap-6">
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
        <ul className="hidden md:flex gap-10">
          <div className="flex gap-6">
            {user?.roles.includes("ROLE_ADMIN") && (
              <li>
                <Link
                  href={"/admin/users"}
                  className="flex gap-1 cursor-pointer"
                >
                  <Notebook />
                  Liste des utilisateurs
                </Link>
              </li>
            )}
            {user?.roles.includes("ROLE_ADMIN") && (
              <li>
                <Link
                  href={"/admin/reports"}
                  className="flex gap-1 cursor-pointer"
                >
                  <Flag />
                  Signalements
                </Link>
              </li>
            )}
            {user?.roles.includes("ROLE_ADMIN") && (
              <li>
                <Link
                  href={"/admin/publisher_requests"}
                  className="flex gap-1 cursor-pointer"
                >
                  <PenLine />
                  Demandes rédacteur
                </Link>
              </li>
            )}
            {user?.roles.includes("ROLE_PUBLISHER") && (
              <li>
                <Link
                  href={"/publisher/drafts"}
                  className="flex gap-1 cursor-pointer"
                >
                  <SquarePen />
                  Mes brouillons
                </Link>
              </li>
            )}
            {(!user || user?.roles.includes("ROLE_USER")) && (
              <li>
                <Link href={"/journal"} className="flex gap-1 cursor-pointer">
                  <Notebook />
                  Journal
                </Link>
              </li>
            )}
          </div>
          {user ? (
            <li>
              <Link href={"/profile"} className="flex gap-1 cursor-pointer">
                <CircleUserRound />
                {user.username}
              </Link>
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
          className="hidden md:flex flex-col top-0 absolute right-0 mt-16 w-60 bg-white dark:bg-gray-800 shadow-lg py-2 z-10"
        >
          {user && (
            <div>
              <Link
                href={"/article/liked"}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Articles likés
              </Link>
              <Link
                href={"/article/commented"}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Articles commentés
              </Link>
              {user?.roles.includes("ROLE_USER") && (
                <div>
                  <Link
                    href={"/article/followed"}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Articles des rédacteurs suivis
                  </Link>
                  <Link
                    href={"/user/followed"}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Rédacteurs suivis
                  </Link>
                </div>
              )}
            </div>
          )}
          {user?.roles.includes("ROLE_USER") && (
            <div>
              <hr className="my-2 border-gray-300 dark:border-gray-700" />
              <Link
                href={"/user/publisher_requests"}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Devenir rédacteur
              </Link>
            </div>
          )}
          {user && <hr className="my-2 border-gray-300 dark:border-gray-700" />}
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
          <Link href="/">Accueil</Link>
          <Link href="/article?cat=general">Actualités générales</Link>
          <Link href="/article?cat=culture">Culture</Link>
          <Link href="/article?cat=tech-science">Technologies & Sciences</Link>
          <Link href="/article?cat=divertissement-lifestyle">
            Divertissement & Lifestyle
          </Link>
          <hr className="my-2 border-gray-300 dark:border-gray-700" />

          <Link href="/article/liked">Articles likés</Link>
          <Link href="/article/liked">Articles commentés</Link>
          {user?.roles.includes("ROLE_USER") && (
            <div className="flex flex-col gap-3">
              <Link href="/article/followed">
                Articles des rédacteurs suivis
              </Link>
              <Link href="/user/followed">Rédacteurs suivis</Link>
            </div>
          )}

          {(!user || user?.roles.includes("ROLE_USER")) && (
            <div className="flex flex-col gap-3">
              <hr className="my-2 border-gray-300 dark:border-gray-700" />
              <Link href="/journal">Journal</Link>
              <Link href={"/user/publisher_requests"}>Devenir rédacteur</Link>
            </div>
          )}

          {user?.roles.includes("ROLE_PUBLISHER") && (
            <div className="flex flex-col gap-3">
              <hr className="my-2 border-gray-300 dark:border-gray-700" />
              <Link href="/publisher/drafts">Mes brouillons</Link>
            </div>
          )}

          {user?.roles.includes("ROLE_ADMIN") && (
            <div className="flex flex-col gap-3">
              <hr className="my-2 border-gray-300 dark:border-gray-700" />
              <Link href={"/admin/users"}>Liste des utilisateurs</Link>
              <Link href={"/admin/reports"}>Signalements</Link>
              <Link href={"/admin/publisher_requests"}>Demandes rédacteur</Link>
            </div>
          )}

          {user && <hr className="my-2 border-gray-300 dark:border-gray-700" />}

          <Link href="#">À propos</Link>
          <Link href="#">Nous contacter</Link>
          <Link href="#">Abonnement</Link>
          <Link href="#">Mentions légales</Link>
          {user && (
            <div>
              <hr className="my-2 border-gray-300 dark:border-gray-700" />
              <p onClick={logout} className="block cursor-pointer">
                Se déconnecter
              </p>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
