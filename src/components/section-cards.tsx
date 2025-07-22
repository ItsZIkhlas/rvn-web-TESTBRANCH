import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/registry/new-york-v4/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card";

interface Session {
  id: string;
  average_lap: string; // e.g. "00:02:45.1"
  fastest_lap: string; // e.g. "00:01:23.5"
  total_laps: number;
  avg_lean_angle: number;
  max_lean_angle: number;
  top_speed: number;
  track_name: string;
  track_temperature: string;
  created_at: string; // e.g. "2024-09-29 14:59:58.6+00"
}

function timeToSeconds(lap: string): number {
  const [minStr, secStr] = lap.split(":");
  const min = parseInt(minStr, 10);
  const sec = parseFloat(secStr);
  return min * 60 + sec;
}

function formatDateTime(createdOn: string): { date: string; time: string } {
  const dateObj = new Date(createdOn);
  // Format date as YYYY-MM-DD
  const date = dateObj.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  // Format time as HH:MM:SS
  const time = dateObj.toLocaleTimeString(undefined, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return { date, time };
}

export function SectionCards({ sessions }: { sessions: Session[] }) {
  if (sessions.length < 2) return null;

  // Find session with fastest lap
  const fastest = sessions.reduce((prev: Session, curr: Session) =>
    timeToSeconds(curr.fastest_lap) < timeToSeconds(prev.fastest_lap)
      ? curr
      : prev
  );

  // Find session with highest top speed
  const topSpeedSession = sessions.reduce((prev: Session, curr: Session) =>
    curr.top_speed > prev.top_speed ? curr : prev
  );

  // Latest and second latest sessions (assuming sessions are sorted by created_at ascending)
  const latest = sessions[sessions.length - 1];
  const secondLatest = sessions[sessions.length - 2];

  const latestLap = timeToSeconds(latest.fastest_lap);
  const prevLap = timeToSeconds(secondLatest.fastest_lap);
  const lapDelta = latestLap - prevLap;
  const improving = lapDelta < 0;

  const fastestDateTime = formatDateTime(fastest.created_at);
  const topSpeedDateTime = formatDateTime(topSpeedSession.created_at);
  const latestDateTime = formatDateTime(latest.created_at);
  const secondLatestDateTime = formatDateTime(secondLatest.created_at);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Fastest Lap */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Fastest Lap</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {fastest.fastest_lap.startsWith("00:")
              ? fastest.fastest_lap.slice(3)
              : fastest.fastest_lap}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">{fastest.track_name}</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Fastest lap recorded
          </div>
          <div className="text-muted-foreground">
            {fastestDateTime.date} {fastestDateTime.time}
          </div>
        </CardFooter>
      </Card>

      {/* Top Speed */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Top Speed</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {topSpeedSession.top_speed}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">{topSpeedSession.track_name}</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Highest recorded top speed
          </div>
          <div className="text-muted-foreground">
            {topSpeedDateTime.date} {topSpeedDateTime.time}
          </div>
        </CardFooter>
      </Card>

      {/* Average Lean Angle */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Average Lean Angle</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {latest.avg_lean_angle}°
          </CardTitle>
          <CardAction>
            <Badge variant="outline">{latest.track_name}</Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            From most recent session
          </div>
          <div className="text-muted-foreground">
            {latestDateTime.date} {latestDateTime.time}
          </div>
        </CardFooter>
      </Card>

      {/* Performance Change */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Performance Trend</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {improving
              ? `-${Math.abs(lapDelta).toFixed(2)}s faster`
              : `+${Math.abs(lapDelta).toFixed(2)}s slower`}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="flex items-center gap-1">
              {improving ? <IconTrendingUp /> : <IconTrendingDown />}
              {improving ? "Improving" : "Slowing"}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Compared to previous session
          </div>
          <div className="text-muted-foreground">
            {secondLatest.track_name} → {latest.track_name}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
