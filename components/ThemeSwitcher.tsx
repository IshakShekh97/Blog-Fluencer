"use client";

import * as React from "react";
import { Lightbulb, Moon, Sparkles, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher({ className }: { className?: string }) {
  const { setTheme } = useTheme();

  return (
    <>
      <div className={className}>
        <Button
          size={"icon"}
          onClick={() => setTheme("dark")}
          className="dark:hidden"
        >
          <Lightbulb className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          onClick={() => setTheme("light")}
          className="hidden dark:flex"
          size={"icon"}
        >
          <Sparkles className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </div>
    </>
  );
}
