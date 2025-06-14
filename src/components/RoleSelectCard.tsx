
import React from "react";
import { useNavigate } from "react-router-dom";

const RoleSelectCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/90 rounded-2xl shadow-lg border border-green-100 w-full max-w-xl flex flex-col items-center py-8 px-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-green-800 mb-6">I am a...</h2>
      <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
        <button
          className="flex-1 bg-green-600 text-white text-lg py-5 rounded-xl shadow-md hover:scale-[1.03] transition-all flex flex-col items-center gap-2 font-semibold"
          onClick={() => navigate("/dashboard/restaurant")}
          data-testid="demo-restaurant-btn"
        >
          <span className="text-3xl">🍽️</span>
          Restaurant
        </button>
        <button
          className="flex-1 bg-amber-500 text-white text-lg py-5 rounded-xl shadow-md hover:scale-[1.03] transition-all flex flex-col items-center gap-2 font-semibold"
          onClick={() => navigate("/dashboard/gardener")}
          data-testid="demo-gardener-btn"
        >
          <span className="text-3xl">🥕</span>
          Gardener / Farmer
        </button>
      </div>
    </div>
  );
};

export default RoleSelectCard;
