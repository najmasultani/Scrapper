
import { Utensils, LeafyGreen } from "lucide-react";

const CARDS = [
  {
    title: "For Restaurants & Cafés",
    icon: <Utensils className="text-yellow-700" size={32} />,
    subtitle: "Less waste. More good.",
    bullets: [
      "Cut disposal costs & landfill impact",
      "Support local gardens & farms",
      "Track your impact (Premium)",
    ],
    bg: "bg-yellow-50"
  },
  {
    title: "For Gardeners & Farmers",
    icon: <LeafyGreen className="text-green-700" size={32} />,
    subtitle: "Free, fresh compost!",
    bullets: [
      "Find compost sources nearby",
      "Boost soil health, grow better food",
      "Connect with local restaurants"
    ],
    bg: "bg-green-50"
  }
];

const Benefits = () => (
  <section className="py-16 px-4">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-green-900">Why Join CompostMatch?</h2>
      <div className="grid sm:grid-cols-2 gap-8">
        {CARDS.map(card => (
          <div key={card.title} className={`rounded-2xl shadow ${card.bg} p-8 flex flex-col animate-fade-in`}>
            <div className="flex items-center gap-3 mb-3">
              <div>{card.icon}</div>
              <h3 className="font-semibold text-lg text-green-900">{card.title}</h3>
            </div>
            <div className="mb-2 text-green-700 font-semibold">{card.subtitle}</div>
            <ul className="list-disc ml-6 mt-1 text-gray-700 text-base space-y-1">
              {card.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Benefits;
