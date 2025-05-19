import Link from "next/link";
import Button from "@/components/Button";

export default function LoginForm({
  message,
  username,
  setUsername,
  password,
  setPassword,
  handleLogin,
}: {
  message: {
    message: string;
    type: "error" | "success";
  } | null;
  username: string;
  setUsername: (newValue: string) => void;
  password: string;
  setPassword: (newValue: string) => void;
  handleLogin: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="w-full flex flex-col gap-4"
    >
      {message && message.type === "success" && <p>{message.message}</p>}
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
      {message && message.type === "error" && (
        <p className="text-red-400">{message.message}</p>
      )}
      <Button
        title={"Connexion"}
        background={"bg-dark-colored-background"}
        textColor={"text-foreground-inverted"}
        icon={null}
        onClick={handleLogin}
      />
    </form>
  );
}
