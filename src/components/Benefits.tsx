
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
