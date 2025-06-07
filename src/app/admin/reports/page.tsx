import { getArticleReports, getCommentReports } from "@/lib/data";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticleReportsList from "@/components/admin/reports/ArticleReportsList";
import CommentReportsList from "@/components/admin/reports/CommentReportsList";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    tab: string;
    pageArticles: string;
    pageComments: string;
  }>;
}) {
  const currentTab = (await searchParams).tab ?? "articles";
  const currentPageArticles = parseInt(
    (await searchParams).pageArticles ?? "1",
    10
  );
  const currentPageComments = parseInt(
    (await searchParams).pageComments ?? "1",
    10
  );

  const articleReportsData = await getArticleReports(currentPageArticles);
  const articles = articleReportsData.articles;
  const articlesTotalPages = articleReportsData.totalPages;

  const commentReportsData = await getCommentReports(currentPageComments);
  const comments = commentReportsData.comments;
  const commentsTotalPages = commentReportsData.totalPages;

  return (
    <section className="flex flex-col mx-4 my-16 md:w-2/3 md:mx-auto">
      <h1 className="font-title text-2xl md:text-4xl">Signalements</h1>
      <Tabs defaultValue={currentTab}>
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="articles" className="text-md cursor-pointer">
            Articles
          </TabsTrigger>
          <TabsTrigger value="comments" className="text-md cursor-pointer">
            Commentaires
          </TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <ArticleReportsList
            currentPage={currentPageArticles}
            totalPages={articlesTotalPages}
            url={`/admin/reports?tab=articles&pageComments=${currentPageComments}`}
            reports={articles}
          />
        </TabsContent>
        <TabsContent value="comments">
          <CommentReportsList
            currentPage={currentPageComments}
            totalPages={commentsTotalPages}
            url={`/admin/reports?tab=comments&pageArticles=${currentPageArticles}`}
            reports={comments}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
