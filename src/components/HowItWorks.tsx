
import { Recycle, MapPin, Leaf, Handshake } from "lucide-react";

const STEPS = [
  {
    title: "Join for Free",
    icon: <Handshake className="text-green-700" size={36} />,
    desc: "Choose your role & create an account.",
  },
  {
    title: "List or Find Compost",
    icon: <Recycle className="text-amber-700" size={36} />,
    desc: "Restaurants post compost offers, gardeners browse local listings.",
  },
  {
    title: "Connect & Match",
    icon: <MapPin className="text-blue-700" size={36} />,
    desc: "Smart matching by compost type, location & schedule.",
  },
  {
    title: "Grow Together",
    icon: <Leaf className="text-lime-700" size={36} />,
    desc: "Reduce waste, support local, and grow a greener community.",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-16 px-4 bg-secondary/60 border-y">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-green-900">How CompostMatch Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="bg-white rounded-xl shadow flex flex-col items-center py-8 px-6
            transition-all hover:shadow-lg animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="font-semibold text-lg mb-2 text-green-800">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
