import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import { FileIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SiteImage from "@/public/DefalutImageForSite.png";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { GetAllSites } from "@/actions/site-action";
import EmptyDataState from "@/components/reusables/EmptyDataState";
import React from "react";

const SitesPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }

  const sites = await GetAllSites(user.id);

  return (
    <>
      <div className="flex w-full justify-end border-b border-dashed pb-5 border-primary">
        <Button asChild>
          <Link href={"/dashboard/sites/new-site"}>
            <Plus className="mr-2 size-4" />
            Create Site
          </Link>
        </Button>
      </div>

      {sites === undefined || sites.length === 0 ? (
        <EmptyDataState title="Site" href="/dashboard/sites/new-site" />
      ) : (
        // <div className="grid grid-cols-1  gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        <div className="gap-4 lg:gap-10 flex items-center max-xl:justify-center  flex-wrap">
          {sites.map((site) => (
            <Card
              key={site.id}
              className="w-[350px] bg-transparent backdrop-saturate-100 backdrop-brightness-200 backdrop-blur-[2px]"
            >
              <div className="rounded-t-md overflow-hidden w-full h-[150px]">
                <Image
                  src={site.imageUrl ?? SiteImage}
                  alt={site.name}
                  width={1280}
                  height={720}
                  className="hover:scale-150 transition-all"
                />
              </div>
              <CardHeader>
                <CardTitle className="capitalize font-bold">
                  {site.name}
                </CardTitle>
                <CardDescription className="truncate">
                  {site.description}
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex-col">
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${site.id}`}>
                    <span>View Articles</span>
                  </Link>
                </Button>
              </CardFooter>
              <div className="flex mb-3 px-7 justify-between text-sm text-muted-foreground">
                <p className="">Created At :</p>
                <p className="">
                  {new Intl.DateTimeFormat("en-IN", {
                    dateStyle: "medium",
                  }).format(site.createdAt)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default SitesPage;
