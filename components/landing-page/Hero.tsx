import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "../ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowUpRight } from "lucide-react";

const Hero = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const auth = await isAuthenticated();

  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between text-sm lg:justify-start">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={"/logo.svg"}
              alt="Logo"
              height={20}
              width={20}
              className="size-10"
            />
            <h2 className="text-2xl flex items-center justify-center gap-1">
              <span>Blog</span>
              <span className="bg-gradient-to-tr from-fuchsia-500 to-amber-500 font-black text-transparent bg-clip-text ">
                Fluencer
              </span>
            </h2>
          </Link>

          <div className="md:hidden">
            <ThemeSwitcher />
          </div>
        </div>

        <nav className="hidden md:flex justify-end space-x-4">
          <ThemeSwitcher className="fixed right-20 bottom-10" />

          {auth ? (
            <Link
              href={"/dashboard"}
              className="px-6 py-2 border rounded-full bg-gradient-to-tr from-emerald-500 to-white text-black"
            >
              Dashboard
            </Link>
          ) : (
            <RegisterLink>
              <Button
                variant={"ghost"}
                className="underline underline-offset-4 gap-x-2 bg-gradient-to-br from-blue-500 to-white text-black border-primary border hover:text-black/70"
              >
                Get Started
                <ArrowUpRight className="size-5" />
              </Button>
            </RegisterLink>
          )}
        </nav>
      </div>

      <section className="relative flex items-center justify-center">
        <div className="relative items-center w-full py-12 lg:py-20 ">
          <div className="text-center">
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="text-lg text-primary font-bold capitalize tracking-wide  px-4 py-2 rounded-full bg-primary/10">
                start your bloggin journey{" "}
              </span>
              <span className="text-lg text-primary font-bold capitalize tracking-wide  px-4 py-2 rounded-full bg-primary/10">
                with BlogFluencer
              </span>
            </div>
            <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none ">
              Setup Your Blog <br />
              <span className="bg-gradient-to-b from-violet-400 via-indigo-500 to-blue-600 text-transparent bg-clip-text">
                in Minutes
              </span>
            </h1>

            <p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground  ">
              Setting up You blog is hard and time consuming , but we make it
              easy for you to share your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-purple-400 via-violet-500 to-indigo-600">
                Experiences
              </span>{" "}
              in minutes
            </p>

            <div className="flex items-center gap-x-4 w-full justify-center mt-5">
              <LoginLink>
                <button className="px-6 py-2 bg-primary text-secondary rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                  Login
                </button>
              </LoginLink>
              <RegisterLink>
                <button className="px-4 py-2 group rounded-md border border-black bg-primary-foreground text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255)] transition duration-200 flex items-center gap-2">
                  Try For Free{" "}
                  <ArrowUpRight className="group-hover:animate-bounce" />
                </button>
              </RegisterLink>
            </div>
          </div>

          <div className="relative w-full py-24 mx-auto flex justify-center">
            {/* <svg
              className="w-[80%] -z-50 absolute left-[20%] -mt-32 blur-[150px]"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="fill"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                  gradientTransform="rotate(133 0.5 0.5)"
                >
                  <stop offset="0%" stop-color="#4F46E5"></stop>
                  <stop offset="100%" stop-color="#7b8cff"></stop>
                </linearGradient>
              </defs>
              <path
                d="M78,61.5Q68,73,56,74.5Q44,76,25.5,73.5Q7,71,9.5,51.5Q12,32,25.5,17.5Q39,3,54.5,14Q70,25,79,37.5Q88,50,78,61.5Z"
                stroke="none"
                stroke-width="0"
                fill="url(#fill)"
                className=""
              ></path>
            </svg> */}
            <div className="bg-gradient-to-r from-red-500 via-amber-600 to-yellow-500 w-[60%] h-[60%] absolute  blur-[200px] -z-30" />

            <Image
              src={"/landing-img.png"}
              alt="landing image"
              height={960}
              width={1887}
              className="relative object-cover z-30 w-full rounded-lg "
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
