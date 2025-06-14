
import React, { useState } from "react";
import { Bot, MessageCircle } from "lucide-react";

// Expanded bot knowledge base with enhanced compost education content
const BOT_KNOWLEDGE = [
  // 💚 What can go in compost
  {
    pattern: /(what\s*(can|go|goes|should)\s*(i\s*)?(put|add)?\s*(in|into)?\s*compost|compostable|compost\s*items|fruit|vegetable|scrap|egg|coffee|tea|yard|napkin|paper)/i,
    answer:
      "🟩 You can compost: fruit & vegetable scraps, coffee grounds & filters, tea bags (avoid those with plastic), eggshells, yard trimmings, leaves, grass clippings, and plain paper napkins/towels.",
  },
  // ❌ What can't go in compost
  {
    pattern: /(what.*(can't|can not|cannot|shouldn't|should not).*compost|not.*in.*compost|meat|fish|bones|dairy|oily|greasy|plastic|synthetic|chemically-treated|glossy|colored\s*paper)/i,
    answer:
      "❌ Avoid composting: meat, fish, bones, dairy products, oily or greasy food waste, plastics or synthetic materials, chemically-treated wood, and glossy or colored paper.",
  },
  // 🍂 Composting tips by season
  {
    pattern: /(tip|tips|advice|how).*season|summer|winter|spring|fall|autumn/i,
    answer:
      "🍂 Composting Tips by Season:\n- Summer: Stir pile weekly; manage smell with extra 'browns' like leaves.\n- Winter: Composting slows; keep adding scraps but cover them well.\n- Spring: Perfect time to use finished compost in your garden.\n- Fall: Fallen leaves are carbon gold—mix them with kitchen scraps!",
  },
  // 🧪 Compost types and qualities
  {
    pattern: /(type|types|quality|qualities|green.*brown|balance|ratio|nitrogen|carbon)/i,
    answer:
      "🧪 Compost Types & Balance: Green materials (nitrogen) include food scraps & grass. Brown materials (carbon) include leaves, paper, straw. Aim for a 2:1 ratio of browns to greens for best results!",
  },
  // 🐛 Common problems & fixes
  {
    pattern: /(problem|issue|problem:|smell|smells|bad|not breaking down|too dry|too wet|pest|flies|rodent|animal|slow)/i,
    answer:
      "🐛 Common Compost Problems:\n- Smells bad? Likely too much green/wet. Add more browns (leaves/paper) and turn the pile.\n- Not breaking down? May be too dry/cold. Add moisture and mix more.\n- Attracting pests? Avoid meat/dairy and always cover food scraps with browns.",
  },
  // Specific: fruit, citrus etc
  {
    pattern: /citrus|orange|lemon|fruit/i,
    answer:
      "Citrus peels and other fruit scraps are okay in moderation—keep them under 10% of your total compost and chop up large pieces for faster breakdown.",
  },
  // Storage/storing compost
  {
    pattern: /(how.*store|store.*compost|keep.*compost|storage|odor|smell)/i,
    answer:
      "Store kitchen scraps in a sealed container to trap odors, and transfer them to your outdoor bin regularly. Add 'browns' like paper or leaves to reduce odor.",
  },
  // Leaves/grass/lawn
  {
    pattern: /(leaf|leaves|grass|lawn|clippings)/i,
    answer: "Leaves and grass clippings are great carbon and nitrogen sources—shred and mix them with food scraps for a balanced compost.",
  },
  // Benefits/why compost
  {
    pattern: /(why|benefit|advantages).*compost/i,
    answer: "Composting diverts waste from landfills and creates nutrient-rich soil for your garden. 🌱",
  },
  // General fallback, educator mode
];

const DEFAULT_REPLY =
  "I'm CompostBot! Ask me about composting—what goes in, storage tips, balancing your compost pile, common problems, or how to keep it healthy year-round!";

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
        "Great question! CompostBot can help with:\n🟩 What goes in (or stays out of) compost\n🍂 How to store compost scraps\n🧪 The ideal brown/green balance\n🐛 Fixing common problems\nSeasonal composting tips, and more! Please ask anything about composting.";
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
              className="flex items-start gap-2 text-green-900 bg-green-50/60 px-3 py-1.5 rounded animate-fade-in whitespace-pre-line"
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
