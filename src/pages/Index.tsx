import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import CompostBotPreview from "@/components/CompostBotPreview";
import { useNavigate } from "react-router-dom";
import RoleSelectCard from "@/components/RoleSelectCard"; // Ensure this import exists

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-yellow-50 animate-fade-in">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {/* Hero Section */}
        <Hero />

        {/* Move "I am a..." role selection card HERE, right after hero */}
        <div className="w-full flex justify-center mt-2">
          <RoleSelectCard />
        </div>

        {/* The rest of the homepage content */}
        <div className="mt-20 w-full">
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
