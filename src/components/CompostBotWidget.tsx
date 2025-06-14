
import React, { useState } from "react";
import { Bot, MessageCircle } from "lucide-react";

const BOT_RESPONSES = {
  restaurant: [
    {
      id: 0,
      message:
        "It’s summer! 🌞 For restaurants, remember: turn your kitchen compost every 3 days and store scraps in a cool, sealed bin to keep odors down.",
    },
    {
      id: 1,
      message:
        "Great job! Your compost reduced landfill waste and helped local farmers enrich their soil. 🌱💡",
    },
  ],
  gardener: [
    {
      id: 0,
      message:
        "It’s summer! ☀️ Give your outdoor compost a good stir weekly to keep things fresh.",
    },
    {
      id: 1,
      message:
        "Did you know? Adding dry leaves helps balance moisture in your compost! 🍂",
    },
  ],
};

const CompostBotWidget = ({
  role = "restaurant",
}: {
  role?: "restaurant" | "gardener";
}) => {
  const [history, setHistory] = useState([
    {
      from: "bot",
      text:
        role === "restaurant"
          ? BOT_RESPONSES.restaurant[0].message
          : BOT_RESPONSES.gardener[0].message,
    },
  ]);
  const [input, setInput] = useState("");

  const respondBot = (userMsg: string) => {
    // Demo: picks a response, in real case use LLM API.
    let response: string;
    if (/citrus|orange|fruit/i.test(userMsg)) {
      response =
        role === "restaurant"
          ? "Citrus is OK in moderation—keep under 10% of your compost pile. 🍊"
          : "Gardeners: Citrus is great for soil acidity, but use sparingly. 🌱🍋";
    } else if (/tip|advice|summer|stir/i.test(userMsg)) {
      response =
        role === "restaurant"
          ? BOT_RESPONSES.restaurant[0].message
          : BOT_RESPONSES.gardener[0].message;
    } else {
      response =
        role === "restaurant"
          ? BOT_RESPONSES.restaurant[1].message
          : BOT_RESPONSES.gardener[1].message;
    }
    setHistory((h) => [...h, { from: "me", text: userMsg }, { from: "bot", text: response }]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    respondBot(input);
    setInput("");
  };

  return (
    <section className="rounded-lg border bg-white p-4 mb-6 flex flex-col gap-2 min-h-[210px]">
      <div className="flex items-center gap-2 text-green-800 font-bold mb-2">
        <Bot className="w-5 h-5" />
        CompostBot
      </div>
      <div className="flex-1 px-1 py-1 overflow-y-auto max-h-48 space-y-2">
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
          placeholder="Ask CompostBot..."
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
