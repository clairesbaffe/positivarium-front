"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Article, Category } from "@/lib/definitions";
import {
  createDraft,
  updateArticle,
  updateDraft,
  uploadImage,
} from "@/lib/actions";

import { toast } from "react-toastify";
import { Save } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import CategorySelector from "@/components/CategorySelector";
import ImageUploadForm from "@/components/publisher/drafts/ImageUploadForm";
import MarkdownEditor from "@/components/publisher/drafts/MarkdownEditor";

export default function CreateForm({
  categories,
  article,
  isPublished = false,
}: {
  categories: Category[];
  article?: Article;
  isPublished?: boolean;
}) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    article?.mainImage || null
  );

  const [title, setTitle] = useState(article?.title || "");
  const [description, setDescription] = useState(article?.description || "");
  const [content, setContent] = useState(article?.content || "");

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    article ? [article?.category] : []
  );

  const [errorMessage, setErrorMessage] = useState("");

  const handleImageUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const data = await uploadImage(formData);
      setUploadedImageUrl(data);
      return data;
    } catch (error) {
      console.error("Erreur pendant l'envoi de l'image :", error);
      toast.error("Erreur pendant l'envoi de l'image");
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error)); // fallback
      }
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      if (title === "" || content === "") throw new Error("INPUTS_MISSING");

      if (!file && !uploadedImageUrl) {
        throw new Error("INPUTS_MISSING");
      }

      let imageUrl: string;

      if (file) {
        let uploadedUrl;
        try {
          uploadedUrl = await handleImageUpload();
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error(String(error)); // fallback
          }
        }
        if (!uploadedUrl) {
          throw new Error("IMAGE_MISSING");
        }
        imageUrl = uploadedUrl;
      } else if (uploadedImageUrl) {
        imageUrl = uploadedImageUrl;
      } else {
        throw new Error("INPUTS_MISSING");
      }

      let res;
      try {
        if (isPublished && article) {
          res = await updateArticle(
            article.id,
            title,
            description,
            content,
            imageUrl,
            selectedCategories[0].id
          );

          const articleId = article ? article.id : res.id;
          setErrorMessage("");
          toast.success("Article mis à jour.");
          router.push(`/article/${articleId}`);
        } else {
          if (article) {
            res = await updateDraft(
              article.id,
              title,
              description,
              content,
              imageUrl,
              selectedCategories[0].id
            );
          } else {
            res = await createDraft(
              title,
              description,
              content,
              imageUrl,
              selectedCategories[0].id
            );
          }

          const draftId = article ? article.id : res.id;
          setErrorMessage("");
          toast.success("Brouillon enregistré.");
          router.push(`/publisher/drafts/${draftId}`);
        }
      } catch (error) {
        toast.error(String(error));
        throw new Error(String(error));
      }
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
      if (error instanceof Error) {
        if (error.message.includes("INPUTS_MISSING")) {
          setErrorMessage("Veuillez compléter tous les champs requis.");
        } else if (error.message.includes("IMAGE_MISSING")) {
          setErrorMessage(
            "Une erreur est survenue lors de l'enregistrement de l'image. Veuillez réessayer."
          );
        } else if (error.message.includes("PAYLOAD_TOO_LARGE")) {
          setErrorMessage(
            "L'image ne peut pas dépasser 1MB. Veuillez essayer avec une autre image."
          );
        } else if (error.message.includes("NOT_CONNECTED")) {
          setErrorMessage("Vous devez être connecté pour faire cette action.");
        } else {
          setErrorMessage("Une erreur est survenue.");
        }
      } else {
        setErrorMessage("Erreur inattendue.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <h1 className="font-title text-2xl md:text-4xl">
          {article
            ? isPublished
              ? "Modifier un article"
              : "Modifier un brouillon"
            : "Ajouter un brouillon"}
        </h1>
        <Button
          title="Enregistrer"
          background="bg-dark-colored-background"
          textColor="text-foreground-inverted"
          icon={<Save size={18} />}
          onClick={handleSave}
        />
      </div>
      <div className="flex flex-col gap-6">
        {errorMessage && <p className="text-red-400">{errorMessage}</p>}
        <div>
          <span className="text-red-400">*</span> Obligatoire
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-lg" htmlFor="title">
              Titre de l'article <span className="text-red-400">*</span>
            </label>
            <Input
              name="title"
              data={title}
              setData={setTitle}
              maxLength={50}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg" htmlFor="description">
              Description
            </label>
            <Input
              name="description"
              data={description}
              setData={setDescription}
              maxLength={255}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-lg">
              Ecrivez ici le contenu de l'article{" "}
              <span className="text-red-400">*</span>
            </label>
            <MarkdownEditor htmlContent={content} setHtmlContent={setContent} />
          </div>

          <ImageUploadForm
            setFile={setFile}
            defaultPreview={article?.mainImage}
            required
          />

          <div className="flex flex-col gap-2">
            <label className="text-lg">Catégorie</label>
            <CategorySelector
              categories={categories}
              defaultSelectedCategories={selectedCategories}
              onChange={setSelectedCategories}
              multiple={false}
            />
          </div>
        </div>
      </div>

      {errorMessage && <p className="text-red-400">{errorMessage}</p>}
      <Button
        title="Enregistrer"
        background="bg-dark-colored-background"
        textColor="text-foreground-inverted"
        icon={<Save size={18} />}
        onClick={handleSave}
      />
    </div>
  );
}
