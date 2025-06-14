
import React, { useState } from "react";
import { Bot, MessageCircle, Loader2 } from "lucide-react";

// Remove static BOT_KNOWLEDGE and DEFAULT_REPLY, now powered by Gemini

const CompostBotWidget = ({
  role = "restaurant",
}: {
  role?: "restaurant" | "gardener";
}) => {
  const [history, setHistory] = useState([
    {
      from: "bot",
      text: "I'm CompostBot! Ask me anything about composting—I'll answer with help from Gemini AI.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const respondBot = async (userMsg: string) => {
    setLoading(true);
    setHistory((h) => [...h, { from: "me", text: userMsg }]);
    try {
      const resp = await fetch(
        "https://wvcdthcsztdlkhgvyxcv.supabase.co/functions/v1/ask-gemini",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: userMsg }),
        }
      );
      const { answer, error } = await resp.json();
      setHistory((h) => [
        ...h,
        {
          from: "bot",
          text: answer
            ? answer
            : error
            ? `Sorry, something went wrong: ${error}`
            : "Sorry, I couldn't answer your question.",
        },
      ]);
    } catch (e: any) {
      setHistory((h) => [
        ...h,
        { from: "bot", text: "Sorry, there was an error: " + String(e) },
      ]);
    }
    setLoading(false);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    await respondBot(input);
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
        {loading && (
          <div className="flex items-center gap-2 text-green-800 bg-green-50 px-3 py-1.5 rounded animate-fade-in">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>CompostBot is thinking…</span>
          </div>
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
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition font-semibold"
          disabled={loading}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
        </button>
      </form>
    </section>
  );
};

export default CompostBotWidget;
