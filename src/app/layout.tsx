import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";

import "@/app/globals.css";

import { AuthContextProvider } from "@/context/AuthContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const latoMain = localFont({
  src: "./fonts/Lato/Lato-Bold.ttf",
  variable: "--font-lato-thin",
  weight: "100",
});

export const metadata: Metadata = {
  title: "RVN - Dashboard",
  description: "RVN Web App",
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${latoMain} bg-background text-foreground overscroll-none antialiased`}
      >
        <AuthContextProvider>
          <ThemeProvider attribute="class">
            {children}
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
};

export default Layout;
