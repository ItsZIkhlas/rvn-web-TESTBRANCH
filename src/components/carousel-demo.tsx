"use client";

import * as React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/new-york-v4/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/registry/new-york-v4/ui/dialog";
import { Button } from "@/registry/new-york-v4/ui/button";
import { MapPin } from "lucide-react";

import { useSessions } from "@/hooks/useSessions";
import { RefreshButton } from "@/components/RefreshBtn";

interface Session {
  id: string;
  average_lap: string;
  fastest_lap: string;
  total_laps: number;
  avg_lean_angle: number;
  max_lean_angle: number;
  top_speed: number;
  track_name: string;
  track_temperature: string;
  created_at: string;
  
  date?: string;
  time?: string;
  location?: string;
}

// List item with corrected keys
function SessionListItem({ session }: { session: Session }) {
  return (
    <div className="flex justify-between items-center bg-neutral-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white cursor-pointer">
      <div className="flex flex-col">
        <span className="font-medium">
          {session.track_name || "Untitled Session"}
        </span>
        <span className="text-white/60 text-xs">
          {session.created_at.slice(0, 10)}{" "}—{" "}
          {new Date(session.created_at).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>
      <div className="text-right">
        <div className="text-white/80 font-semibold">
          {session.fastest_lap.startsWith("00:")
            ? session.fastest_lap.slice(3)
            : session.fastest_lap}
        </div>
        <div className="text-white/40 text-xs">Fastest Lap</div>
      </div>
    </div>
  );
}

export function SessionCard({ session }: { session: Session }) {
  return (
    <Card className="w-[600px] h-[400px] rounded-[15px] bg-neutral-950 border border-white/10 shadow-sm flex-shrink-0 scroll-snap-start m-4">
      <CardContent className="flex flex-col">
        {/* TOP */}
        <div className="flex justify-between items-center border-b border-white/20 pb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6 text-orange-500" />
            <p className="text-xl font-light text-white/70">
              {session.track_name}
            </p>
          </div>
          <div className="flex gap-3 text-white/70 font-light text-lg">
            <p>{session.created_at.slice(0, 10)}</p>
            <p>
              {new Date(session.created_at).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        {/* MIDDLE */}
        <div className="flex flex-row items-center gap-24 border-b border-white/20 pb-4">
          {/* Lap 1 */}
          <div className="flex flex-col items-center justify-center w-[230px] h-[210px]">
            <h1 className="text-6xl font-semibold text-white">
              {session.fastest_lap.startsWith("00:")
                ? session.fastest_lap.slice(3)
                : session.fastest_lap}
            </h1>
            <h2 className="mt-1 text-xl font-light text-orange-500">
              Fastest Lap
            </h2>
          </div>

          {/* part 2 */}
          <div className="flex flex-col w-full gap-4">
            {/* Violet Box */}
            <div className="rounded-2xl px-4 py-3 border-[5px] border-blue-500 text-blue-500 w-[200px]">
              <div className="flex justify-center items-center gap-2">
                <p className="text-lg font-semibold">
                  {session.average_lap.startsWith("00:")
                    ? session.average_lap.slice(3)
                    : session.average_lap}
                </p>
              </div>
              <p className="text-md font-light text-center mt-1">Average Lap</p>
            </div>

            {/* Info small */}
            <div className="flex flex-row gap-8 mt-4 px-1">
              {/* Top Speed */}
              <div className="text-center">
                <p className="text-lg font-semibold text-white">
                  {session.top_speed} mph
                </p>
                <p className="text-white/60 text-sm">Top Speed</p>
              </div>

              {/* Total Laps */}
              <div className="">
                <p className="text-lg font-semibold text-white">
                  {session.total_laps}
                </p>
                <p className="text-white/60 text-sm">Total Laps</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex justify-between items-center h-[90px] px-4">
          {/* Lean */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <p className="text-white/70 text-lg font-light">Max Lean</p>
              <span className="text-white text-xl font-semibold">
                {session.max_lean_angle}°
              </span>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-white/70 text-lg font-light">Avg Lean</p>
              <span className="text-white text-xl font-semibold">
                {session.avg_lean_angle}°
              </span>
            </div>
          </div>

          {/* Temp */}
          <div className="flex flex-row items-center gap-4">
            <p className="text-white/70 text-lg font-light">Est Track Temp</p>
            <p className="text-white text-xl font-semibold">
              {session.track_temperature}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CarouselDemo() {
  const { sessions, isLoading, error, refresh } = useSessions();
  const [searchQuery, setSearchQuery] = useState("");

  // Optional: Add date/time derived fields if you want to display them
  const sessionsWithDateTime = sessions.map((session) => {
    if (session.created_at) {
      const d = new Date(session.created_at);
      return {
        ...session,
        date: d.toLocaleDateString(),
        time: d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
    }
    return session;
  });

  const filteredSessions = sessionsWithDateTime.filter((session) =>
    Object.values(session)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl rounded-2xl shadow-md p-6 border border-grey-200 rounded-xl shadow-sm transition hover:shadow-md bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_20%,rgba(38,38,38,0.2)_80%,rgba(255,255,255,0.05)_100%)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-white">Recent Sessions</h2>

        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>All Sessions</DialogTitle>
                <RefreshButton
                  onRefresh={refresh}
                  size="sm"
                  variant="outline"
                />
              </DialogHeader>

              <input
                type="text"
                placeholder="Search sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 px-4 mt-2 rounded-md bg-neutral-900 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/10"
              />

              <div className="flex flex-col gap-3 mt-4">
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session, index) => (
                    <SessionListItem key={index} session={session} />
                  ))
                ) : (
                  <div className="text-white/60 text-center mt-6">
                    No sessions found.
                  </div>
                )}
              </div>

              <DialogClose asChild>
                <Button variant="ghost" className="mt-6 w-full">
                  Close
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Loading & Error */}
      {isLoading && (
        <div className="text-white text-center mb-4">Loading sessions...</div>
      )}
      {error && (
        <div className="text-red-500 text-center mb-4">
          Failed to load sessions.
        </div>
      )}

      {/* Carousel */}
      <Carousel className="w-full max-w-4xl flex flex-col items-center mt-6 gap-8">
        <div className="w-full overflow-hidden px-6">
          <CarouselContent className="flex gap-6 snap-x snap-mandatory">
            {sessionsWithDateTime.slice(0, 7).map((session, index) => (
              <CarouselItem
                key={session.id || index}
                className="flex-shrink-0 snap-start w-full"
              >
                <SessionCard session={session} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>

        <div className="flex gap-3 items-center justify-center w-full px-6">
          <CarouselPrevious className="static" />
          <CarouselNext className="static" />
        </div>
      </Carousel>
    </div>
  );
}
