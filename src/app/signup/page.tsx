"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/auth";
import { isPasswordComplex } from "@/lib/utils";

import Link from "next/link";
import { toast } from "react-toastify";
import Button from "@/components/Button";
import PasswordChecker from "@/components/auth/PasswordChecker";

export default function SignUp() {
  const router = useRouter();

  const formRef = useRef<HTMLFormElement>(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      if (username === "" || password === "" || repeatPassword === "")
        throw new Error("INPUTS_MISSING");
      else if (!isPasswordComplex(password))
        throw new Error("PASSWORD_NOT_COMPLEX_ENOUGH");
      else if (password !== repeatPassword)
        throw new Error("PASSWORDS_NOT_MATCHING");

      await register(username, password);

      setMessage("");
      toast.success(
        "Votre inscription a été prise en compte, vous pouvez maintenant vous connecter.",
      );
      router.push("/login");
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      if (error instanceof Error) {
        if (error.message.includes("INPUTS_MISSING")) {
          setMessage("Veuillez compléter tous les champs.");
        } else if (error.message.includes("PASSWORD_NOT_COMPLEX_ENOUGH")) {
          setMessage("Le mot de passe n'est pas assez complexe.");
        } else if (error.message.includes("PASSWORDS_NOT_MATCHING")) {
          setMessage("Les mots de passe ne correspondent pas.");
        } else if (error.message.includes("Username is already taken")) {
          setMessage(
            "Ce username est déjà pris, veuillez en choisir un autre.",
          );
        } else if (error.message.includes("Not long enough")) {
          setMessage("Votre mot de passe est trop court.");
        } else if (error.message.includes("Contains common password")) {
          setMessage("Votre mot de passe est trop commun.");
        } else if (error.message.includes("Not complex enough")) {
          setMessage(
            "Votre mot de passe ne contient pas les caractères requis.",
          );
        } else {
          setMessage("Une erreur est survenue.");
        }
      } else {
        setMessage("Erreur inattendue.");
      }
    }
  };

  return (
    <div className="min-h-[46vh] md:w-1/4 md:mx-auto mx-4 my-12 flex flex-col items-center gap-8">
      <h1 className="font-title text-2xl md:text-4xl">Inscription</h1>
      <form
        ref={formRef}
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
          <PasswordChecker password={password} />
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
    </div>
  );
}
