import { useState, useCallback } from "react";
import { searchListingsWithAI, generateSearchSuggestions, type CompostListing, type SearchResult } from "@/integrations/gemini/client";
import { useQuery } from "@tanstack/react-query";

export const useCompostSearch = (listings: CompostListing[]) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Generate search suggestions
  const { data: suggestions = [], isLoading: isSuggestionsLoading } = useQuery({
    queryKey: ["searchSuggestions", searchQuery],
    queryFn: () => generateSearchSuggestions(searchQuery),
    enabled: searchQuery.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearchActive(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchListingsWithAI(query, listings);
      setSearchResults(results);
      setIsSearchActive(results.length > 0);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setIsSearchActive(false);
    } finally {
      setIsSearching(false);
    }
  }, [listings]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchActive(false);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    isSearchActive,
    suggestions,
    isSuggestionsLoading,
    performSearch,
    clearSearch,
  };
}; 