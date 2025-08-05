"use client";

import useSWR from "swr";
import { createSupabaseClientWithAuth } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";

export type Insight = {
  id: string;
  user_id: string;
  session_id: string;
  report: string;
  viewed: boolean;
  created_at: string;
  deleted: boolean;
  sessions?: {
    track_name: string;
  };
};

export function useInsights(sessionId?: string) {
  const { getToken } = useAuth();

  const fetchInsights = async (): Promise<Insight[]> => {
    const token = await getToken({ template: "supabase" });
    if (!token) throw new Error("No auth token found");

    const supabase = createSupabaseClientWithAuth(token);

    let query = supabase
      .from("insights")
      .select(
        `
        *,
        sessions (
          track_name
        )
      `
      )
      .eq("deleted", false)
      .order("created_at", { ascending: false });

    if (sessionId) {
      query = query.eq("session_id", sessionId);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Insight[];
  };

  const { data, error, isLoading, mutate } = useSWR<Insight[]>(
    sessionId ? `insights-${sessionId}` : "insights",
    fetchInsights,
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  return {
    insights: data || [],
    error,
    isLoading,
    insightRefresh: () => mutate(),
  };
}
