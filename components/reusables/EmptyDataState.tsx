import { FilePlus2, Plus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { title } from "process";

interface EmptyDataStateProps {
  title: string;
  href: string;
}

const EmptyDataState = ({ title, href }: EmptyDataStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-primary  dark:bg-primary/5 bg-primary/10 px-8 py-10 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 ">
        <FilePlus2 className="size-10 text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-medium capitalize">
        You Don&apos;t have created any{" "}
        <span className="font-black text-amber-500">{title}</span>
      </h2>
      <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-xl mx-auto  ">
        You Currently don&apos;t have any{" "}
        <span className="underline">{title}</span>. You Can create some to see
        them right here.
      </p>

      <Button asChild>
        <Link href={href}>
          <Plus className="mr-2 size-4" />
          Create new {title}
        </Link>
      </Button>
    </div>
  );
};

export default EmptyDataState;
