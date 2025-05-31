import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import TurndownService from "turndown";

const mdParser = new MarkdownIt();
const turndownService = new TurndownService();

export default function MarkdownEditor({
  htmlContent,
  setHtmlContent,
}: {
  htmlContent: string;
  setHtmlContent: (value: string) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [markdownContent, setMarkdownContent] = useState(turndownService.turndown(htmlContent));

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  function handleEditorChange({ html, text }: { html: string; text: string }) {
    setHtmlContent(html);
  }

  return (
    <MdEditor
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      view={{ menu: true, md: true, html: !isMobile }}
      defaultValue={markdownContent}
      onChange={handleEditorChange}
    />
  );
}
