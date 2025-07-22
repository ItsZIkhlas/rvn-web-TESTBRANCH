"use client"
import  useSWR  from "swr";
import { supabase } from "@/lib/supabase";

const fetchSessions = async () => {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    // .eq("user_id", YOUR_USER_ID)
    .eq("deleted", false)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

export function useSessions() {
  const { data, error, isLoading, mutate } = useSWR("sessions", fetchSessions, {
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
