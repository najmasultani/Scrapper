import { Bot } from "lucide-react";
import CompostBotWidget from "./CompostBotWidget";

const CompostBotPreview = () => (
  <section className="px-4 py-14 bg-gradient-to-r from-green-50 via-amber-50 to-green-100 border-t flex justify-center">
    <div className="max-w-3xl mx-auto w-full rounded-2xl shadow-lg bg-white/90 flex flex-col items-center md:flex-row gap-6 p-8 animate-fade-in">
      <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-green-200/60 mb-4 md:mb-0">
        <Bot size={36} className="text-green-800" />
      </div>
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-xl font-bold text-green-900 mb-1">Meet CompostBot</h3>
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
