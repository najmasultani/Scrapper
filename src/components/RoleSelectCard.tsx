
import { Carrot, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import React from "react";

const RoleSelectCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-xl bg-white/70 p-8 rounded-2xl shadow-xl flex flex-col items-center gap-6 border border-green-100 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-0">
        I am a...
      </h2>
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <Button
          className="flex-1 flex flex-col items-center justify-center gap-3 bg-green-600 text-white text-lg py-7 rounded-xl shadow-lg hover:scale-[1.05] transition-all"
          onClick={() => navigate("/dashboard/restaurant")}
          data-testid="demo-restaurant-btn"
        >
          <span className="text-4xl mb-1"><Utensils className="inline w-9 h-9" strokeWidth={2.5}/></span>
          <span className="font-bold">I want to give compost</span>
          <span className="text-base opacity-70">For restaurants, cafés, etc.</span>
        </Button>
        <Button
          className="flex-1 flex flex-col items-center justify-center gap-3 bg-amber-500 text-white text-lg py-7 rounded-xl shadow-lg hover:scale-[1.05] transition-all"
          onClick={() => navigate("/dashboard/gardener")}
          data-testid="demo-gardener-btn"
        >
          <span className="text-4xl mb-1"><Carrot className="inline w-9 h-9" strokeWidth={2.5}/></span>
          <span className="font-bold">I want to receive compost</span>
          <span className="text-base opacity-70">For gardeners, farmers, schools…</span>
        </Button>
      </div>
    </div>
  );
};

export default RoleSelectCard;
