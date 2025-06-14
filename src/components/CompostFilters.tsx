
import React from "react";
import { Button } from "@/components/ui/button";

type CompostFiltersProps = {
  filters: any;
  setFilters: (filters: any) => void;
};

const compostTypes = [
  "All",
  "Fruit & Veg Scraps",
  "Coffee Grounds",
  "Eggshells",
];

const roles = ["All", "Restaurant", "Farmer", "Gardener"];

const deliveryPickup = ["Any", "Pickup", "Delivery"];

const CompostFilters: React.FC<CompostFiltersProps> = ({ filters, setFilters }) => {
  // Placeholder; proper filtering logic can be added later
  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-green-900">Filters</h2>
      <div className="mb-3">
        <label className="text-sm font-semibold">Compost Type</label>
        <select className="w-full mt-1 p-2 border rounded"
          onChange={e => setFilters({ ...filters, type: e.target.value })}>
          {compostTypes.map(type => (
            <option key={type} value={type === "All" ? "" : type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="text-sm font-semibold">Role</label>
        <select className="w-full mt-1 p-2 border rounded"
          onChange={e => setFilters({ ...filters, role: e.target.value })}>
          {roles.map(role => (
            <option key={role} value={role === "All" ? "" : role}>{role}</option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="text-sm font-semibold">Distance (km)</label>
        <input className="w-full mt-1 p-2 border rounded" type="number" min={0} max={50}
          placeholder="Any"
          onChange={e => setFilters({ ...filters, distance: e.target.value })} />
      </div>
      <div className="mb-3">
        <label className="text-sm font-semibold">Delivery/Pickup</label>
        <select className="w-full mt-1 p-2 border rounded"
          onChange={e => setFilters({ ...filters, deliveryPickup: e.target.value })}>
          {deliveryPickup.map(option => (
            <option key={option} value={option === "Any" ? "" : option}>{option}</option>
          ))}
        </select>
      </div>
      <Button variant="outline" className="mt-2 w-full"
        onClick={() => setFilters({})}>
        Reset Filters
      </Button>
    </div>
  );
};

export default CompostFilters;
