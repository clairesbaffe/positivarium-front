import { getCommentsByArticleId } from "@/lib/data";

import PaginationControls from "@/components/Pagination";
import CommentsList from "@/components/articles/CommentsList";

export default async function CommentsPage({
  articleId,
  currentPage,
  url,
}: {
  articleId: number;
  currentPage: number;
  url: string;
}) {
  const { comments, totalPages } = await getCommentsByArticleId(
    Number(articleId),
    currentPage
  );

  return (
    <div className="flex flex-col gap-4">
      <>
        <CommentsList comments={comments} articleId={articleId} />
        {totalPages > 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            url={url}
            listId="comments-list"
          />
        )}
      </>
    </div>
  );
}
