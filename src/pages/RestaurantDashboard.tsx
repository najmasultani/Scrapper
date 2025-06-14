import MyCompostMatchDashboard from "./MyCompostMatchDashboard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RestaurantDashboard = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-amber-50 p-6 flex flex-col gap-6 animate-fade-in">
      <div className="mb-2">
        <Link to="/create-batch" aria-label="Upload Compost Listing">
          <Button className="mb-4 w-full sm:w-auto" aria-label="Upload Compost Listing">
            + Upload Compost Listing
          </Button>
        </Link>
      </div>
      <MyCompostMatchDashboard role="restaurant" demo />
    </div>
  );
};

export default RestaurantDashboard;
