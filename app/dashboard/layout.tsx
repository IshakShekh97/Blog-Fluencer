import Link from "next/link";
import React from "react";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import { SideBarItems } from "./_components/NavItems";
import {
  CircleUser,
  Github,
  Globe,
  Home,
  Instagram,
  LogOut,
  Menu,
} from "lucide-react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
export const navLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Sites",
    href: "/dashboard/sites",
    icon: Globe,
  },
];

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="dark:hidden z-10 fixed size-72 blur-[200px] left-[43%] top-[40%]  bg-[conic-gradient(var(--tw-gradient-stops))] from-indigo-600 via-indigo-400 to-indigo-200 " />
      <div className="hidden dark:block z-10 fixed size-72 blur-[200px] left-[43%] top-[30%]  bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 " />

      <div className="fixed -z-[99] min-h-screen w-full bg-background dark:bg-dot-white/[0.05] bg-dot-black/[0.2]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <section className="hidden md:grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className=" border-secondary bg-muted/40 ">
          <div className="flex h-full max-h-screen flex-col gap-2 ">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href={"/"} className="flex items-center gap-2 font-black">
                <Image src={Logo} alt="Logo" className="size-8" />
                <h2 className="text-2xl flex items-center justify-center gap-1">
                  <span>Blog</span>
                  <span className="bg-gradient-to-tr from-fuchsia-500 to-amber-500 font-black text-transparent bg-clip-text ">
                    Fluencer
                  </span>
                </h2>
              </Link>
            </div>

            <div className="flex-1 flex-col border-r flex justify-between">
              <nav className="grid space-y-3 items-start px-2 font-medium lg:px-4 mt-3 ">
                <SideBarItems />
                <div className="">
                  <div className="mt-auto bg-secondary-foreground text-secondary backdrop-blur-3xl backdrop-brightness-200 px-3 py-2 rounded-lg flex items-center justify-between">
                    <Link
                      target="_blank"
                      href={`https://ishak-portfolio.vercel.app/`}
                      className="hover:underline underline-offset-4 hover:font-bold font-black "
                    >
                      Created By Ishak
                    </Link>
                    <Link
                      target="_blank"
                      href={`https://github.com/IshakShekh97`}
                    >
                      <Github className="size-8 p-1 rounded-full bg-secondary text-primary" />
                    </Link>
                    <Link
                      target="_blank"
                      href={`https://github.com/IshakShekh97`}
                    >
                      <Instagram className="size-8 p-1 rounded-full bg-secondary text-primary" />
                    </Link>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="ml-auto flex items-center gap-x-3">
              <ThemeSwitcher className="rounded-full overflow-hidden" />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    size={"icon"}
                    variant={"secondary"}
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <LogoutLink className="hover:bg-destructive hover:text-white">
                      Log out
                    </LogoutLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex  overflow-y-auto   relative z-50  flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </section>

      <section className="flex md:hidden flex-col ">
        <header className="h-16 bg-muted/40 px-3 sm:px-5 py-3 flex items-center justify-between">
          <Link href={"/"} className="flex items-center gap-2 font-black">
            <Image src={Logo} alt="Logo" className="size-6" />
            <h2 className="text-lg flex items-center justify-center gap-1">
              <span>Blog</span>
              <span className="bg-gradient-to-tr from-fuchsia-500 to-amber-500 font-black text-transparent bg-clip-text ">
                Fluencer
              </span>
            </h2>
          </Link>

          <div className="flex items-center justify-center gap-2">
            <ThemeSwitcher btnClassName="size-8" />
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent className="bg-primary-foreground/80 backdrop-blur-sm">
                <SheetHeader>
                  <SheetTitle>
                    <Link
                      href={"/"}
                      className="flex items-center gap-2 font-black justify-center"
                    >
                      <Image src={Logo} alt="Logo" className="size-8" />
                      <h2 className="text-2xl flex items-center justify-center gap-1">
                        <span>Blog</span>
                        <span className="bg-gradient-to-tr from-fuchsia-500 to-amber-500 font-black text-transparent bg-clip-text ">
                          Fluencer
                        </span>
                      </h2>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col my-5 gap-3 relative h-[95%]">
                  <SideBarItems />
                  <LogoutLink className="mt-auto">
                    <Button
                      variant={"destructive"}
                      className="w-full items-center justify-start gap-3"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </Button>
                  </LogoutLink>
                  <div className="">
                    <div className="mt-auto bg-secondary-foreground text-secondary backdrop-blur-3xl backdrop-brightness-200 px-3 py-2 rounded-lg flex items-center justify-between">
                      <Link
                        target="_blank"
                        href={`https://ishak-portfolio.vercel.app/`}
                        className="hover:underline underline-offset-4 hover:font-bold font-black "
                      >
                        Created By Ishak
                      </Link>
                      <Link
                        target="_blank"
                        href={`https://github.com/IshakShekh97`}
                      >
                        <Github className="size-8 p-1 rounded-full bg-secondary text-primary" />
                      </Link>
                      <Link
                        target="_blank"
                        href={`https://github.com/IshakShekh97`}
                      >
                        <Instagram className="size-8 p-1 rounded-full bg-secondary text-primary" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <main className="flex relative z-50  flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </section>
    </>
  );
};

export default DashBoardLayout;
