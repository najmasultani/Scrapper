import React from "react";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search } from "lucide-react";

type SearchDemoProps = {
  onExampleClick: (query: string) => void;
};

const SearchDemo: React.FC<SearchDemoProps> = ({ onExampleClick }) => {
  const exampleQueries = [
    "coffee grounds for my vegetable garden",
    "organic waste from restaurants near me",
    "fruit peels and scraps for composting",
    "food waste pickup on weekends",
    "eggshells and kitchen scraps delivery",
    "restaurant compost materials available today"
  ];

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-5 w-5 text-green-600" />
        <h3 className="font-semibold text-green-800">Try AI-Powered Search</h3>
      </div>
      <p className="text-sm text-gray-600 mb-3">
        Use natural language to find exactly what you need. Click on any example below to try it:
      </p>
      <div className="flex flex-wrap gap-2">
        {exampleQueries.map((query, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="cursor-pointer hover:bg-green-100 hover:text-green-800 transition-colors text-xs"
            onClick={() => onExampleClick(query)}
          >
            <Search className="h-3 w-3 mr-1" />
            {query}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default SearchDemo; 