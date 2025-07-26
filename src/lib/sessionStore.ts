import { create } from "zustand";

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


type SessionStore = {
  sessions: Session[];
  setSessions: (sessions: Session[]) => void;
  getSessionById: (id: string) => Session | undefined;
};

export const useSessionStore = create<SessionStore>((set, get) => ({
  sessions: [],
  setSessions: (sessions) => set({ sessions }),
  getSessionById: (id) => get().sessions.find((s) => s.id === id),
}));
