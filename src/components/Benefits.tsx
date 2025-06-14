
const CARDS = [
  {
    title: "For Restaurants & Cafés",
    emoji: "🍽️",
    subtitle: "Less waste. More good.",
    bullets: [
      "Cut disposal costs & landfill impact 🗑️",
      "Support local gardens & farms 🌱",
      "Track your impact (Premium) 📊",
    ],
    bg: "bg-green-50"
  },
  {
    title: "For Gardeners & Farmers",
    emoji: "🥕",
    subtitle: "Free, fresh compost!",
    bullets: [
      "Find compost sources nearby 📍",
      "Boost soil health, grow better food 🍅",
      "Connect with local restaurants 👩‍🍳"
    ],
    bg: "bg-white"
  }
];

const Benefits = () => (
  <section className="py-16 px-4">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-green-900">Why Join CompostMatch?</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {CARDS.map((card, idx) => (
          <div key={card.title} className={`rounded-2xl shadow-xl ${card.bg} p-9 flex flex-col items-center animate-fade-in border border-green-100`}>
            <div className="flex flex-col items-center gap-2 mb-3">
              <span className="text-5xl drop-shadow">{card.emoji}</span>
              <h3 className="font-semibold text-xl text-green-900">{card.title}</h3>
            </div>
            <div className="mb-2 text-green-700 font-semibold text-base">{card.subtitle}</div>
            <ul className="list-disc ml-4 mt-1 text-gray-700 text-base space-y-2 w-full">
              {card.bullets.map(b => (
                <li key={b} className="flex items-center gap-2">{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
</lov_write>

---
### 4. CompostBot Preview: Branded Title & Animation

<lov-write file_path="src/components/CompostBotPreview.tsx">
import { Bot } from "lucide-react";
import CompostBotWidget from "./CompostBotWidget";
import React from "react";

const CompostBotPreview = () => (
  <section className="px-4 py-14 bg-gradient-to-r from-green-50 via-amber-50 to-green-100 border-t flex justify-center">
    <div className="max-w-3xl mx-auto w-full rounded-2xl shadow-lg bg-white/90 flex flex-col items-center md:flex-row gap-6 p-8 animate-fade-in border border-green-100">
      <div className="flex-shrink-0 flex flex-col items-center justify-center w-24 relative group">
        <span
          className="block text-5xl mb-1 animate-[bounce_2s_infinite] drop-shadow"
          aria-label="CompostBot"
        >🤖</span>
        <span className="absolute left-16 top-6 bg-white rounded-xl shadow border px-4 py-2 text-green-800 font-semibold text-base animate-fade-in z-10 hidden md:block">
          💬 “Can I compost citrus peels?”<br/><span className="text-green-600">Yes! But in moderation.</span>
        </span>
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl font-bold text-green-900 mb-1 flex gap-2 items-center">
          🤖 <span>CompostBot, Your Smart Garden Assistant</span>
        </h3>
        <div className="text-green-700 mb-2">Your friendly compost guide.</div>
        <ul className="text-gray-700 mb-3 text-base list-disc pl-5">
          <li>What goes in compost?</li>
          <li>How to store kitchen scraps?</li>
          <li>Seasonal composting tips</li>
        </ul>
        <div className="mt-2">
          <CompostBotWidget />
        </div>
      </div>
    </div>
  </section>
);

export default CompostBotPreview;
