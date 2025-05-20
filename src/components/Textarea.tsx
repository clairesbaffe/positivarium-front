export default function Textarea({
  name,
  data,
  setData,
  placeholder,
  height = "classic",
}: {
  name: string;
  data: string;
  setData: (value: string) => void;
  placeholder?: string;
  height?: "classic" | "large";
}) {
  return (
    <textarea
      className={`align-top resize-none border border-foreground-muted w-full rounded-lg p-4 ${
        height === "large" ? "h-36" : "h-12"
      }`}
      placeholder={placeholder}
      name={name}
      id={name}
      value={data}
      onChange={(e) => setData(e.target.value)}
    />
  );
}
