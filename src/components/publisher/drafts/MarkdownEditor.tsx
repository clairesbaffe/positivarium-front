import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

export default function MarkdownEditor({
  mdContent,
  setMdContent,
}: {
  mdContent: string;
  setMdContent: (value: string) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  function handleEditorChange({ html, text }: { html: string; text: string }) {
    console.log(text);
    setMdContent(text);
  }

  return (
    <MdEditor
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      view={{ menu: true, md: true, html: !isMobile }}
      defaultValue={mdContent}
      onChange={handleEditorChange}
    />
  );
}
