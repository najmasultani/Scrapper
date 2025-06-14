
import React, { useState, useMemo } from "react";
import CompostListingCard from "@/components/CompostListingCard";
import CompostFilters from "@/components/CompostFilters";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type RestaurantListing = {
  id: string;
  type: string;
  image: string;
  quantity: string;
  availableDays: string[];
  distance: string;
  owner: string;
  role: string;
  delivery: boolean;
  pickup: boolean;
};

type GardenerProfile = {
  id: string;
  garden_name: string;
  contact_name: string;
  compost_type: string;
  availability_type: string;
  available_dates: string[];
  created_at: string;
};

const fetchRestaurantListings = async () => {
  const { data, error } = await supabase
    .from("restaurant_compost_listings")
    .select("*");
  if (error) throw error;
  return data;
};

const fetchGardenerProfiles = async () => {
  const { data, error } = await supabase
    .from("gardener_profiles")
    .select("*");
  if (error) throw error;
  return data;
};

const CompostListings = () => {
  const [filters, setFilters] = useState({});

  // Fetch restaurant and gardener data in parallel
  const {
    data: restaurantListings,
    isLoading: isRestaurantLoading,
    error: restaurantError,
  } = useQuery({
    queryKey: ["restaurantListings"],
    queryFn: fetchRestaurantListings,
  });

  const {
    data: gardenerProfiles,
    isLoading: isGardenerLoading,
    error: gardenerError,
  } = useQuery({
    queryKey: ["gardenerProfiles"],
    queryFn: fetchGardenerProfiles,
  });

  // Merge both types into a single listings array for rendering
  const listings = useMemo(() => {
    let combined: RestaurantListing[] = [];

    if (restaurantListings) {
      combined = combined.concat(
        restaurantListings.map((r: any) => ({
          id: r.id,
          type: r.compost_type || "Unknown",
          image: "/placeholder.svg",
          quantity: "n/a", // No field for quantity
          availableDays: [r.pickup_availability || "n/a"],
          distance: "n/a", // For demo, no geolocation
          owner: r.restaurant_name || "Unknown Restaurant",
          role: "Restaurant",
          delivery: (r.pickup_availability || "").toLowerCase() === "delivery",
          pickup: (r.pickup_availability || "").toLowerCase() === "pickup",
        }))
      );
    }

    if (gardenerProfiles) {
      combined = combined.concat(
        gardenerProfiles.map((g: GardenerProfile) => ({
          id: g.id,
          type: g.compost_type || "Unknown",
          image: "/placeholder.svg",
          quantity: "n/a", // No explicit field
          availableDays: g.available_dates || [],
          distance: "n/a", // No distance, could be enhanced with location in the future
          owner: g.garden_name || "Gardener/Farmer",
          role: "Gardener",
          delivery: g.availability_type === "delivery",
          pickup: g.availability_type === "pickup",
        }))
      );
    }

    return combined;
  }, [restaurantListings, gardenerProfiles]);

  // Optionally, add loader/error UI
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-yellow-50">
      <header className="w-full px-4 md:px-8 py-6 border-b flex items-center justify-between bg-white">
        <h1 className="text-2xl font-bold text-green-900">Browse Compost Listings</h1>
        <Button variant="outline" asChild>
          <a href="/">Back to Home</a>
        </Button>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Sidebar filters */}
        <div className="w-full md:w-1/4 bg-white border-r p-4">
          <CompostFilters filters={filters} setFilters={setFilters} />
        </div>
        {/* Listings */}
        <main className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(isRestaurantLoading || isGardenerLoading) && (
            <div className="col-span-full text-center text-green-800">Loading listings...</div>
          )}
          {(restaurantError || gardenerError) && (
            <div className="col-span-full text-red-600 text-center">
              Error loading listings. Please try again later.
            </div>
          )}
          {(!isRestaurantLoading && !isGardenerLoading && listings.length === 0) && (
            <div className="col-span-full text-gray-500 text-center">
              No compost listings found.
            </div>
          )}
          {listings.map((listing) => (
            <CompostListingCard key={listing.id} {...listing} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default CompostListings;
