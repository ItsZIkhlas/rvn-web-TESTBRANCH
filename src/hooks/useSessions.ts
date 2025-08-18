"use client";
import useSWR from "swr";
import { createSupabaseClientWithAuth } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";

const fetchSessions = async () => {
  const { getToken } = useAuth();
  const token = await getToken({ template: "supabase" });
  if (!token) throw new Error("No auth token found");

  const supabase = createSupabaseClientWithAuth(token);

  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    // .eq("user_id", YOUR_USER_ID) // you can add user filtering here if needed
    .eq("deleted", false)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export function useSessions() {
  const { getToken } = useAuth();

  const fetcher = async () => {
    const token = await getToken({ template: "supabase" });
    if (!token) throw new Error("No auth token found");

    const supabase = createSupabaseClientWithAuth(token);

    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("deleted", false)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  };

  const { data, error, isLoading, mutate } = useSWR("sessions", fetcher, {
    revalidateOnFocus: false,
    refreshInterval: 0,
  });

  return {
    sessions: data || [],
    error,
    isLoading,
    refresh: () => mutate(),
  };
}
