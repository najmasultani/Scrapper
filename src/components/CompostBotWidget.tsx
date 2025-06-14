
import React, { useState } from "react";
import { Bot, MessageCircle } from "lucide-react";

const BOT_KNOWLEDGE = [
  {
    pattern: /what.*(go|can|should).*in.*compost/i,
    answer: "You can compost fruit & veggie scraps, coffee grounds, eggshells, grass clippings, and leaves. Avoid meat, dairy, and oily foods!",
  },
  {
    pattern: /how.*(store|keep).*compost/i,
    answer: "Store kitchen scraps in a sealed container to trap odors. Take them to your outdoor bin every few days. Compost piles should be covered and kept moist, not soggy.",
  },
  {
    pattern: /(tip|tips|advice).*season|summer|winter|spring|fall|autumn/i,
    answer: "In summer, turn compost often and keep it moist. In winter, insulate with extra browns. Each season has its own compost rhythm—ask more!",
  },
  {
    pattern: /citrus|orange|fruit/i,
    answer: "Citrus peels and fruit scraps are OK in moderation, but don’t overdo it (less than 10%) and chop them up for faster breakdown.",
  },
  {
    pattern: /[wW]hy.*compost|[bB]enefit(s)?.*compost/i,
    answer: "Composting reduces landfill waste and creates healthy soil full of nutrients for plants. 🌱",
  },
  {
    pattern: /storage|odor|smell/i,
    answer: "Use a tightly closed bin for kitchen scraps. Add browns like paper or leaves to reduce odors.",
  },
  {
    pattern: /(leaf|leaves|grass|lawn)/i,
    answer: "Leaves and grass add carbon and nitrogen. Shred or mix with food scraps for balance!",
  },
  {
    pattern: /(meat|oily|dairy)/i,
    answer: "Avoid composting meat, dairy, or greasy foods—they attract pests and slow the process.",
  },
];

const DEFAULT_REPLY =
  "I'm CompostBot! Ask me about composting, like what goes in compost, how to store scraps, or for tips any season!";

const CompostBotWidget = ({
  role = "restaurant",
}: {
  role?: "restaurant" | "gardener";
}) => {
  const [history, setHistory] = useState([
    {
      from: "bot",
      text: DEFAULT_REPLY,
    },
  ]);
  const [input, setInput] = useState("");

  const respondBot = (userMsg: string) => {
    let response = "";
    const found = BOT_KNOWLEDGE.find(({ pattern }) => pattern.test(userMsg));
    if (found) {
      response = found.answer;
    } else {
      // fallback: be encouraging and educational
      response =
        "Great question! CompostBot can help with how to compost, what to add or avoid, storage, and more. Please ask about composting topics!";
    }
    setHistory((h) => [
      ...h,
      { from: "me", text: userMsg },
      { from: "bot", text: response },
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    respondBot(input);
    setInput("");
  };

  return (
    <section className="rounded-lg border bg-white p-4 mb-6 flex flex-col gap-2 min-h-[210px] w-full max-w-lg">
      <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
        <Bot className="w-5 h-5" />
        CompostBot
      </div>
      <div className="flex-1 px-1 py-1 overflow-y-auto max-h-52 space-y-2">
        {history.map((msg, i) =>
          msg.from === "bot" ? (
            <div
              key={i}
              className="flex items-start gap-2 text-green-900 bg-green-50/60 px-3 py-1.5 rounded animate-fade-in"
            >
              <Bot className="w-4 h-4 mt-1 mr-1" />
              <span>{msg.text}</span>
            </div>
          ) : (
            <div
              key={i}
              className="flex items-start justify-end gap-2 text-gray-700 bg-amber-50 px-3 py-1.5 rounded ml-auto animate-fade-in"
            >
              <span>{msg.text}</span>
              <MessageCircle className="w-4 h-4 mt-1 ml-1" />
            </div>
          )
        )}
      </div>
      <form
        className="flex gap-2 mt-2"
        onSubmit={handleSend}
        aria-label="Ask CompostBot"
      >
        <input
          className="flex-1 border border-green-200 rounded px-2 py-1 outline-none focus:border-green-400"
          type="text"
          placeholder="Ask CompostBot anything about compost…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition font-semibold"
        >
          Send
        </button>
      </form>
    </section>
  );
};

export default CompostBotWidget;
