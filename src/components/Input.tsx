export default function Input({
  type = "text",
  name,
  data,
  setData,
  placeholder,
}: {
  type?: "text" | "password" | "email";
  name: string;
  data: string;
  setData: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      className={`border border-foreground-muted w-full rounded-lg p-4`}
      placeholder={placeholder}
      type={type}
      name={name}
      id={name}
      value={data}
      onChange={(e) => setData(e.target.value)}
    />
  );
}
