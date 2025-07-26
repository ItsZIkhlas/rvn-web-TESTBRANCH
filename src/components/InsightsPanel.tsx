"use client";

import { useInsights } from "@/hooks/useInsights";
import { Insight } from "@/hooks/useInsights";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/new-york-v4/ui/card";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import { Skeleton } from "@/registry/new-york-v4/ui/skeleton";
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york-v4/ui/dialog";
import { Button } from "@/registry/new-york-v4/ui/button";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";

export default function VerticalInsightsCarousel({
  sessionId,
}: {
  sessionId?: string;
}) {
  const { insights, isLoading, error } = useInsights(sessionId);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  if (isLoading) {
    return (
      <div className="h-[500px]">
        <ScrollArea className="h-full pr-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton key={idx} className="h-36 mb-4 w-full rounded-xl" />
          ))}
        </ScrollArea>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-4">Failed to load insights.</p>
    );
  }

  if (insights.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-4">
        No insights available yet.
      </p>
    );
  }

  return (
    <div className="rounded-xl bg-gradient-to-b from-black/60 via-zinc-900/20 to-white/5 border border-gray-200 p-6 md:block md:max-w-4xl">
      <h2 className="text-white text-2xl font-semibold mb-6">
        Session Insights
      </h2>
      <div className="h-[480px]">
        <ScrollArea className="h-full pr-2">
          <div className="flex flex-col gap-4">
            {insights.map((insight) => {
              const createdDate = insight.created_at
                ? new Date(insight.created_at)
                : null;

              return (
                <Card key={insight.id} className="min-h-[140px]">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-semibold">
                        {insight.sessions?.track_name ?? "Unknown Track"}
                      </CardTitle>
                      <Badge
                        variant={insight.viewed ? "outline" : "default"}
                        className={
                          insight.viewed ? "text-muted-foreground" : ""
                        }
                      >
                        {insight.viewed ? "Viewed" : "New"}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs mt-1">
                      {createdDate
                        ? formatDistanceToNow(createdDate, { addSuffix: true })
                        : "Unknown time"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-5">
                      {insight.report}
                    </p>
                  </CardContent>

                  <CardFooter className="text-xs text-muted-foreground pt-2">
                    <Dialog
                      open={selectedInsight?.id === insight.id}
                      onOpenChange={(open) => {
                        if (!open) setSelectedInsight(null);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="link"
                          className="text-xs h-auto p-0"
                          aria-label={`View full report for insight ${insight.session_id?.slice(0, 8)}`}
                          onClick={() => setSelectedInsight(insight)}
                        >
                          View Full Report (ID:{" "}
                          {insight.session_id?.slice(0, 8)})
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-lg">
                        <DialogHeader>
                          <DialogTitle>
                            {insight.sessions?.track_name ?? "Session Insight"}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-2 max-h-[400px] overflow-y-auto text-sm whitespace-pre-wrap">
                          <p>{insight.report}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
