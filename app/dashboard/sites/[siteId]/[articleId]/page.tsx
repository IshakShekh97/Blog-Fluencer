import { GetSinglePost } from "@/actions/article-action";
import { EditArticleForm } from "@/app/dashboard/_components/form/EditArticleForm";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const ArticleIdPage = async ({
  params: { siteId, articleId },
}: {
  params: { siteId: string; articleId: string };
}) => {
  const postData = await GetSinglePost({ siteId, postId: articleId });

  return (
    <div>
      <div className="flex items-center mb-5">
        <Button asChild size={"icon"} variant={"outline"} className="mr-3">
          <Link href={`/dashboard/sites/${siteId}`}>
            <MoveLeft className="size-4" />
          </Link>
        </Button>

        <h1 className="text-2xl font-extrabold">Edit Article</h1>
      </div>

      <EditArticleForm data={postData} siteId={siteId} />
    </div>
  );
};

export default ArticleIdPage;
