"use client";

import { CreateSiteAction } from "@/actions/site-action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { siteSchema } from "@/lib/zodSchema";
import { Suspense, useActionState } from "react";
import SubmitBtn from "@/components/SubmitBtn";
import { toast } from "sonner";

const CreateNewSitePage = () => {
  const [lastResult, action] = useActionState(CreateSiteAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: siteSchema,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      <Card className="sm:w-[450px]">
        <CardHeader>
          <CardTitle>Create a New Site</CardTitle>
          <CardDescription>
            Click the Button below one you are done...
          </CardDescription>
        </CardHeader>

        <form id={form.id} onSubmit={form.onSubmit} action={action}>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-3 ">
                <Label>Site Name :</Label>
                <Input
                  placeholder="Site Name"
                  type="text"
                  name={fields.name.name}
                  key={fields.name.key}
                  defaultValue={fields.name.initialValue}
                />
                <p className="text-rose-700">{fields.name.errors}</p>
              </div>
              <div className="flex flex-col gap-3 ">
                <Label>Subdirectory :</Label>
                <Input
                  placeholder="Must be Unique , Used In Blog"
                  type="text"
                  name={fields.subDirectory.name}
                  key={fields.subDirectory.key}
                  defaultValue={fields.subDirectory.initialValue}
                />
                <p className=" text-rose-700">{fields.subDirectory.errors}</p>
              </div>
              <div className="flex flex-col gap-3 ">
                <Label>Description :</Label>
                <Textarea
                  placeholder="Small Description for your site..."
                  className="h-28 resize-none"
                  name={fields.description.name}
                  key={fields.description.key}
                  defaultValue={fields.description.initialValue}
                />
                <p className=" text-rose-700">{fields.description.errors}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitBtn
              text="Create Site"
              variant={"default"}
              className="w-[50%] mx-auto"
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateNewSitePage;
