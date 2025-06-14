import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Menu, Calendar, User, TrendingUp, Activity, Leaf } from "lucide-react";
import SmartNotificationsPanel from "@/components/SmartNotificationsPanel";
import CompostBotWidget from "@/components/CompostBotWidget";
import CompostTypeChart from "@/components/CompostTypeChart";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// ---------- UTILS

// Fetch restaurant listing for current user or demo
const fetchMyRestaurantData = async () => {
  // Try for current user
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (!user || userErr) {
    // Not logged in: fetch latest available restaurant
    const { data: restaurants, error } = await supabase
      .from("restaurant_compost_listings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error || !restaurants || restaurants.length === 0)
      return { user: null, restaurant: null, isDemo: true };

    return { user: null, restaurant: restaurants[0], isDemo: true };
  }

  // Get user's restaurant listing (one per user)
  const { data: listing, error } = await supabase
    .from("restaurant_compost_listings")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return { user, restaurant: listing, isDemo: false };
};

// Fetch gardener profile for current user or demo
const fetchMyGardenerData = async () => {
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (!user || userErr) {
    // Not logged in: fetch latest gardener profile
    const { data: gardeners, error } = await supabase
      .from("gardener_profiles")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);

    if (error || !gardeners || gardeners.length === 0)
      return { user: null, gardener: null, isDemo: true };

    return { user: null, gardener: gardeners[0], isDemo: true };
  }

  // Fetch most recent gardener profile for user
  const { data: profile, error } = await supabase
    .from("gardener_profiles")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return { user, gardener: profile, isDemo: false };
};

// Fetch real compost data for chart
const fetchCompostStats = async () => {
  // Try getting user context
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (!user || userErr) return [];
  // Try for restaurant
  const { data: restaurantListing, error: rError } = await supabase
    .from("restaurant_compost_listings")
    .select("compost_type, amount, created_at")
    .eq("user_id", user.id);

  const { data: gardenerProfile, error: gError } = await supabase
    .from("gardener_profiles")
    .select("compost_type, amount, created_at")
    .eq("user_id", user.id);

  // Use amount from DB (default to 0 if missing)
  const entries: { type: string; kg: number }[] = [];
  if (restaurantListing && restaurantListing.length > 0) {
    restaurantListing.forEach((r: any) => {
      entries.push({
        type: r.compost_type,
        kg: Number(r.amount) || 0,
      });
    });
  }
  if (gardenerProfile && gardenerProfile.length > 0) {
    gardenerProfile.forEach((g: any) => {
      entries.push({
        type: g.compost_type,
        kg: Number(g.amount) || 0,
      });
    });
  }
  return entries;
};

// Fetch notifications
const fetchNotifications = async () => {
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (!user || userErr) return [];
  // You would join to event requests or restaurant/gardener reminders if you track these
  // We'll just show a dummy notification if a record exists, else empty array
  const { data: restaurantListing } = await supabase
    .from("restaurant_compost_listings")
    .select("restaurant_name, created_at")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  const { data: gardenerProfile } = await supabase
    .from("gardener_profiles")
    .select("garden_name, created_at")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  let result = [];
  if (restaurantListing) {
    result.push({
      id: 1,
      text: `Hi ${restaurantListing.restaurant_name || "there"}, thanks for being part of CompostMatch!`,
    });
  }
  if (gardenerProfile) {
    result.push({
      id: 2,
      text: `Hello ${gardenerProfile.garden_name || "gardener"}, don't forget to check for new compost matches.`,
    });
  }
  return result;
};

// Fetch events just for logged-in user
const fetchEvents = async () => {
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (!user || userErr) return [];
  // Since no events table exists, return empty (for now)
  return [];
};

function OverviewPanel() {
  // Fetch both types; prioritize gardener if present
  const {
    data: gardenerData,
    isLoading: gardenerLoading,
    error: gardenerErr,
  } = useQuery({
    queryKey: ["my-dashboard-gardener"],
    queryFn: fetchMyGardenerData,
  });

  const {
    data: restaurantData,
    isLoading: restaurantLoading,
    error: restaurantErr,
  } = useQuery({
    queryKey: ["my-dashboard-restaurant"],
    queryFn: fetchMyRestaurantData,
  });

  if (gardenerLoading || restaurantLoading)
    return (
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent>Loading...</CardContent>
        </Card>
        <Card>
          <CardContent></CardContent>
        </Card>
        <Card>
          <CardContent></CardContent>
        </Card>
        <Card>
          <CardContent></CardContent>
        </Card>
      </div>
    );

  // If gardenerErr is *not* "No user logged in!", show error box; otherwise ignore/no error
  if (gardenerErr && !String(gardenerErr.message || gardenerErr).toLowerCase().includes("no user logged in"))
    return (
      <div className="mb-4">
        <Card>
          <CardContent className="text-red-500">
            Error (Gardener): {String(gardenerErr.message || gardenerErr)}
          </CardContent>
        </Card>
      </div>
    );

  if (
    restaurantErr &&
    !String(restaurantErr.message || restaurantErr).toLowerCase().includes("no user logged in")
  )
    return (
      <div className="mb-4">
        <Card>
          <CardContent className="text-red-500">
            Error (Restaurant): {String(restaurantErr.message || restaurantErr)}
          </CardContent>
        </Card>
      </div>
    );

  // If user has a gardener profile (priority)
  if (gardenerData?.gardener) {
    const { gardener, isDemo } = gardenerData;
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Leaf className="text-green-600" />
            <CardTitle className="text-base">
              Gardener / Farmer {isDemo ? <span className="text-xs text-amber-600 font-normal">(Demo)</span> : null}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div className="font-semibold">{gardener.garden_name}</div>
              <div className="text-xs mt-1 text-muted-foreground">
                {gardener.contact_name}
              </div>
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <TrendingUp className="text-yellow-700" />
            <CardTitle className="text-base">Compost Wanted</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{gardener.compost_type}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Activity className="text-blue-700" />
            <CardTitle className="text-base capitalize">
              {gardener.availability_type}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <span className="block mb-1 font-medium">Available Dates:</span>
              {gardener.available_dates.length > 0 ? (
                <ul className="list-disc ml-5">
                  {gardener.available_dates.map((d: string | Date, i: number) => (
                    <li key={i}>
                      {typeof d === "string"
                        ? new Date(d).toLocaleDateString()
                        : d.toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <span>No dates listed.</span>
              )}
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Calendar className="text-emerald-600" />
            <CardTitle className="text-base">Profile Created</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {gardener.created_at
                ? new Date(gardener.created_at).toLocaleString()
                : "-"}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Otherwise, if user has a restaurant listing
  if (restaurantData?.restaurant) {
    const { user, restaurant, isDemo } = restaurantData;
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <User className="text-green-600" />
            <CardTitle className="text-base">
              Restaurant Partner {isDemo ? <span className="text-xs text-amber-600 font-normal">(Demo)</span> : null}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {restaurant.restaurant_name || (user && user.email) || "N/A"}
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <TrendingUp className="text-yellow-700" />
            <CardTitle className="text-base">Compost Type</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{restaurant.compost_type}</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Activity className="text-blue-700" />
            <CardTitle className="text-base capitalize">
              {restaurant.pickup_availability}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <div className="font-semibold">Address:</div>
              <div className="text-xs">{restaurant.location}</div>
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Calendar className="text-emerald-600" />
            <CardTitle className="text-base">Listing Created</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {restaurant.created_at
                ? new Date(restaurant.created_at).toLocaleString()
                : "-"}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No data yet (for anyone)
  return (
    <div className="mb-4">
      <Card>
        <CardContent>
          <span className="text-gray-500">
            No profile or listing found in the system yet.
          </span>
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

// Menu Dropdown Component
function DashboardMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative z-30">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        className="rounded-full"
        onClick={() => setOpen((v) => !v)}
      >
        <Menu className="w-6 h-6" />
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2 animate-fade-in">
          <a
            href="/dashboard"
            className="block px-4 py-2 text-green-900 hover:bg-green-100 rounded"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </a>
          <a
            href="/listings"
            className="block px-4 py-2 text-green-900 hover:bg-green-100 rounded"
            onClick={() => setOpen(false)}
          >
            Browse Compost Listings
          </a>
          <a
            href="/register/restaurant"
            className="block px-4 py-2 text-green-900 hover:bg-green-100 rounded"
            onClick={() => setOpen(false)}
          >
            I am a Restaurant
          </a>
          <a
            href="/register/gardener"
            className="block px-4 py-2 text-green-900 hover:bg-green-100 rounded"
            onClick={() => setOpen(false)}
          >
            I am a Gardener
          </a>
        </div>
      )}
    </div>
  );
}

function EventsWidget({ events }: { events: any[] }) {
  const [view, setView] = useState<"calendar" | "list">("list");
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
            {events && events.length > 0 ? events.map((ev) =>
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
            )
            : (
              <li className="text-gray-500 italic px-4 py-2">No upcoming events found.</li>
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

  // Fetch real compost data for chart
  const { data: compostStats = [], isLoading: compostLoading } = useQuery({
    queryKey: ["my-compost-stats"],
    // Instead of faking kg, use amount from the listings/profiles directly
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];
      const { data: restaurantListing = [] } = await supabase
        .from("restaurant_compost_listings")
        .select("compost_type, amount, created_at")
        .eq("user_id", user.id);

      const { data: gardenerProfile = [] } = await supabase
        .from("gardener_profiles")
        .select("compost_type, amount, created_at")
        .eq("user_id", user.id);

      // Use amount from DB (default to 0 if missing)
      const entries: { type: string; kg: number }[] = [];
      restaurantListing.forEach((r: any) => {
        entries.push({
          type: r.compost_type,
          kg: Number(r.amount) || 0,
        });
      });
      gardenerProfile.forEach((g: any) => {
        entries.push({
          type: g.compost_type,
          kg: Number(g.amount) || 0,
        });
      });
      return entries;
    },
  });

  // Fetch notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ["dashboard-notifications"],
    queryFn: fetchNotifications,
  });

  // Fetch events
  const { data: events = [] } = useQuery({
    queryKey: ["dashboard-events"],
    queryFn: fetchEvents,
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-amber-50 p-6 flex flex-col gap-6 animate-fade-in">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-green-900">
          My CompostMatch Dashboard
        </h1>
        <DashboardMenu />
      </div>

      <OverviewPanel />

      <GPTWeeklySummary />

      <SmartNotificationsPanel notifications={notifications} />

      <CompostTypeChart data={compostStats} loading={compostLoading} />

      <CompostBotWidget role={userRole} />

      <EventsWidget events={events} />
    </div>
  );
};

export default MyCompostMatchDashboard;
