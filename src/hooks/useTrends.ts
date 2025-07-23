import { useState } from "react";
import { supabase } from "@/lib/supabase"; // adjust path

export function useSessionTrends() {
  const [trends, setTrends] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchTrends() {
    setLoading(true);
    setError(null);

    // Fetch latest session_trends entry - here no user or track filtering yet
    const { data, error: fetchError } = await supabase
      .from("session_trends")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      setError(fetchError.message);
      setTrends(null);
    } else if (data) {
      setTrends(data);
    } else {
      setTrends(null);
    }
    setLoading(false);
  }

  return { trends, loading, error, fetchTrends };
}
