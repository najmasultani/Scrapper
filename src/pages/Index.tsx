import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import CompostBotPreview from "@/components/CompostBotPreview";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RoleSelectCard from "@/components/RoleSelectCard";

const VisualHero = () => (
  <section className="relative w-full bg-gradient-to-br from-green-50 via-white to-yellow-50 px-4 md:px-0 pt-8 pb-4 md:pt-16 md:pb-10">
    <div className="flex flex-col md:flex-row items-center md:items-start justify-between max-w-6xl mx-auto gap-10 md:gap-12">
      {/* Left: Headline and tagline */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-3 animate-fade-in leading-tight">
          <span role="img" aria-label="Leaf" className="mr-2">🍃</span>
          Turn Local Food Waste <br/> Into <span className="text-green-600">Garden Gold</span>
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground mb-7 animate-fade-in delay-75">
          Match compost with local farms &amp; gardens in seconds.
        </p>
      </div>
      {/* Right: Visual - reuse the same SVG/illustration as previous Hero */}
      <div className="flex-1 flex items-center justify-center md:justify-end w-full">
        <div className="relative w-[280px] md:w-[360px] aspect-[1.1/1] animate-fade-in delay-100">
          <svg viewBox="0 0 400 360" fill="none" className="w-full h-full">
            {/* Soil */}
            <ellipse cx="200" cy="320" rx="170" ry="40" fill="#775329"/>
            {/* Sprout */}
            <g>
              <ellipse cx="200" cy="250" rx="16" ry="36" fill="#CAFFDB"/>
              <path d="M200 250C200 218 240 230 225 261C220 266 210 260 200 250Z" fill="#60C67B"/>
              <path d="M200 250C200 218 160 230 175 261C180 266 190 260 200 250Z" fill="#81EA97"/>
              <rect x="192" y="231" width="16" height="62" rx="8" fill="#5D9B5D"/>
            </g>
            {/* Food scraps (banana, coffee, etc) in cartoon style */}
            <g>
              {/* Banana */}
              <path d="M140 170 Q120 200 150 210 Q155 205 143 180 Z" fill="#F9E588"/>
              {/* Apple core */}
              <ellipse cx="180" cy="175" rx="11" ry="16" fill="#F5BBAA"/>
              <ellipse cx="180" cy="175" rx="4" ry="10" fill="#fff"/>
              {/* Coffee grounds */}
              <ellipse cx="235" cy="205" rx="14" ry="6" fill="#4B3228"/>
              {/* Eggshell */}
              <ellipse cx="265" cy="185" rx="14" ry="8" fill="#F9F6EE"/>
              <path d="M265 183 Q270 178 274 185 Q273 186 265 185Z" fill="#E4E1DA"/>
            </g>
            {/* Animated arrow from scraps to soil (decorative) */}
            <path d="M190 220 Q200 285 200 319"
              stroke="#60C67B" strokeWidth="6" strokeDasharray="10 10" markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto">
                <polygon points="0 0, 12 6, 0 12" fill="#60C67B"/>
              </marker>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </section>
);

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-yellow-50 animate-fade-in">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {/* New Visual Hero */}
        <VisualHero />
        {/* Centered Card for role selection */}
        <div className="mt-[-2.5rem] z-10 w-full flex flex-col items-center">
          <RoleSelectCard />
        </div>
        {/* Original Homepage Content */}
        <div className="mt-20 w-full">
          <Hero />
          <HowItWorks />
          <Benefits />
          <CompostBotPreview />
        </div>
      </main>
    </div>
  );
};

export default Index;
