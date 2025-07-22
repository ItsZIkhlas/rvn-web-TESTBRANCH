"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/new-york-v4/ui/card";
import { Button } from "@/registry/new-york-v4/ui/button";
import { ScrollArea } from "@/registry/new-york-v4/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york-v4/ui/dialog";
import { Input } from "@/registry/new-york-v4/ui/input";
import { Label } from "@/registry/new-york-v4/ui/label";
import { Calendar, Pencil, X } from "lucide-react";

const initialTrackDays = [
  {
    location: "Laguna Seca",
    date: "2024-08-22",
    time: "09:00",
  },
  {
    location: "Willow Springs",
    date: "2024-08-29",
    time: "10:30",
  },
  {
    location: "Road Atlanta",
    date: "2024-09-05",
    time: "08:45",
  },
  {
    location: "COTA",
    date: "2024-09-12",
    time: "09:15",
  },
];

export default function UpcomingTrackDays() {
  const [trackDays, setTrackDays] = useState(initialTrackDays);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const openEditModal = (index: number) => {
    const track = trackDays[index];
    setLocation(track.location);
    setDate(track.date);
    setTime(track.time);
    setEditIndex(index);
    setIsEditing(true);
  };

  const resetForm = () => {
    setLocation("");
    setDate("");
    setTime("");
    setEditIndex(null);
    setIsEditing(false);
  };

  const addOrUpdateTrackDay = () => {
    if (!location || !date || !time) return;

    if (editIndex !== null) {
      // Update
      const updated = [...trackDays];
      updated[editIndex] = { location, date, time };
      setTrackDays(updated);
    } else {
      // Add
      setTrackDays((prev) => [...prev, { location, date, time }]);
    }

    resetForm();
  };

  const removeTrackDay = (indexToRemove: number) => {
    setTrackDays((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <Card className="w-full max-w-2xl h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Upcoming Track Days</CardTitle>
        <Dialog open={isEditing || undefined} onOpenChange={resetForm}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(false)}
              className="text-muted-foreground"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editIndex !== null ? "Edit Track Day" : "Add New Track Day"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-1">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Laguna Seca"
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <Button onClick={addOrUpdateTrackDay} className="mt-2">
                {editIndex !== null ? "Save Changes" : "Add Track Day"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-100 px-4">
          <ul className="space-y-4 py-4">
            {trackDays.map((track, index) => (
              <li
                key={index}
                className="flex items-center justify-between border border-border rounded-lg px-4 py-3 bg-muted/50"
              >
                <div>
                  <p className="font-medium">{track.location}</p>
                  <p className="text-sm text-muted-foreground">
                    {track.date} · {track.time}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModal(index)}
                    className="text-primary hover:bg-primary/10"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTrackDay(index)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
