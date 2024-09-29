import React from "react";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="fixed min-h-screen w-full bg-background dark:bg-dot-white/[0.05] bg-dot-black/[0.2]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 z-[99] relative">
        {children}
      </main>
      <div className="hidden dark:block bg-gradient-to-bl from-sky-700 via-neutral-900 to-black size-96 blur-[100px] fixed z-[50] left-[40%] top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="dark:hidden size-64 blur-[100px] fixed z-[50] left-[40%] top-[30%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(var(--tw-gradient-stops))] from-indigo-600 via-indigo-400 to-indigo-200"></div>
    </>
  );
};

export default BlogLayout;
