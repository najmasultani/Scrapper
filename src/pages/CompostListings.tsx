
import React, { useState } from "react";
import CompostListingCard from "@/components/CompostListingCard";
import CompostFilters from "@/components/CompostFilters";
import { Button } from "@/components/ui/button";

const SAMPLE_LISTINGS = [
  {
    id: 1,
    type: "Fruit & Veg Scraps",
    image: "/placeholder.svg",
    quantity: "3 kg/week",
    availableDays: ["Monday", "Thursday"],
    distance: "2.5 km",
    owner: "Cafe Verde",
    role: "Restaurant",
    delivery: false,
    pickup: true,
  },
  {
    id: 2,
    type: "Coffee Grounds",
    image: "/placeholder.svg",
    quantity: "1.5 kg/week",
    availableDays: ["Daily"],
    distance: "1.1 km",
    owner: "Daily Grind",
    role: "Cafe",
    delivery: true,
    pickup: false,
  },
  {
    id: 3,
    type: "Eggshells",
    image: "/placeholder.svg",
    quantity: "0.5 kg/week",
    availableDays: ["Saturday"],
    distance: "3.9 km",
    owner: "Sunrise Diner",
    role: "Restaurant",
    delivery: false,
    pickup: true,
  },
];

const CompostListings = () => {
  const [filters, setFilters] = useState({});
  // You can later add a filtered listings state here

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
          {SAMPLE_LISTINGS.map(listing => (
            <CompostListingCard key={listing.id} {...listing} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default CompostListings;
