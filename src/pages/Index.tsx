
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import CompostBotPreview from "@/components/CompostBotPreview";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-yellow-50 animate-fade-in">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col gap-5 mt-16 w-full max-w-xl items-center">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-1 animate-fade-in">
            Get Started With CompostMatch
          </h2>
          <p className="text-center text-muted-foreground text-base mb-4 animate-fade-in delay-75">
            Choose your role to begin connecting with compost partners.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center w-full">
            <Button
              className="flex-1 bg-[#19AA41] hover:bg-[#148d34] text-white text-2xl font-bold py-7 rounded-[2.2rem] shadow-xl transition-all min-w-[260px]"
              style={{ boxShadow: "0 4px 32px 0 rgba(25,170,65,0.11)" }}
              onClick={() => navigate("/dashboard/restaurant")}
              data-testid="goto-dash-restaurant-btn"
            >
              I am a Restaurant
            </Button>
            <Button
              className="flex-1 bg-[#F6A100] hover:bg-[#c88400] text-white text-2xl font-bold py-7 rounded-[2.2rem] shadow-xl transition-all min-w-[260px]"
              style={{ boxShadow: "0 4px 32px 0 rgba(246,161,0,0.11)" }}
              onClick={() => navigate("/dashboard/gardener")}
              data-testid="goto-dash-gardener-btn"
            >
              I am a Gardener
            </Button>
          </div>
        </div>
        {/* Original Homepage Content */}
        <div className="mt-20 w-full">
          <Hero />
          <HowItWorks />
          <Benefits />
          <CompostBotPreview />
        </div>
      </main>
      {/* Footer can be added in future */}
    </div>
  );
};

export default Index;
