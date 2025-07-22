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
    <Card className="bg-neutral-950 border border-white/10 rounded-xl shadow-sm transition hover:shadow-md text-white">
      <CardContent className="p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between text-sm text-white/70">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span>{session.track_name}</span>
          </div>
          <div className="text-white/50">
            {session.created_at.slice(0, 10)} —{" "}
            {new Date(session.created_at).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
        </div>

        <div className="text-center">
          <div className="text-4xl font-extrabold text-white">
            {session.fastest_lap.startsWith("00:")
              ? session.fastest_lap.slice(3)
              : session.fastest_lap}
          </div>
          <div className="text-sm text-orange-400 font-medium mt-1">
            Fastest Lap
          </div>
        </div>

        <div className="grid grid-cols-3 text-center mt-4">
          <div>
            <div className="text-md font-semibold text-blue-400">
              {session.average_lap.startsWith("00:")
                ? session.average_lap.slice(3)
                : session.average_lap}
            </div>
            <div className="text-xs text-white/60 mt-1">Avg Lap</div>
          </div>
          <div>
            <div className="text-md font-semibold">{session.top_speed}</div>
            <div className="text-xs text-white/60 mt-1">Top Speed</div>
          </div>
          <div>
            <div className="text-md font-semibold">{session.total_laps}</div>
            <div className="text-xs text-white/60 mt-1">Laps</div>
          </div>
        </div>

        <div className="flex justify-between text-sm mt-4 border-t border-white/10 pt-4">
          <div>
            <div className="text-white">
              <span className="font-medium">Lean Max:</span>{" "}
              {session.max_lean_angle}
            </div>
            <div className="text-white/70 mt-1">
              <span className="font-medium">Lean Avg:</span>{" "}
              {session.avg_lean_angle}
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/70 text-xs">Track Temp</div>
            <div className="text-white font-semibold text-md">
              {session.track_temperature}
            </div>
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
    <div className="w-full max-w-3xl rounded-2xl shadow-md p-6 border border-grey-200 rounded-xl shadow-sm transition hover:shadow-md bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_20%,rgba(38,38,38,0.2)_80%,rgba(255,255,255,0.05)_100%)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Recent Sessions</h2>

        <div className="flex gap-3">
          <RefreshButton onRefresh={refresh} size="sm" variant="outline" />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>All Sessions</DialogTitle>
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
      <Carousel className="w-full flex flex-col items-center mt-6 gap-8">
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
