"use client";

import { useContext } from "react";
import { ToastContext } from "@/registry/new-york-v4/ui/toaster";

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error(
      "useToast must be used within a <Toaster />. Wrap your app (e.g. layout) with <Toaster />."
    );
  }
  return ctx;
}
