
// CompostMatch Homepage

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import CompostBotPreview from "@/components/CompostBotPreview";

const Index = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-yellow-50 animate-fade-in">
    <Header />
    <main className="flex-1 flex flex-col">
      <Hero />
      <HowItWorks />
      <Benefits />
      <CompostBotPreview />
    </main>
    {/* Footer can be added in future */}
  </div>
);

export default Index;
