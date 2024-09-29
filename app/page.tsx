import React from "react";
import Hero from "@/components/landing-page/Hero";
import Features from "@/components/landing-page/Features";

const Home = async () => {
  return (
    <>
      <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] fixed -z-50">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <Hero />
        <Features />
      </div>
    </>
  );
};

export default Home;
