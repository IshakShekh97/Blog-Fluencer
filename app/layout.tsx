import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Grotesk, Poly } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const polySans = localFont({
  src: "./fonts/PolySans.woff2",
});

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "300"],
});

const poly = Poly({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Blog Fluencer",
  description: "Create , Manage and Share your Blogs with ease.",
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // ${poly.className}
        // ${geistMono.className}
        // ${font.className}
        className={`
          ${polySans.className}
          dark:bg-zinc-950
        `}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className="tracking-wide">{children}</main>
          <Toaster richColors expand={false} closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
