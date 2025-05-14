"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      if (username === "" || password === "") {
        throw new Error("INPUTS_MISSING");
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // automatically saves cookie sent via SetCookie
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);

        const message = errorData?.error || "Échec de la connexion";

        throw new Error(message);
      }

    //   await res.json();
      setMessage("");
      router.push("/");
    } catch (error) {
      console.error("Erreur de connexion :", error);
      if (error instanceof Error) {
        if (error.message.includes("INPUTS_MISSING")) {
          setMessage("Veuillez compléter tous les champs.");
        } else if (error.message.includes("Invalid username or password")) {
          setMessage("Nom d'utilisateur ou mot de passe invalide.");
        } else {
          setMessage("Une erreur est survenue.");
        }
      } else {
        setMessage("Erreur inattendue.");
      }
    }
  };

  return (
    <main className="min-h-[46vh] md:w-1/4 md:mx-auto mx-4 my-12 flex flex-col items-center gap-8">
      <h1 className="font-title text-2xl md:text-4xl">Connexion</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label className="text-lg" htmlFor="username">
            Nom d'utilisateur
          </label>
          <input
            className="border border-foreground-muted h-12 rounded-lg p-4"
            placeholder="Nom d'utilisateur"
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="border border-foreground-muted h-12 rounded-lg p-4"
            placeholder="Mot de passe"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>
          Pas encore de compte ?{" "}
          <Link href="/signup" className="underline underline-offset-3">
            Inscrivez-vous
          </Link>
        </p>
        {/* <input type="submit" value="Connexion" /> */}
        {message && <p className="text-red-400">{message}</p>}
        <Button
          title={"Connexion"}
          background={"bg-dark-colored-background"}
          textColor={"text-foreground-inverted"}
          icon={null}
          onClick={handleLogin}
        />
      </form>
    </main>
  );
}
