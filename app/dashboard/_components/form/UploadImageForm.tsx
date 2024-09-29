"use client";

import { UploadSiteImageAction } from "@/actions/site-action";
import SubmitBtn from "@/components/SubmitBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const UploadImageForm = ({ siteId }: { siteId: string }) => {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>
          This is image of your site, You can change it here.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {imageUrl ? (
          <div className="relative w-[400px] h-[200px] bg-muted rounded-lg">
            <Image
              src={imageUrl!}
              alt="Cover Image"
              className="absolute object-cover w-[400px] h-[200px] rounded-lg "
              fill
              // width={200}
              // height={200}
            />
          </div>
        ) : (
          <UploadDropzone
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success("Site Image uploaded successfully");
            }}
            endpoint="imageUploader"
            onUploadError={() => {
              toast.error("Failed to upload image");
            }}
            appearance={{
              container:
                "bg-primary/10 dark:bg-primary/5 border border-primary border-dashed",
              button: "bg-primary dark:text-black text-white font-bold",
              uploadIcon: "text-primary",
              label: "text-secondary-foreground",
            }}
          />
        )}
      </CardContent>

      <CardFooter>
        <form action={UploadSiteImageAction}>
          <input type="hidden" name="siteId" value={siteId} />
          <input type="hidden" name="imageUrl" value={imageUrl} />
          <SubmitBtn text="Change Image" loadingText="Uploading Image" />
        </form>
      </CardFooter>
    </Card>
  );
};

export default UploadImageForm;
