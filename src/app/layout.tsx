import type { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { ClerkAuthWrapper } from "@/components/ClerkAuthWrapper";

import NavigationBar from "@/app/(delete-this-and-modify-page.tsx)/NavigationBar";
import "@/app/globals.css";
import { Toaster } from "@/registry/new-york-v4/ui/sonner";

import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/nextjs";

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

export const metadata: Metadata = {
  title: "RVN - Dashboard",
  description: "RVN Web App",
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground overscroll-none antialiased`}
      >
        <ClerkProvider>
          <ThemeProvider attribute="class">
            <ClerkAuthWrapper>
              <SignedIn>
                {children}
                <Toaster />
              </SignedIn>
              <SignedOut>
                {/* Optionally redirect or show fallback */}
              </SignedOut>
            </ClerkAuthWrapper>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default Layout;
