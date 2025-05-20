export default function Textarea({
  name,
  data,
  setData,
  placeholder,
  height = "md",
}: {
  name: string;
  data: string;
  setData: (value: string) => void;
  placeholder?: string;
  height?: "md" | "lg";
}) {
  return (
    <textarea
      className={`align-top resize-none border border-foreground-muted w-full rounded-lg p-4 ${
        height === "lg" ? "h-36" : "h-auto"
      }`}
      placeholder={placeholder}
      name={name}
      id={name}
      value={data}
      onChange={(e) => setData(e.target.value)}
    />
  );
}
