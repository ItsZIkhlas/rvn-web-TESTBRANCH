"use client";

import { Button } from "@/registry/new-york-v4/ui/button";
import { RefreshCcw, Loader2 } from "lucide-react";
import { useState } from "react";

type RefreshButtonProps = {
  onRefresh: () => Promise<any> | void;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "ghost";
};

export function RefreshButton({
  onRefresh,
  size = "sm",
  variant = "outline",
}: RefreshButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await onRefresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      variant={variant}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <RefreshCcw className="w-4 h-4 mr-2" />
          Refresh
        </>
      )}
    </Button>
  );
}
