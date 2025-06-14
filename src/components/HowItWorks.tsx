
import { Recycle, MapPin, Leaf, Handshake } from "lucide-react";
import React from "react";

const STEPS = [
  {
    title: "Join for Free",
    icon: <Handshake className="text-green-700 w-11 h-11" />,
    desc: "Choose your role & create an account.",
    emoji: "1️⃣"
  },
  {
    title: "List or Find Compost",
    icon: <Recycle className="text-amber-700 w-11 h-11" />,
    desc: "Restaurants post compost offers, gardeners browse local listings.",
    emoji: "2️⃣"
  },
  {
    title: "Connect & Match",
    icon: <MapPin className="text-blue-700 w-11 h-11" />,
    desc: "Smart matching by compost type, location & schedule.",
    emoji: "3️⃣"
  },
  {
    title: "Grow Together",
    icon: <Leaf className="text-lime-700 w-11 h-11" />,
    desc: "Reduce waste, support local, and grow a greener community.",
    emoji: "4️⃣"
  },
];

const Arrow = () => (
  <svg width="44" height="24" className="hidden md:block mx-auto my-2" viewBox="0 0 44 24" fill="none">
    <path d="M2 12h40m0 0l-7-7m7 7l-7 7"
      stroke="#82c77a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
      className="animate-[pulse_1.7s_ease-in-out_infinite]" />
  </svg>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-16 px-4 bg-secondary/60 border-y">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-900">How CompostMatch Works</h2>
      <div className="flex flex-col md:flex-row gap-6 md:gap-0 items-stretch justify-center relative">
        {STEPS.map((step, i) => (
          <React.Fragment key={step.title}>
            <div
              className="group bg-white rounded-xl shadow flex-1 flex flex-col items-center py-8 px-6 mx-0 border border-green-100 hover:shadow-2xl transition-all relative hover:scale-105"
              style={{ zIndex: 2 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl shrink-0 select-none">{step.emoji}</span>
                <span>{step.icon}</span>
              </div>
              <h3 className="font-semibold text-lg mb-1 text-green-800 text-center">{step.title}</h3>
              <p className="text-sm text-gray-600 text-center">{step.desc}</p>
            </div>
            {/* Arrow after each step except last (desktop only) */}
            {i < STEPS.length - 1 && (
              <div className="w-10 md:w-14 flex justify-center items-center mx-[-8px]">
                <Arrow />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
