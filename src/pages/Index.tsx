
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
          <div className="flex flex-col md:flex-row gap-6 justify-center w-full">
            <Button
              className="flex-1 bg-green-600 text-white text-lg py-6 rounded-xl shadow-lg hover:scale-[1.03] transition-all"
              onClick={() => navigate("/register/restaurant")}
              data-testid="register-restaurant-btn"
            >
              Register Your Restaurant
            </Button>
            <Button
              className="flex-1 bg-amber-500 text-white text-lg py-6 rounded-xl shadow-lg hover:scale-[1.03] transition-all"
              onClick={() => navigate("/register/gardener")}
              data-testid="register-gardener-btn"
            >
              Register Your Garden
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
