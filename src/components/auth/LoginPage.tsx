"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage({ next }: { next: string }) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  const handleLogin = async () => {
    try {
      if (username === "" || password === "") throw new Error("INPUTS_MISSING");

      // set cookie in server
      await login(username, password);

      setMessage({ message: "", type: "success" });

      router.refresh(); // full reload to update Header
      router.push(next || "/");
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
    <LoginForm
      message={message}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );
}
