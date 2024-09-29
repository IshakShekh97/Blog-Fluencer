import { GetPosts } from "@/actions/article-action";
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
  FileIcon,
  MoreHorizontal,
  Plus,
  ScrollText,
  Settings2,
  SquarePen,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

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

  const posts = await GetPosts(user.id, params.siteId);

  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
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
