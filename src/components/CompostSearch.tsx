import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, X } from "lucide-react";
import { searchListingsWithAI, generateSearchSuggestions, type CompostListing, type SearchResult } from "@/integrations/gemini/client";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import SearchDemo from "./SearchDemo";

type CompostSearchProps = {
  listings: CompostListing[];
  onSearchResults: (results: SearchResult[]) => void;
  isLoading?: boolean;
};

const CompostSearch: React.FC<CompostSearchProps> = ({
  listings,
  onSearchResults,
  isLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Generate search suggestions
  const { data: suggestions = [] } = useQuery({
    queryKey: ["searchSuggestions", searchQuery],
    queryFn: () => generateSearchSuggestions(searchQuery),
    enabled: searchQuery.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (!query.trim()) {
        onSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const results = await searchListingsWithAI(query, listings);
        onSearchResults(results);
      } catch (error) {
        console.error("Search error:", error);
        onSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 800),
    [listings, onSearchResults]
  );

  // Trigger search when query changes
  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      debouncedSearch.cancel();
      debouncedSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleExampleClick = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearchResults([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-6">
      {/* Show demo when search is empty */}
      {!searchQuery && (
        <SearchDemo onExampleClick={handleExampleClick} />
      )}
      
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search compost listings with natural language... (e.g., 'coffee grounds for my vegetable garden')"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10 pr-20 py-3 text-base border-2 border-green-200 focus:border-green-400 rounded-lg"
            disabled={isLoading}
          />
          {searchQuery && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-12 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || isSearching || !searchQuery.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700"
          >
            {isSearching ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && searchQuery.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>AI-powered suggestions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-green-100 hover:text-green-800 transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Status */}
      {isSearching && (
        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
          <div className="animate-spin h-4 w-4 border-2 border-green-600 border-t-transparent rounded-full" />
          <span>AI is analyzing listings...</span>
        </div>
      )}
    </div>
  );
};

export default CompostSearch; 