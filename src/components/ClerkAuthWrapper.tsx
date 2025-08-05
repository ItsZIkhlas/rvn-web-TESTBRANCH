"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { SignIn, SignUp, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export function ClerkAuthWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  const showSignIn = pathname === "/sign-in";
  const showSignUp = pathname === "/sign-up";

  // Redirect to /sign-in if not signed in
  useEffect(() => {
    if (isLoaded && !isSignedIn && !showSignIn && !showSignUp) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, showSignIn, showSignUp, router]);

  // Show Clerk sign-in/up modals
  if (showSignIn) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SignIn
          path="/sign-in"
          routing="path"
          fallbackRedirectUrl="/dashboard"
          appearance={{ baseTheme: dark }}
        />
      </div>
    );
  }

  if (showSignUp) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SignUp
          path="/sign-up"
          routing="path"
          fallbackRedirectUrl="/dashboard"
          appearance={{ baseTheme: dark }}
        />
      </div>
    );
  }

  // If Clerk hasn't finished loading, don't render anything
  if (!isLoaded) return null;

  // If signed in, show the app
  return <>{children}</>;
}
