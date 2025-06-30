const passwordRules = [
  {
    label: "Au moins 10 caractères",
    validate: (pw: string) => pw.length >= 10,
  },
  {
    label: "Contient une majuscule",
    validate: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: "Contient une minuscule",
    validate: (pw: string) => /[a-z]/.test(pw),
  },
  {
    label: "Contient un chiffre",
    validate: (pw: string) => /\d/.test(pw),
  },
  {
    label: "Contient un caractère spécial",
    validate: (pw: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pw),
  },
];

export default function PasswordChecker({ password }: { password: string }) {
  return (
    <div className="m-4">
      <ul className="space-y-2">
        {passwordRules.map(({ label, validate }, idx) => {
          const isValid = validate(password);
          return (
            <li key={idx} className="flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  isValid ? "bg-background-success" : "bg-background-danger"
                }`}
              ></span>
              <span className={isValid ? "text-foreground-success" : "text-foreground-danger"}>
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
