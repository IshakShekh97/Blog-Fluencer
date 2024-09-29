"use server";
import prisma from "@/lib/db";
import { requireUser } from "@/lib/requireUser";
import { postSchema } from "@/lib/zodSchema";
import { parseWithZod } from "@conform-to/zod";
import { notFound, redirect } from "next/navigation";

export async function GetPosts(userId: string, siteId: string) {
  const posts = await prisma.post.findMany({
    where: {
      userId,
      siteId,
    },
    select: {
      image: true,
      title: true,
      createdAt: true,
      id: true,
      Site: {
        select: {
          subdirectory: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posts;
}

export async function CreatePostAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submittedFormArticle = parseWithZod(formData, {
    schema: postSchema,
  });

  if (submittedFormArticle.status !== "success") {
    return submittedFormArticle.reply();
  }

  const createNewPost = await prisma.post.create({
    data: {
      title: submittedFormArticle.value.title,
      smallDescription: submittedFormArticle.value.smallDescription,
      slug: submittedFormArticle.value.slug,
      articleContent: JSON.parse(submittedFormArticle.value.articleContent),
      image: submittedFormArticle.value.coverImageUrl,
      userId: user.id,
      siteId: formData.get("siteId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function GetSinglePost({
  siteId,
  postId,
}: {
  siteId: string;
  postId: string;
}) {
  const user = await requireUser();
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
      siteId,
    },
    // select: {
    //   image: true,
    //   title: true,
    //   smallDescription: true,
    //   slug: true,
    //   articleContent: true,
    //   id: true,
    // },
  });

  if (!post) {
    return notFound();
  }

  return post;
}

export async function EditPostAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const subbmitedForm = parseWithZod(formData, {
    schema: postSchema,
  });
  if (subbmitedForm.status !== "success") {
    return subbmitedForm.reply();
  }

  const editedPost = await prisma.post.update({
    where: {
      id: formData.get("articleId") as string,
      userId: user.id,
    },
    data: {
      title: subbmitedForm.value.title,
      slug: subbmitedForm.value.slug,
      smallDescription: subbmitedForm.value.smallDescription,
      articleContent: JSON.parse(subbmitedForm.value.articleContent),
      image: subbmitedForm.value.coverImageUrl,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}

export async function DeletePostAction(formData: FormData) {
  const user = await requireUser();

  const deletedPost = await prisma.post.delete({
    where: {
      userId: user.id,
      siteId: formData.get("siteId") as string,
      id: formData.get("articleId") as string,
    },
  });

  return redirect(`/dashboard/sites/${formData.get("siteId")}`);
}
