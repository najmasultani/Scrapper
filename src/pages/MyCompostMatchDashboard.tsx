
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, TrendingUp, Activity } from "lucide-react";
import SmartNotificationsPanel from "@/components/SmartNotificationsPanel";
import CompostBotWidget from "@/components/CompostBotWidget";
import CompostTypeChart from "@/components/CompostTypeChart";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// ---------- UTILS

// For demo: assume only one restaurant listing per user
const fetchMyCompostData = async () => {
  // Get current user
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (!user || userErr) throw new Error("No user logged in!");

  // Get user's restaurant listing
  const { data: listing, error } = await supabase
    .from("restaurant_compost_listings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);

  // Fallback if no listing yet
  if (!listing)
    return {
      user,
      listing: null,
      matches: 0,
      weeklyCompost: 0,
      weeklyPickups: 0,
      impactCO2e: 0,
    };

  // Placeholder computations (real metrics need schema/data expansion)
  return {
    user,
    listing,
    matches: 2, // Placeholder: Compute from schema later
    weeklyCompost: 4, // Placeholder
    weeklyPickups: 1, // Placeholder
    impactCO2e: 12.3, // Placeholder
  };
};

function OverviewPanel() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["my-dashboard-data"],
    queryFn: fetchMyCompostData,
  });

  // Animation
  const [showAdded, setShowAdded] = useState(false);
  const [extraKg, setExtraKg] = useState(0);
  const handleAddKg = () => {
    setExtraKg(extraKg + 2);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1400);
  };

  if (isLoading)
    return (
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent>Loading...</CardContent></Card>
        <Card><CardContent></CardContent></Card>
        <Card><CardContent></CardContent></Card>
        <Card><CardContent></CardContent></Card>
      </div>
    );
  if (error)
    return (
      <div className="mb-4">
        <Card>
          <CardContent className="text-red-500">Error: {String(error.message || error)}</CardContent>
        </Card>
      </div>
    );

  const { user, listing, matches, weeklyCompost, weeklyPickups, impactCO2e } =
    data || {};

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      {/* Role */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <User className="text-green-600" />
          <CardTitle className="text-base">
            {listing?.restaurant_name
              ? "Restaurant Partner"
              : "No listing found"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {listing?.restaurant_name || user.email}
          </CardDescription>
        </CardContent>
      </Card>

      {/* Matches Made */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <TrendingUp className="text-yellow-700" />
          <CardTitle className="text-base">
            {matches} Matches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{matches} successful pickups</CardDescription>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Activity className="text-blue-700" />
          <CardTitle className="text-base relative select-none">
            <span>
              {weeklyCompost + extraKg} kg listed
              <button
                className="ml-2 text-xs bg-green-100 rounded px-2 py-0.5 hover:bg-green-200 transition"
                onClick={handleAddKg}
                aria-label="Add compost"
                type="button"
              >
                +2 kg
              </button>
            </span>
            {showAdded && (
              <span className="absolute left-24 -top-6 bg-green-500 text-white rounded px-2 py-1 text-xs animate-fade-in shadow-lg z-10 transition">
                +2 kg added!
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {weeklyPickups} pickups this week
          </CardDescription>
        </CardContent>
      </Card>

      {/* Impact Estimate */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2">
          <Calendar className="text-emerald-600" />
          <CardTitle className="text-base">{impactCO2e + extraKg * 0.6} kg CO₂e</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>GHG diverted (lifetime)</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

function GPTWeeklySummary() {
  // Placeholder: would use GPT-4 for this summary.
  const summary =
    "This week, you diverted 3 kg of organic waste and helped 2 gardeners improve soil quality.";
  return (
    <Card className="mb-6 border-l-4 border-green-600 bg-green-50/50">
      <CardContent>
        <div className="text-green-900 flex items-center gap-2">
          <User className="w-4 h-4 text-green-700" />
          <span className="italic">This week, you diverted organic waste and helped gardeners improve soil quality.</span>
        </div>
      </CardContent>
    </Card>
  );
}

function EventsWidget() {
  const [view, setView] = useState<"calendar" | "list">("list");
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
    <Card className="mb-8">
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
                <li
                  key={ev.id}
                  className="flex flex-col sm:flex-row sm:items-center bg-green-50 px-4 py-2 rounded-lg"
                >
                  <span>
                    <span className="font-medium">Pickup scheduled</span> with{" "}
                    <span className="text-green-800">{ev.with}</span> on{" "}
                    <span className="font-semibold">{ev.date}</span> at{" "}
                    <span>{ev.time}</span>
                  </span>
                  <Button
                    size="sm"
                    className="ml-auto mt-2 sm:mt-0"
                    variant="outline"
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    className="ml-2 mt-2 sm:mt-0"
                    variant="secondary"
                  >
                    Reschedule
                  </Button>
                </li>
              ) : (
                <li
                  key={ev.id}
                  className="flex flex-col sm:flex-row sm:items-center bg-amber-50 px-4 py-2 rounded-lg"
                >
                  <span>
                    <span className="font-medium">Compost request</span> from{" "}
                    <span className="text-green-800">{ev.with}</span>{" "}
                    <span className="text-xs text-muted-foreground">
                      pending your approval
                    </span>
                  </span>
                  <Button
                    size="sm"
                    className="ml-auto mt-2 sm:mt-0"
                    variant="default"
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    className="ml-2 mt-2 sm:mt-0"
                    variant="ghost"
                  >
                    Decline
                  </Button>
                </li>
              )
            )}
          </ul>
        ) : (
          <div className="flex items-center justify-center py-8 text-gray-500">
            {/* Placeholder calendar view */}
            <span>Calendar view coming soon!</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const MyCompostMatchDashboard = () => {
  // For role-adaptive CompostBot, demo as "restaurant" or "gardener"
  const userRole: "restaurant" | "gardener" = "restaurant";

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-amber-50 p-6 flex flex-col gap-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-green-900 mb-2">
        My CompostMatch Dashboard
      </h1>

      <OverviewPanel />

      <GPTWeeklySummary />

      <SmartNotificationsPanel />

      <CompostTypeChart />

      <CompostBotWidget role={userRole} />

      <EventsWidget />
    </div>
  );
};

export default MyCompostMatchDashboard;
