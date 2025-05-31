"use client";

import { useState } from "react";
import ImageUploadForm from "@/components/publisher/drafts/ImageUploadForm";
import { uploadImage } from "@/lib/actions";
import { toast } from "react-toastify";

export default function CreateForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const data = await uploadImage(formData);
      setUploadedImageUrl(data);
    } catch (error) {
      console.error("Erreur pendant l'envoi de l'image :", error);
      toast.error("Erreur pendant l'envoi de l'image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <ImageUploadForm setFile={setFile} />
    </div>
  );
}
