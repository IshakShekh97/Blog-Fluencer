"use client";

import * as React from "react";
import { Lightbulb, Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeSwitcher({
  className,
  btnClassName,
}: {
  className?: string;
  btnClassName?: string;
}) {
  const { setTheme } = useTheme();

  return (
    <>
      <div className={className}>
        <Button
          size={"icon"}
          onClick={() => setTheme("dark")}
          className={cn("dark:hidden ", btnClassName)}
        >
          <Lightbulb className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          onClick={() => setTheme("light")}
          className={cn("hidden dark:flex", btnClassName)}
          size={"icon"}
        >
          <Sparkles className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
    </>
  );
}
