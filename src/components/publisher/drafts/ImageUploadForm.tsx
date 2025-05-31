import { useState } from "react";

export default function ImageUploadForm({
  setFile,
}: {
  setFile: (file: File | null) => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <div className="max-w-2/3 flex gap-4">
      <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-foreground-muted rounded-2xl cursor-pointer hover:border-dark-colored-background transition duration-300">
        <span className="text-gray-500 font-medium mb-2">
          Choisissez une image
        </span>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] || null;
            setFile(selectedFile);
            setPreviewUrl(
              selectedFile ? URL.createObjectURL(selectedFile) : null
            );
          }}
        />
        <span className="px-4 py-2 bg-colored-background rounded-lg shadow hover:bg-dark-colored-background hover:text-foreground-inverted transition duration-300">
          Parcourir
        </span>
      </label>

      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="max-h-40 max-w-80 my-2"
        />
      )}
    </div>
  );
}
