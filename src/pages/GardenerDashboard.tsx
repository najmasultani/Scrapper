import MyCompostMatchDashboard from "./MyCompostMatchDashboard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GardenerDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-amber-50 p-6 flex flex-col gap-6 animate-fade-in">
      <div className="mb-2">
        <Link to="/listings" aria-label="Browse Compost Listings">
          <Button variant="secondary" className="mb-4 w-full sm:w-auto" aria-label="Browse Compost Listings">
            Browse Compost Listings
          </Button>
        </Link>
      </div>
      <MyCompostMatchDashboard role="gardener" demo />
    </div>
  );
};

export default GardenerDashboard;
