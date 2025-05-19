"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";

export default function SignUp() {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      // check validity of form inputs, expecially for email format
      if (formRef.current && !formRef.current.checkValidity()) {
        formRef.current.reportValidity();
        return;
      }

      if (
        email === "" ||
        username === "" ||
        password === "" ||
        repeatPassword === ""
      )
        throw new Error("INPUTS_MISSING");
      else if (password !== repeatPassword)
        throw new Error("PASSWORDS_NOT_MATCHING");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);

        const message = errorData?.error || "Échec de l'inscription";

        throw new Error(message);
      }

      setMessage("");
      router.push("/login?success=1");
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      if (error instanceof Error) {
        if (error.message.includes("INPUTS_MISSING")) {
          setMessage("Veuillez compléter tous les champs.");
        } else if (error.message.includes("PASSWORDS_NOT_MATCHING")) {
          setMessage("Les mots de passe ne correspondent pas.");
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
      <h1 className="font-title text-2xl md:text-4xl">Inscription</h1>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-full flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <label className="text-lg" htmlFor="email">
            Email
          </label>
          <input
            className="border border-foreground-muted h-12 rounded-lg p-4"
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
        <div className="flex flex-col gap-2">
          <label className="text-lg" htmlFor="repeat-password">
            Répéter mot de passe
          </label>
          <input
            className="border border-foreground-muted h-12 rounded-lg p-4"
            type="password"
            name="repeat-password"
            id="repeat-password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <p>
          Déjà un compte ?{" "}
          <Link href="/login" className="underline underline-offset-3">
            Connectez-vous
          </Link>
        </p>
        {/* <input type="submit" value="Connexion" /> */}
        {message && <p className="text-red-400">{message}</p>}
        <Button
          title={"Connexion"}
          background={"bg-dark-colored-background"}
          textColor={"text-foreground-inverted"}
          icon={null}
          onClick={handleSignup}
        />
      </form>
    </main>
  );
}
