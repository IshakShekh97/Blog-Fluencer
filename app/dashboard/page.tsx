import React from "react";
import { GetDataInDashBoard } from "@/actions/site-action";
import Image from "next/image";
import defaultImageForSite from "@/public/DefalutImageForSite.png";
import { LayoutDashboard } from "lucide-react";
import EmptyDataState from "@/components/reusables/EmptyDataState";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import SiteImage from "@/public/DefalutImageForSite.png";

const DashBoardpage = async () => {
  const data = await GetDataInDashBoard();

  return (
    <div>
      <h1 className="text-4xl font-semibold mb-5  flex items-center gap-3 w-fit rounded-md">
        <LayoutDashboard className="size-8" />
        DashBoard
      </h1>
      <hr className="bg-primary h-[2px]" />

      <div className="">
        <h1 className="text-2xl font-semibold mb-5 mt-4">Your Sites</h1>

        {data.sites === undefined || data.sites.length === 0 ? (
          <>
            <EmptyDataState title="Site" href={`/dashboard/sites/new-site`} />
          </>
        ) : (
          <div className="flex items-center max-lg:justify-center gap-5 flex-wrap">
            {data.sites.map((site) => (
              <Card
                key={site.id}
                className="w-[300px]  bg-transparent backdrop-saturate-100 backdrop-brightness-200 backdrop-blur-[2px]"
              >
                <div className="rounded-t-md overflow-hidden w-full h-[150px]">
                  <Image
                    src={site.imageUrl ?? SiteImage}
                    alt={site.name}
                    width={1280}
                    height={720}
                    className="hover:scale-150 transition-all h-full"
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

                <CardFooter>
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

        <h1 className="text-2xl font-semibold mt-10 mb-5">Recent Articles</h1>

        {data.articles === undefined || data.articles.length === 0 ? (
          <>
            <EmptyDataState title="Article" href={`/dashboard/sites/`} />
          </>
        ) : (
          <div className="flex items-center max-lg:justify-center gap-5 flex-wrap">
            {data.articles.map((article) => (
              <Card
                key={article.id}
                className="w-[300px]  bg-transparent backdrop-saturate-100 backdrop-brightness-200 backdrop-blur-[2px]"
              >
                <div className="rounded-t-md overflow-hidden w-full h-[150px]">
                  <Image
                    src={article.image ?? SiteImage}
                    alt={article.title}
                    width={1280}
                    height={720}
                    className="hover:scale-150 transition-all"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="capitalize font-bold">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="truncate">
                    {article.smallDescription}
                  </CardDescription>
                </CardHeader>

                <CardFooter>
                  <Button asChild className="w-full">
                    <Link
                      href={`/dashboard/sites/${article.siteId}/${article.id}`}
                    >
                      <span>Edit This Article</span>
                    </Link>
                  </Button>
                </CardFooter>
                <div className="flex mb-3 px-7 justify-between text-sm text-muted-foreground">
                  <p className="">Created At :</p>
                  <p className="">
                    {new Intl.DateTimeFormat("en-IN", {
                      dateStyle: "medium",
                    }).format(article.createdAt)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardpage;
