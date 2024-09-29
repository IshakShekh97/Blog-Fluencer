import { DeletePostAction } from "@/actions/article-action";
import SubmitBtn from "@/components/SubmitBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const DeletePost = ({
  params,
}: {
  params: {
    siteId: string;
    articleId: string;
  };
}) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Are you sure you want to delete this post?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will permanently delete the post
            from our DataBase
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex items-center justify-between">
          <Button asChild variant={"ghost"} className="border border-primary">
            <Link href={`/dashboard/sites/${params.siteId}`}>Cancel</Link>
          </Button>
          <form action={DeletePostAction}>
            <input type="hidden" name="siteId" value={params.siteId} />
            <input type="hidden" name="articleId" value={params.articleId} />

            <SubmitBtn text="Confirm Delete" variant={"destructive"} />
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeletePost;
