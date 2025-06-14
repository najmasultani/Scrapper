
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, TrendingUp, Activity } from "lucide-react";

function OverviewPanel() {
  // All mock data—replace with real user data later
  const user = {
    name: "Cafe Verde",
    role: "Restaurant Partner",
    matches: 7,
    weeklyCompost: 3, // kg
    weeklyPickups: 2,
    impactCO2e: 18.2, // kg CO2e
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Role */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <User className="text-green-600" />
          <CardTitle className="text-base">{user.role}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{user.name}</CardDescription>
        </CardContent>
      </Card>

      {/* Matches Made */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <TrendingUp className="text-yellow-700" />
          <CardTitle className="text-base">{user.matches} Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{user.matches} successful pickups</CardDescription>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Activity className="text-blue-700" />
          <CardTitle className="text-base">
            {user.weeklyCompost} kg listed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{user.weeklyPickups} pickups this week</CardDescription>
        </CardContent>
      </Card>

      {/* Impact Estimate */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Calendar className="text-emerald-600" />
          <CardTitle className="text-base">
            {user.impactCO2e} kg CO₂e
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>GHG diverted (lifetime)</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

function GPTWeeklySummary() {
  // Placeholder: this would be populated by a GPT-4 API call in the future!
  const summary =
    "This week, you diverted 3 kg of organic waste and helped 2 gardeners improve soil quality.";
  return (
    <Card className="my-6 border-l-4 border-green-600 bg-green-50/50">
      <CardContent>
        <div className="text-green-900 flex items-center gap-2">
          <User className="w-4 h-4 text-green-700" />
          <span className="italic">{summary}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function EventsWidget() {
  const [view, setView] = useState<"calendar" | "list">("list");
  // Mock events; replace with actual scheduling logic.
  const events = [
    {
      id: 1,
      type: "pickup",
      with: "Sunrise Diner",
      date: "Thursday",
      time: "3:00 PM",
      status: "scheduled", // "scheduled" | "pending"
    },
    {
      id: 2,
      type: "request",
      with: "Leafy Gardens",
      status: "pending",
    },
  ];

  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Events</CardTitle>
        <div>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("list")}
            className="mr-1"
          >
            List View
          </Button>
          <Button
            variant={view === "calendar" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("calendar")}
          >
            Calendar View
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {view === "list" ? (
          <ul className="space-y-3">
            {events.map((ev) =>
              ev.status === "scheduled" ? (
                <li key={ev.id} className="flex flex-col sm:flex-row sm:items-center bg-green-50 px-4 py-2 rounded-lg">
                  <span>
                    <span className="font-medium">Pickup scheduled</span> with <span className="text-green-800">{ev.with}</span> on <span className="font-semibold">{ev.date}</span> at <span>{ev.time}</span>
                  </span>
                  <Button size="sm" className="ml-auto mt-2 sm:mt-0" variant="outline">
                    Confirm
                  </Button>
                  <Button size="sm" className="ml-2 mt-2 sm:mt-0" variant="secondary">
                    Reschedule
                  </Button>
                </li>
              ) : (
                <li key={ev.id} className="flex flex-col sm:flex-row sm:items-center bg-amber-50 px-4 py-2 rounded-lg">
                  <span>
                    <span className="font-medium">Compost request</span> from <span className="text-green-800">{ev.with}</span> <span className="text-xs text-muted-foreground">pending your approval</span>
                  </span>
                  <Button size="sm" className="ml-auto mt-2 sm:mt-0" variant="default">
                    Approve
                  </Button>
                  <Button size="sm" className="ml-2 mt-2 sm:mt-0" variant="ghost">
                    Decline
                  </Button>
                </li>
              ),
            )}
          </ul>
        ) : (
          <div className="flex items-center justify-center py-8 text-gray-500">
            {/* In a future step, add a calendar component */}
            <span>Calendar view coming soon!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const MyCompostMatchDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-amber-50 p-6 flex flex-col gap-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-green-900 mb-4">My CompostMatch Dashboard</h1>
      <OverviewPanel />
      <GPTWeeklySummary />
      <EventsWidget />
    </div>
  );
};

export default MyCompostMatchDashboard;
