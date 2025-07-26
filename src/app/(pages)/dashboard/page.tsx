"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { CarouselDemo } from "@/components/carousel-demo";
import { useSessions } from "@/hooks/useSessions";
import { RefreshButton } from "@/components/RefreshBtn";
import { useSessionTrends } from "@/hooks/useTrends";
import {
  SidebarInset,
  SidebarProvider,
} from "@/registry/new-york-v4/ui/sidebar";
import InsightsPanel from "@/components/InsightsPanel";
import { useSessionStore } from "@/lib/sessionStore";
import { useEffect } from "react";

export default function Page() {
  const { sessions, refresh } = useSessions();
  const { fetchTrends } = useSessionTrends();

  useEffect(() => {
    if (sessions) {
      useSessionStore.getState().setSessions(sessions);
    }
  }, [sessions]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader siteHeader="Dashboard" onRefresh={refresh} />

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white px-4 py-6 md:px-8 rounded-b-lg mb-6 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold">Welcome Zayd Asif</h1>
          <p className="mt-2 text-base md:text-lg opacity-90">
            Here’s an overview of your recent sessions and insights.
          </p>
        </div>

        <main className="px-4 md:px-8 flex flex-col gap-6">
          {/* Carousel + Insights side by side on md+ */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <CarouselDemo />
            </div>
            <div className="flex-1">
              <InsightsPanel />
            </div>
          </div>

          {/* Section Cards full width */}
          <div className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_20%,rgba(38,38,38,0.2)_80%,rgba(255,255,255,0.05)_100%)] border border-grey-200 rounded-xl p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
              <h2 className="text-lg md:text-xl font-semibold text-white">
                Recent Detected Trends
              </h2>
              <div className="mt-2 sm:mt-0">
                <RefreshButton onRefresh={fetchTrends} />
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Here are your recent session over session trends
            </p>
            <SectionCards />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
