
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Missing or invalid prompt." }), { status: 400, headers: corsHeaders });
    }

    // Gemini-pro API call
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + geminiApiKey, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: prompt }] },
        ],
        safetySettings: [
          { category: "HARM_CATEGORY_DANGEROUS", threshold: "BLOCK_NONE" }
        ]
      }),
    });
    const data = await response.json();

    // Extract the model's reply
    let result = "No response from Gemini.";
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      result = data.candidates[0].content.parts[0].text;
    } else if (data.promptFeedback?.blockReason) {
      result = "Gemini blocked the answer: " + data.promptFeedback.blockReason;
    }

    return new Response(JSON.stringify({ answer: result }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message || "Unknown error" }), { status: 500, headers: corsHeaders });
  }
});
