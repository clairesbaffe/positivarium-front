import Link from "next/link";
import Button from "@/components/Button";
import Input from "@/components/Input";

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
        <Input
          placeholder="Nom d'utilisateur"
          name="username"
          data={username}
          setData={setUsername}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-lg" htmlFor="password">
          Mot de passe
        </label>
        <Input
          placeholder="Mot de passe"
          type="password"
          name="password"
          data={password}
          setData={setPassword}
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
