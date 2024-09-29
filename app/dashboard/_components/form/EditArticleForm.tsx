"use client";

import { EditPostAction } from "@/actions/article-action";
import TailwindEditor from "@/components/EditorWrapper";
import SubmitBtn from "@/components/SubmitBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { postSchema } from "@/lib/zodSchema";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { Post } from "@prisma/client";
import { Atom } from "lucide-react";
import Image from "next/image";
import { JSONContent } from "novel";
import { useActionState, useState } from "react";
import slugify from "react-slugify";
import { toast } from "sonner";

interface EditArticleFormProps {
  data: Post;
  siteId: string;
}

export const EditArticleForm = ({ data, siteId }: EditArticleFormProps) => {
  const [imageUrl, setImageUrl] = useState<undefined | string>(data.image);
  const [title, setTitle] = useState<undefined | string>(data.title);
  const [slugValue, setSlugValue] = useState<undefined | string>(data.slug);
  const [textEditorValue, setTextEditorValue] = useState<
    JSONContent | undefined
  >(data.articleContent as any);

  const [lastResult, action] = useActionState(EditPostAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: postSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  function handleSlugGeneration() {
    const titleInp = title;

    if (titleInp?.length === 0 || titleInp === undefined) {
      return toast.error("Title is required to generate slug");
    }
    setSlugValue(slugify(titleInp));
    return toast.success("Slug generated successfully");
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-extrabold">Article Details</CardTitle>
          <CardDescription className="capitalize">
            Fill the form below to create a new article for your site.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            className="flex flex-col gap-6 "
          >
            <input type="hidden" name="articleId" value={data.id} />
            <input type="hidden" name="siteId" value={siteId} />
            <input
              type="hidden"
              name="articleId"
              value={data.siteId as string}
            />

            <div className="grid gap-2">
              <Label className="ml-2">Title :</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                placeholder="Enter Article Title ..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <p className="text-rose-500">{fields.title.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label className="ml-2">Slug :</Label>
              <Input
                value={slugValue}
                onChange={(e) => setSlugValue(e.target.value)}
                key={fields.slug.key}
                name={fields.slug.name}
                defaultValue={fields.slug.initialValue}
                placeholder="Enter Unique Article Slug ..."
              />
              <Button
                variant={"secondary"}
                onClick={handleSlugGeneration}
                className="w-fit bg-gradient-to-tr from-fuchsia-500 to-emerald-400 text-white font-black"
                type="button"
              >
                <Atom className="size-4 mr-2" />
                Generate Slug
              </Button>
              <p className="text-rose-500">{fields.slug.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label className="ml-2">Small Description :</Label>
              <Textarea
                key={fields.smallDescription.key}
                name={fields.smallDescription.name}
                defaultValue={data.smallDescription}
                className="h-32 resize-none "
                placeholder="Enter Small Description ..."
              />
              <p className="text-rose-500">{fields.smallDescription.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label className="ml-2">Cover Image :</Label>
              <input
                type="hidden"
                name={fields.coverImageUrl.name}
                key={fields.coverImageUrl.key}
                defaultValue={fields.coverImageUrl.initialValue}
                value={imageUrl}
              />

              {imageUrl ? (
                <>
                  <div className="relative w-[400px] h-[200px] bg-muted rounded-lg">
                    <Image
                      src={imageUrl!}
                      alt="Cover Image"
                      className="absolute animate-none  object-cover w-[400px] h-[200px] rounded-lg "
                      fill
                    />
                  </div>
                </>
              ) : (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                    toast.success("Image uploaded successfully");
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
              <p className="text-rose-500">{fields.coverImageUrl.errors}</p>
            </div>

            <div className="grid gap-2">
              <Label className="ml-2">Article Content :</Label>
              <input
                type="hidden"
                name={fields.articleContent.name}
                key={fields.articleContent.key}
                defaultValue={fields.articleContent.initialValue}
                value={JSON.stringify(textEditorValue)}
              />
              <TailwindEditor
                onChange={setTextEditorValue}
                initialValue={textEditorValue}
              />
              <p className="text-rose-500">{fields.articleContent.errors}</p>
            </div>

            <SubmitBtn text="Edit Article" className="mx-auto w-[60%]" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
