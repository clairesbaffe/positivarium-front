"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  useEffect(() => {
    if (searchParams.get("success") === "1") {
      setMessage({
        message: "Inscription réussie ! Vous pouvez maintenant vous connecter.",
        type: "success",
      });
    }
  }, [searchParams]);

  const handleLogin = async () => {
    try {
      if (username === "" || password === "") {
        throw new Error("INPUTS_MISSING");
      }

      // to set cookie in server
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);

        console.error(errorData?.error || "Échec de la connexion");

        const message = errorData?.error || "Échec de la connexion";

        throw new Error(message);
      }

      setMessage({ message: "", type: "success" });
      window.location.href = "/"; // full reload to update Header
    } catch (error) {
      console.error("Erreur de connexion :", error);
      if (error instanceof Error) {
        if (error.message.includes("INPUTS_MISSING")) {
          setMessage({
            message: "Veuillez compléter tous les champs.",
            type: "error",
          });
        } else if (error.message.includes("Invalid username or password")) {
          setMessage({
            message: "Nom d'utilisateur ou mot de passe invalide.",
            type: "error",
          });
        } else {
          setMessage({ message: "Une erreur est survenue.", type: "error" });
        }
      } else {
        setMessage({ message: "Erreur inattendue.", type: "error" });
      }
    }
  };

  return (
    <div className="min-h-[46vh] md:w-1/4 md:mx-auto mx-4 my-12 flex flex-col items-center gap-8">
      <h1 className="font-title text-2xl md:text-4xl">Connexion</h1>
      <LoginForm
        message={message}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    </div>
  );
}
