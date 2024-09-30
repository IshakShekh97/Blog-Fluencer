import { GetPosts } from "@/actions/article-action";
import { GetSiteImageInfo } from "@/actions/site-action";
import EmptyDataState from "@/components/reusables/EmptyDataState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  EllipsisVertical,
  FileIcon,
  MoreHorizontal,
  MoveLeft,
  Plus,
  ScrollText,
  Settings2,
  SquarePen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const SiteIdPage = async ({
  params,
}: {
  params: {
    siteId: string;
  };
}) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) return redirect("/api/auth/login");

  const siteImage = await GetSiteImageInfo(params.siteId);
  const posts = await GetPosts(user.id, params.siteId);

  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button asChild size={"icon"} variant={"outline"} className="mr-3">
          <Link href={`/dashboard/sites`}>
            <MoveLeft className="size-4" />
          </Link>
        </Button>

        <h1 className="text-2xl font-extrabold">Site Page</h1>
      </div>

      <div className="hidden sm:flex w-full justify-end gap-x-4">
        {posts.length === 0 ? (
          <>
            <Button variant={"secondary"}>Create Article To View Blogs</Button>
          </>
        ) : (
          <Button asChild variant={"secondary"}>
            <Link href={`/blog/${posts[0].Site?.subdirectory}`}>
              <SquarePen className="size-4 mr-2" />
              View Blog
            </Link>
          </Button>
        )}

        <Button asChild variant={"secondary"}>
          <Link href={`/dashboard/sites/${params.siteId}/settings`}>
            <Settings2 className="size-4 mr-2" /> Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${params.siteId}/new-article`}>
            <ScrollText className="size-4 mr-2" />
            Create Article
          </Link>
        </Button>
      </div>
      <div className="flex sm:hidden w-full justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={"secondary"}
              className="w-full  items-center justify-start"
            >
              Site Options
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {posts.length === 0 ? (
                <>
                  <Button className="w-full" variant={"secondary"}>
                    Create Article To View Blogs
                  </Button>
                </>
              ) : (
                <Button asChild className="w-full" variant={"secondary"}>
                  <Link href={`/blog/${posts[0].Site?.subdirectory}`}>
                    <SquarePen className="size-4 mr-2" />
                    View Blog
                  </Link>
                </Button>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button className="w-full" asChild variant={"secondary"}>
                <Link href={`/dashboard/sites/${params.siteId}/settings`}>
                  <Settings2 className="size-4 mr-2" /> Settings
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button asChild className="w-full">
                <Link href={`/dashboard/sites/${params.siteId}/new-article`}>
                  <ScrollText className="size-4 mr-2" />
                  Create Article
                </Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {siteImage?.imageUrl && (
        <div className="relative bg-muted w-full h-[300px] rounded-lg overflow-hidden ">
          <Image
            src={siteImage.imageUrl as string}
            alt="post image"
            layout="fill"
            className="w-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-white text-black px-6 py-[.5px] rounded-full ">
            Site Image
          </div>
        </div>
      )}

      {posts === undefined || posts.length === 0 ? (
        <EmptyDataState
          href={`/dashboard/sites/${params.siteId}/new-article`}
          title="Article"
        />
      ) : (
        <div className="">
          <Card className="">
            <CardHeader>
              <CardTitle>Articles</CardTitle>
              <CardDescription>
                Manage your Articles in Simple and Intiutive way
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Table className="rounded-md">
                <TableHeader>
                  <TableRow className="rounded-md">
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={80}
                          height={80}
                          className="aspect-video rounded-lg object-cover"
                        />
                      </TableCell>
                      <TableCell className="capitalize">{post.title}</TableCell>
                      <TableCell>
                        <Badge>Published</Badge>
                      </TableCell>
                      <TableCell>
                        {new Intl.DateTimeFormat("en-IN", {
                          dateStyle: "medium",
                        }).format(post.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant={"outline"} size={"icon"}>
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/sites/${params.siteId}/${post.id}`}
                              >
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                className="w-full h-full bg-rose-500 text-white"
                                href={`/dashboard/sites/${params.siteId}/${post.id}/delete`}
                              >
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default SiteIdPage;
