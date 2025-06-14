import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export type SearchResult = {
  id: string;
  relevanceScore: number;
  matchedFields: string[];
  explanation: string;
};

export type CompostListing = {
  id: string;
  type: string;
  owner: string;
  role: string;
  availableDays: string[];
  delivery: boolean;
  pickup: boolean;
  distance: string;
  quantity: string;
};

// Fallback search function that works without AI
export function fallbackSearch(query: string, listings: CompostListing[]): SearchResult[] {
  if (!query.trim()) return [];
  
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
  
  return listings
    .map(listing => {
      let score = 0;
      const matchedFields: string[] = [];
      
      // Search in type
      if (listing.type.toLowerCase().includes(query.toLowerCase())) {
        score += 40;
        matchedFields.push('type');
      }
      
      // Search in owner
      if (listing.owner.toLowerCase().includes(query.toLowerCase())) {
        score += 30;
        matchedFields.push('owner');
      }
      
      // Search in role
      if (listing.role.toLowerCase().includes(query.toLowerCase())) {
        score += 20;
        matchedFields.push('role');
      }
      
      // Search in available days
      const availableDaysText = listing.availableDays.join(' ').toLowerCase();
      if (availableDaysText.includes(query.toLowerCase())) {
        score += 15;
        matchedFields.push('availableDays');
      }
      
      // Partial matches for individual terms
      searchTerms.forEach(term => {
        if (listing.type.toLowerCase().includes(term)) score += 10;
        if (listing.owner.toLowerCase().includes(term)) score += 8;
        if (listing.role.toLowerCase().includes(term)) score += 5;
        if (availableDaysText.includes(term)) score += 3;
      });
      
      return {
        id: listing.id,
        relevanceScore: Math.min(score, 100),
        matchedFields,
        explanation: `Matched ${matchedFields.length > 0 ? matchedFields.join(', ') : 'partial terms'} in listing`
      };
    })
    .filter(result => result.relevanceScore >= 10)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}

export async function searchListingsWithAI(
  query: string,
  listings: CompostListing[]
): Promise<SearchResult[]> {
  if (!query.trim() || listings.length === 0) {
    return [];
  }

  // Check if API key is available
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    console.warn("Gemini API key not found, using fallback search");
    return fallbackSearch(query, listings);
  }

  try {
    // Create a structured prompt for the AI to analyze listings
    const prompt = `
You are a smart search assistant for a compost marketplace. Analyze the following search query and listings to find the most relevant matches.

Search Query: "${query}"

Listings to analyze:
${listings.map((listing, index) => `
${index + 1}. ID: ${listing.id}
   Type: ${listing.type}
   Owner: ${listing.owner}
   Role: ${listing.role}
   Available Days: ${listing.availableDays.join(", ")}
   Delivery: ${listing.delivery ? "Yes" : "No"}
   Pickup: ${listing.pickup ? "Yes" : "No"}
   Distance: ${listing.distance}
   Quantity: ${listing.quantity}
`).join("")}

Please analyze each listing and return a JSON array of results. For each relevant listing, include:
- id: the listing ID
- relevanceScore: a number from 0-100 indicating how well it matches the query
- matchedFields: array of field names that matched (e.g., ["type", "owner", "availableDays"])
- explanation: a brief explanation of why this listing matches the query

Only include listings with a relevanceScore of 30 or higher. Sort by relevanceScore in descending order.

Return only valid JSON, no additional text or formatting.
`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the AI response
    try {
      // Clean up the response text by removing markdown code blocks and any other formatting
      const cleanText = text
        .replace(/```json\n?|\n?```/g, '') // Remove markdown code blocks
        .replace(/^[\s\n]+|[\s\n]+$/g, '') // Trim whitespace and newlines
        .replace(/^\[|\]$/g, ''); // Remove array brackets if present
      
      const searchResults = JSON.parse(cleanText) as SearchResult[];
      return searchResults.filter(result => result.relevanceScore >= 30);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.log("Raw AI response:", text);
      console.warn("Falling back to basic search");
      return fallbackSearch(query, listings);
    }
  } catch (error) {
    console.error("Error searching with AI:", error);
    console.warn("Falling back to basic search");
    return fallbackSearch(query, listings);
  }
}

export async function generateSearchSuggestions(query: string): Promise<string[]> {
  if (!query.trim()) {
    return [
      "coffee grounds for garden",
      "vegetable scraps near me",
      "restaurant food waste pickup",
      "organic compost delivery",
      "fruit peels for composting"
    ];
  }

  // Check if API key is available
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    // Return basic suggestions based on query
    const basicSuggestions = [
      `${query} for garden`,
      `${query} pickup`,
      `${query} delivery`,
      `organic ${query}`,
      `${query} compost`
    ];
    return basicSuggestions.slice(0, 5);
  }

  try {
    const prompt = `
Based on the search query "${query}" for a compost marketplace, suggest 5 related search terms that users might find helpful.
The marketplace connects restaurants with food waste to gardeners/farmers who need compost materials.

Return only a JSON array of strings, no additional text.
Example: ["coffee grounds for garden", "vegetable scraps pickup", "organic waste delivery"]
`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      const suggestions = JSON.parse(text) as string[];
      return suggestions.slice(0, 5);
    } catch (parseError) {
      console.error("Failed to parse suggestions:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return [];
  }
} 