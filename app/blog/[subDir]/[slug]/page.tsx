import React from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RenderArticle from "@/components/RenderArticle";
import { JSONContent } from "novel";

async function getPostData(slug: string, subDir: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug,
      Site: {
        subdirectory: subDir,
      },
    },
    select: {
      articleContent: true,
      title: true,
      smallDescription: true,
      image: true,
      createdAt: true,
      slug: true,
      User: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
    },
  });

  return post;
}

const BlogPostPage = async ({
  params,
}: {
  params: { subDir: string; slug: string };
}) => {
  const postdata = await getPostData(params.slug, params.subDir);

  return (
    <>
      {postdata === null || postdata === undefined ? (
        <div>
          <div className="flex justify-between  h-14 items-center border-b px-4 py-5 lg:h-[60px] lg:px-6">
            <Link href={"/"} className="flex items-center gap-2 font-black">
              <Image
                src={"/logo.svg"}
                alt="Logo"
                width={10}
                height={10}
                className="size-8"
              />
              <h2 className="text-2xl flex items-center justify-center gap-1">
                <span>Blog</span>
                <span className="bg-gradient-to-tr from-fuchsia-500 to-amber-500 font-black text-transparent bg-clip-text ">
                  Fluencer
                </span>
              </h2>
            </Link>
            <ThemeSwitcher />
          </div>

          <div className="flex items-center h-[60vh] justify-center">
            <p className="text-3xl font-bold">
              Turn Back , There Is Nothing For You !!!
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between pt-10 pb-5 ">
            <div className="flex items-center gap-x-3 ">
              <Button
                asChild
                size={"icon"}
                variant={"outline"}
                className="mr-3"
              >
                <Link href={`/blog/${params.subDir}`}>
                  <MoveLeft className="size-4" />
                </Link>
              </Button>
              <h1 className="text-xl font-bold">Go Back</h1>
            </div>
            <ThemeSwitcher />
          </div>

          <hr className="bg-primary " />

          <div className="flex flex-col justify-center mb-10">
            <div className="m-auto w-full text-center md:w-7/12 ">
              <p className="m-auto my-5 w-10/12 text-sm font-light text-muted-foreground md:text-base">
                {new Intl.DateTimeFormat("en-IN", {
                  dateStyle: "medium",
                }).format(postdata.createdAt)}
              </p>
              <h1 className="text-3xl md:text-6xl font-black mb-5">
                {postdata.title}
              </h1>
              <p className="m-auto w-10/12 text-muted-foreground line-clamp-3">
                {postdata.smallDescription}
              </p>
            </div>
          </div>

          <div className="relative m-auto mb-10 h-80 w-full max-w-screen-lg overflow-hidden md:mb-20 md:h-[450px] md:w-5/6 rounded-md md:rounded-2xl lg:w-2/3  bg-muted ">
            <Image
              src={postdata.image}
              alt="blog image"
              width={1200}
              height={630}
              className="size-full object-cover"
              priority
            />
            <div className="absolute bottom-2 right-2 flex items-center justify-center gap-x-2 bg-transparent backdrop-blur-3xl  p-2 rounded-full text-white">
              <Image
                src={postdata.User?.profileImage as string}
                alt={postdata.User?.firstName as string}
                height={25}
                width={25}
                className="rounded-full"
                priority
              />
              <p className="text-xs pb-1">
                {postdata.User?.firstName} {postdata.User?.lastName}
              </p>
            </div>
          </div>

          <RenderArticle jsonData={postdata.articleContent as JSONContent} />
        </>
      )}
    </>
  );
};

export default BlogPostPage;
