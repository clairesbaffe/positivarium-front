import { sanitizeArticleHtml } from "@/lib/utils";
import * as marqued from "marked";

export default async function SanitizedContent({
  content,
}: {
  content: string;
}) {
  const htmlContent = await marqued.parse(content);
  const cleanHtml = sanitizeArticleHtml(htmlContent);

  return (
    <div className="prose dark:prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: cleanHtml }}></div>
    </div>
  );
}
