"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { CarouselDemo } from "@/components/carousel-demo";
import { useSessions } from "@/hooks/useSessions";
import { useInsights } from "@/hooks/useInsights";
import {
  SidebarInset,
  SidebarProvider,
} from "@/registry/new-york-v4/ui/sidebar";
import InsightsPanel from "@/components/InsightsPanel";

export default function Page() {
  const { sessions } = useSessions();

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
        <SiteHeader siteHeader="Dashboard" />

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white p-6 rounded-b-lg mb-6 shadow-lg">
          <h1 className="text-3xl font-bold">Welcome Zayd Asif</h1>
          <p className="mt-2 text-lg opacity-90">
            Here’s an overview of your recent sessions and insights.
          </p>
        </div>

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col px-4 md:gap-2 md:py-6 md:px-8 ">
              {/* Carousel + InsightsPanel */}
              <div className="flex flex-col lg:flex-row gap-4 w-full items-center justify-center">
                <div className="w-full lg:w-1/2">
                  <CarouselDemo />
                </div>
                <div className="w-full lg:w-1/2">
                  <InsightsPanel />
                </div>
              </div>
              {/* Section Cards */}
              <div className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_20%,rgba(38,38,38,0.2)_80%,rgba(255,255,255,0.05)_100%)] border border-grey-200 rounded-xl p-4 rounded-lg mb-3">
                <h2 className="text-xl font-semibold text-white mb-3">
                  Overall Stats
                </h2>
                <SectionCards sessions={sessions} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
