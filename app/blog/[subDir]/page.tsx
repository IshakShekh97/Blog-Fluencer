import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import SiteImage from "@/public/DefalutImageForSite.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import BlogPostPage from "./[slug]/page";

async function getData(subDir: string) {
  const blogData = await prisma.site.findUnique({
    where: {
      subdirectory: subDir,
    },
    select: {
      name: true,
      createdAt: true,
      posts: {
        select: {
          smallDescription: true,
          title: true,
          image: true,
          createdAt: true,
          slug: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      User: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
    },
  });

  return blogData;
}

const BlogPage = async ({ params }: { params: { subDir: string } }) => {
  const blogData = await getData(params.subDir);

  return (
    <div>
      {blogData?.posts.length === 0 ||
      blogData?.posts === null ||
      blogData?.posts === undefined ? (
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

          <div className="flex items-center h-[60vh] justify-center text-center">
            <p className="text-7xl font-bold">
              Turn Back , There Is Nothing For You !!!
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <nav className="flex items-center justify-between py-10">
            <div className="flex items-center justify-center gap-x-2 max-lg:hidden"></div>
            <div className="flex items-center gap-x-5 justify-center">
              <Image
                priority
                src={`/logo.svg`}
                alt="logo"
                width={50}
                height={50}
              />
              <h1 className="sm:text-3xl text-xl font-bold -tracking-wider">
                {blogData.name}
              </h1>
            </div>

            <div className="col-span-1 flex justify-end">
              <ThemeSwitcher />
            </div>
          </nav>

          <div className="bg-muted-foreground/20 backdrop-blur-[2px]  h-20 w-[90%] sm:w-[80%] px-5 mx-auto mb-10 rounded-md flex items-center justify-between">
            <Avatar>
              <AvatarImage src={blogData.User?.profileImage} />
              <AvatarFallback>
                <AvatarImage src="https://avatar.iran.liara.run/public" />
              </AvatarFallback>
            </Avatar>

            <h1 className="text-lg">
              {blogData.User?.firstName} {blogData.User?.lastName}
            </h1>
          </div>

          <div className="gap-4 lg:gap-10 flex items-center max-xl:justify-center  flex-wrap">
            {blogData.posts.map((post) => (
              <Card
                key={post.id}
                className="w-[350px] bg-primary/15 dark:bg-primary/5 backdrop-blur"
              >
                <div className="rounded-t-md overflow-hidden w-full h-[150px] ">
                  <Image
                    src={post.image ?? SiteImage}
                    alt={post.title}
                    width={1280}
                    height={720}
                    className="hover:scale-150 transition-all"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="capitalize font-bold">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="truncate">
                    {post.smallDescription}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="flex flex-col gap-2">
                  <Button
                    asChild
                    className="w-full bg-blue-600 text-white hover:bg-blue-500/80 hover:text-white"
                  >
                    <Link href={`/blog/${params.subDir}/${post.slug}`}>
                      <span>Read More !</span>
                    </Link>
                  </Button>
                </CardFooter>

                <div className="flex mb-3 px-7 justify-between text-sm text-muted-foreground">
                  <p className="">Created At :</p>
                  <p className="">
                    {new Intl.DateTimeFormat("en-IN", {
                      dateStyle: "medium",
                    }).format(blogData.createdAt)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
