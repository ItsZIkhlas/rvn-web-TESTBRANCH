"use client";

import useSWR from "swr";
import { supabase } from "@/lib/supabase";

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

const fetchInsights = async (): Promise<Insight[]> => {
  const { data, error } = await supabase
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

  if (error) throw error;
  return data as Insight[];
};

export function useInsights() {
  const { data, error, isLoading, mutate } = useSWR<Insight[]>(
    "insights",
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
