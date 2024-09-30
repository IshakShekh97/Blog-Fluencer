"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { SiteCreationSchema, siteSchema } from "@/lib/zodSchema";
import prisma from "@/lib/db";
import { requireUser } from "@/lib/requireUser";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

export async function CreateSiteAction(prevState: any, formData: FormData) {
  const user = await requireUser();
  const submitedForm = await parseWithZod(formData, {
    schema: SiteCreationSchema({
      async isSubDirectoryUnique() {
        const exisitngSubDirectory = await prisma.site.findUnique({
          where: {
            subdirectory: formData.get("subDirectory") as string,
          },
        });

        return !exisitngSubDirectory;
      },
    }),
    async: true,
  });

  if (submitedForm.status !== "success") {
    return submitedForm.reply();
  }

  const createNewSite = await prisma.site.create({
    data: {
      description: submitedForm.value.description,
      name: submitedForm.value.name,
      subdirectory: submitedForm.value.subDirectory,
      userId: user.id,
    },
  });

  return redirect(`/dashboard/sites`);
}

export async function GetAllSites(userId: string) {
  const sites = await prisma.site.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return sites;
}

export async function UploadSiteImageAction(formData: FormData) {
  const user = await requireUser();

  const imageUrl = formData.get("imageUrl") as string;
  const siteId = formData.get("siteId") as string;

  const uplaodImage = await prisma.site.update({
    where: {
      id: siteId,
      userId: user.id,
    },
    data: {
      imageUrl,
    },
  });

  return redirect(`/dashboard/sites/${siteId}`);
}

export async function DeleteSiteAction(formData: FormData) {
  const user = await requireUser();
  const siteId = formData.get("siteId") as string;

  const deleteSite = await prisma.site.delete({
    where: {
      id: siteId,
      userId: user.id,
    },
  });

  return redirect(`/dashboard/sites`);
}

export async function GetDataInDashBoard() {
  const user = await requireUser();

  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),

    prisma.post.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return {
    sites,
    articles,
  };
}

export async function GetSiteImageInfo(siteId: string) {
  const user = await requireUser();

  const siteImage = await prisma.site.findUnique({
    where: {
      userId: user.id,
      id: siteId,
    },
    select: {
      imageUrl: true,
    },
  });

  revalidatePath(`/dashboard/sites/${siteId}`);
  return siteImage;
}
