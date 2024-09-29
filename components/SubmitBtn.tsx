"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SubmitBtnProps {
  text: string;
  loadingText?: string;
  className?: string;
  variant?:
    | "ghost"
    | "secondary"
    | "destructive"
    | "outline"
    | "link"
    | "default"
    | null
    | undefined;
}

const SubmitBtn = ({
  text,
  className,
  variant,
  loadingText,
}: SubmitBtnProps) => {
  const { pending } = useFormStatus();

  return (
    <div className="w-full flex">
      {pending ? (
        <Button
          type="submit"
          variant={variant}
          disabled={true}
          className={className}
        >
          <Loader className={cn("size-4 animate-spin")} />
          <p className="ml-2">
            {loadingText ? `${loadingText} ...` : "Wait a Minute..."}
          </p>
        </Button>
      ) : (
        <Button type="submit" variant={variant} className={cn(className)}>
          {text}
        </Button>
      )}
    </div>
  );
};

export default SubmitBtn;
