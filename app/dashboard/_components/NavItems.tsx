"use client";
import Link from "next/link";
import { navLinks } from "../layout";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

export const SideBarItems = () => {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((item, index) => (
        <Link
          href={item.href}
          key={item.name}
          className={cn(
            pathname === item.href
              ? "bg-primary text-muted"
              : "text-muted-foreground bg-transparent border border-primary ",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-foreground hover:bg-zinc-300 dark:hover:bg-muted "
          )}
        >
          <item.icon className="size-4" />
          {item.name}
        </Link>
      ))}
    </>
  );
};
