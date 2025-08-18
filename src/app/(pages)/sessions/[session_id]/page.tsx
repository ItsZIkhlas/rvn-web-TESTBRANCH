"use client";

import { useParams } from "next/navigation";
import { useSessionStore } from "@/lib/sessionStore";
import { useEffect, useState } from "react";
import { createSupabaseClientWithAuth } from "@/lib/supabase"; // updated import
import { useAuth } from "@clerk/nextjs";

import MapBoxMap from "@/components/MapBoxMap";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/new-york-v4/ui/sidebar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york-v4/ui/tabs";
import { Card, CardContent } from "@/registry/new-york-v4/ui/card";
import { MapPin, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/registry/new-york-v4/ui/dialog";
import { RefreshButton } from "@/components/RefreshBtn";
import { SessionCard } from "@/components/carousel-demo";

interface Session {
  id: string;
  track_id: string;
  average_lap: string;
  fastest_lap: string;
  total_laps: number;
  avg_lean_angle: number;
  max_lean_angle: number;
  top_speed: number;
  track_name: string;
  track_temperature: string;
  track_latitude: number;
  track_longitude: number;
  created_at: string;
}

interface Lap {
  id: string;
  lap_number: number;
  time: string;
  top_speed: number;
  avg_lean_angle: number;
  max_lean_angle: number;
  rating: number;
  overall_feedback: {
    summary: string;
    strengths: string[];
    weaknesses: string[];
  };
}

interface Corner {
  lat: number;
  lon: number;
}

export default function SessionDetailPage() {
  const { session_id } = useParams();
  const getSessionById = useSessionStore((s) => s.getSessionById);

  const [session, setSession] = useState<Session | null>(null);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [corners, setCorners] = useState<Corner[]>([]);
  const [loadingCorners, setLoadingCorners] = useState(false);
  const [selectedLap, setSelectedLap] = useState<Lap | null>(null);

  const { getToken } = useAuth();

  const handleRefresh = async () => {
    if (!session_id) return;

    const token = await getToken({ template: "supabase" });
    if (!token) {
      console.error("No Clerk token found");
      setSession(null);
      setLaps([]);
      setCorners([]);
      return;
    }

    const supabase = createSupabaseClientWithAuth(token);

    // Fetch session
    const { data: sessionData, error: sessionError } = await supabase
      .from("sessions")
      .select("*")
      .eq("id", session_id)
      .single();

    if (sessionError) {
      console.error("Error fetching session:", sessionError);
      setSession(null);
    } else {
      setSession(sessionData);
    }

    // Fetch laps
    const { data: lapsData, error: lapsError } = await supabase
      .from("laps")
      .select("*")
      .eq("session_id", session_id)
      .order("lap_number", { ascending: true });

    if (lapsError) {
      console.error("Error fetching laps:", lapsError);
      setLaps([]);
    } else {
      setLaps(lapsData || []);
    }

    // Fetch lap_data corners
    setLoadingCorners(true);
    const { data: lapsDataRows, error } = await supabase
      .from("lap_data")
      .select("lap_number, data")
      .eq("session_id", session_id)
      .order("lap_number", { ascending: true });

    if (error) {
      console.error("Error fetching laps_data:", error);
      setCorners([]);
      setLoadingCorners(false);
      return;
    }

    if (lapsDataRows && lapsDataRows.length > 0) {
      const middleIndex = Math.floor(lapsDataRows.length / 2);

      const middleLapData = lapsDataRows[middleIndex].data;

      if (Array.isArray(middleLapData)) {
        const middleLapCorners = middleLapData.map((point: any) => ({
          lat: point.lat,
          lon: point.lng,
        }));
        setCorners(middleLapCorners);
      } else {
        setCorners([]);
      }
    } else {
      setCorners([]);
    }
    setLoadingCorners(false);
  };

  useEffect(() => {
    handleRefresh();
  }, [session_id]);

  function lapTimeToMs(time: string): number {
    const parts = time.split(":").map((part) => part.trim());

    let ms = 0;

    if (parts.length === 2) {
      const [mm, ss] = parts;
      ms += parseInt(mm, 10) * 60 * 1000;
      ms += parseFloat(ss) * 1000;
    } else if (parts.length === 3) {
      const [hh, mm, ss] = parts;
      ms += parseInt(hh, 10) * 3600 * 1000;
      ms += parseInt(mm, 10) * 60 * 1000;
      ms += parseFloat(ss) * 1000;
    } else {
      ms = parseFloat(time) * 1000;
    }

    return ms;
  }

  const fastestLapIndex = laps.reduce((fastestIdx, lap, idx) => {
    const lapMs = lapTimeToMs(lap.time);
    const fastestMs = fastestIdx === -1 ? Infinity : lapTimeToMs(laps[fastestIdx].time);
    return lapMs < fastestMs ? idx : fastestIdx;
  }, -1);

  const fastestLapId = fastestLapIndex !== -1 ? laps[fastestLapIndex].lap_number : null;


  if (!session)
    return <p className="text-white p-4">Loading session details...</p>;

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
        <div className="px-4 py-6 sm:px-6 lg:px-12 max-w-screen-2xl mx-auto w-full text-white">
          <Tabs defaultValue="overview" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex jusitfy-center items-center gap-4">
                <SidebarTrigger className="-ml-1" />
                <TabsList className="flex gap-2">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="sectors">Sectors</TabsTrigger>
                  <TabsTrigger value="charts">Charts</TabsTrigger>
                </TabsList>
              </div>
              <RefreshButton onRefresh={handleRefresh} variant="default" />
            </div>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* LEFT: Track Map */}
                {loadingCorners ? (
                  <p className="text-white p-4">Loading map data...</p>
                ) : (
                  <MapBoxMap
                    latitude={session.track_latitude}
                    longitude={session.track_longitude}
                    corners={corners ?? []}
                  />
                )}

                {/* RIGHT: Session Summary + Table */}
                <div className="flex flex-col gap-6 w-full">
                  {/* Summary */}
                  <h3 className="text-xl font-semibold mt-4">
                    Session Summary
                  </h3>
                  <Card className="w-[43rem]">
                    <CardContent className="p-6 space-y-6">
                      {/* TOP: Track name + date/time */}
                      <div className="flex flex-col sm:flex-row justify-between border-b border-white/20 pb-4 gap-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-orange-500" />
                          <p className="text-sm sm:text-base text-white/80 truncate">
                            {session.track_name}
                          </p>
                        </div>
                        <div className="flex gap-2 text-sm text-white/60">
                          <p>{session.created_at.slice(0, 10)}</p>
                          <p>
                            {new Date(session.created_at).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      {/* MID: Stats */}
                      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                        <div className="text-center w-full md:w-auto">
                          <h1 className="text-5xl font-bold text-white">
                            {session.fastest_lap.startsWith("00:")
                              ? session.fastest_lap.slice(3)
                              : session.fastest_lap}
                          </h1>
                          <p className="text-orange-500 mt-1 text-lg">
                            Fastest Lap
                          </p>
                        </div>

                        <div className="flex-1 space-y-4 flex flex-col items-end justify-between mr-4">
                          <div className="border-2 border-blue-500 text-blue-500 rounded-xl py-3 px-8 text-center">
                            <p className="text-lg font-semibold">
                              {session.average_lap.startsWith("00:")
                                ? session.average_lap.slice(3)
                                : session.average_lap}
                            </p>
                            <p className="text-sm font-light">Average Lap</p>
                          </div>

                          <div className="flex justify-around text-center ml-[10px] gap-4">
                            <div>
                              <p className="text-white text-lg font-semibold">
                                {session.top_speed} mph
                              </p>
                              <p className="text-white/60 text-sm">Top Speed</p>
                            </div>
                            <div>
                              <p className="text-white text-lg font-semibold">
                                {session.total_laps}
                              </p>
                              <p className="text-white/60 text-sm">
                                Total Laps
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* BOTTOM: Lean + Temp */}
                      <div className="flex flex-wrap justify-between gap-4 pt-4 border-t border-white/20">
                        <div className="flex gap-6 flex-wrap">
                          <div className="flex items-center gap-2">
                            <p className="text-white/70 text-sm">Max Lean</p>
                            <span className="text-white text-base font-semibold">
                              {session.max_lean_angle}°
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-white/70 text-sm">Avg Lean</p>
                            <span className="text-white text-base font-semibold">
                              {session.avg_lean_angle}°
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-white/70 text-sm">Track Temp</p>
                          <p className="text-white text-base font-semibold">
                            {session.track_temperature}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Lap Table */}
                  <Card className="w-full">
                    <h3 className="text-xl font-semibold ml-4 mt-4">
                      Lap Data
                    </h3>
                    <CardContent className="overflow-x-auto">
                      <table className="min-w-full text-sm text-left text-white border border-white/10 rounded-md">
                        <thead className="bg-white/10">
                          <tr>
                            <th className="px-4 py-2">Lap</th>
                            <th className="px-4 py-2">Time</th>
                            <th className="px-4 py-2">Top Speed</th>
                            <th className="px-4 py-2">Avg Lean</th>
                            <th className="px-4 py-2">Max Lean</th>
                            <th className="px-4 py-2">Rating</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {laps.map((lap) => (
                            <Dialog key={lap.lap_number}>
                              <DialogTrigger asChild>
                                <tr
                                  onClick={() => setSelectedLap(lap)}
                                  className={`hover:bg-white/10 cursor-pointer ${
                                    lap.lap_number === fastestLapId
                                      ? "bg-white/10 font-semibold"
                                      : ""
                                  }`}
                                >
                                  <td className="px-4 py-2">
                                    {lap.lap_number}
                                  </td>
                                  <td className="px-4 py-2">{lap.time}</td>
                                  <td className="px-4 py-2">
                                    {lap.top_speed} km/h
                                  </td>
                                  <td className="px-4 py-2">
                                    {lap.avg_lean_angle?.toFixed(1)}°
                                  </td>
                                  <td className="px-4 py-2">
                                    {lap.max_lean_angle?.toFixed(1)}°
                                  </td>
                                  <td className="px-4 py-2">
                                    {lap.rating ?? "N/A"}
                                  </td>
                                </tr>
                              </DialogTrigger>
                              <DialogContent className="bg-zinc-900 text-white max-w-2xl rounded-2xl p-8 shadow-xl max-h-[90vh] overflow-y-auto space-y-8 animate-in fade-in zoom-in-90 duration-300 ease-out">
                                {/* HEADER */}
                                <div className="border-b border-white/10 pb-4">
                                  <h2 className="text-3xl font-bold tracking-tight text-indigo-400 drop-shadow">
                                    Lap {lap.lap_number} Feedback
                                  </h2>
                                  <p className="text-sm text-white/60 mt-1">
                                    Data-driven performance breakdown
                                  </p>
                                </div>

                                {/* LAP STATS */}
                                <div className="rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 p-6 shadow-md group hover:shadow-indigo-500/20 transition-all duration-300 ease-out space-y-4 border border-white/5">
                                  <h3 className="text-lg font-semibold text-white/80 mb-2 group-hover:text-indigo-300 transition">
                                    Lap Stats
                                  </h3>
                                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                                    {[
                                      ["Time", lap.time],
                                      ["Top Speed", `${lap.top_speed} km/h`],
                                      [
                                        "Avg Lean Angle",
                                        `${lap.avg_lean_angle?.toFixed(1)}°`,
                                      ],
                                      [
                                        "Max Lean Angle",
                                        `${lap.max_lean_angle?.toFixed(1)}°`,
                                      ],
                                    ].map(([label, value], i) => (
                                      <div
                                        key={i}
                                        className="flex flex-col space-y-0.5"
                                      >
                                        <span className="text-white/50">
                                          {label}
                                        </span>
                                        <span className="text-base font-medium">
                                          {value}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mb-6 text-center">
                                    <h3 className="text-base font-semibold mb-2">
                                      Performance Rating
                                    </h3>
                                    <div className="flex justify-center items-center gap-1">
                                      {[...Array(10)].map((_, i) => {
                                        const filled = i < lap.rating;
                                        return (
                                          <Star
                                            key={i}
                                            className={
                                              "w-5 h-5 transition-transform duration-200 " +
                                              (filled
                                                ? "text-yellow-400 scale-110"
                                                : "text-white/20 scale-100 hover:scale-105")
                                            }
                                            fill={
                                              filled ? "currentColor" : "none"
                                            }
                                          />
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>

                                {/* SUMMARY */}
                                <div className="rounded-xl bg-zinc-800/80 backdrop-blur-md border border-white/5 p-6 shadow-sm hover:shadow-indigo-400/20 transition-all duration-300">
                                  <h3 className="text-lg font-semibold text-white/90 mb-2">
                                    Overall Summary
                                  </h3>
                                  <p className="text-sm text-white/70 leading-relaxed transition-all duration-300 ease-in-out">
                                    {lap.overall_feedback?.summary ||
                                      "No summary available."}
                                  </p>
                                </div>

                                {/* STRENGTHS */}
                                {lap.overall_feedback?.strengths?.length >
                                  0 && (
                                  <div className="rounded-xl border-l-4 border-green-500/50 bg-zinc-800/90 p-6 shadow-md transition-all duration-300 hover:border-green-400/80 hover:shadow-green-300/10">
                                    <h3 className="text-lg font-semibold text-white mb-3">
                                      Strengths
                                    </h3>
                                    <ul className="text-sm list-disc list-inside text-white/80 space-y-1">
                                      {lap.overall_feedback.strengths.map(
                                        (item, i) => (
                                          <li
                                            key={i}
                                            className="transition-all duration-200 hover:translate-x-1 hover:text-white"
                                          >
                                            {item}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}

                                {/* WEAKNESSES */}
                                {lap.overall_feedback?.weaknesses?.length >
                                  0 && (
                                  <div className="rounded-xl border-l-4 border-rose-500/50 bg-zinc-800/90 p-6 shadow-md transition-all duration-300 hover:border-rose-400/80 hover:shadow-rose-300/10">
                                    <h3 className="text-lg font-semibold text-white mb-3">
                                      Areas to Improve
                                    </h3>
                                    <ul className="text-sm list-disc list-inside text-white/80 space-y-1">
                                      {lap.overall_feedback.weaknesses.map(
                                        (item, i) => (
                                          <li
                                            key={i}
                                            className="transition-all duration-200 hover:translate-x-1 hover:text-white"
                                          >
                                            {item}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sectors">
              <p className="text-muted-foreground">Sectors coming soon...</p>
            </TabsContent>

            <TabsContent value="charts">
              <p className="text-muted-foreground">Charts coming soon...</p>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
