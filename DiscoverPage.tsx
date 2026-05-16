import { useState } from "react";
import { Search, X, TrendingUp, Film } from "lucide-react";
import { Input } from "../components/ui/input";

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Trending", "Dance", "Comedy", "Food", "Travel", "Fitness", "Music", "Fashion"];

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-black z-40 px-4 py-3">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search accounts and videos"
            className="w-full bg-gray-800 border-none text-white placeholder-gray-400 pl-10 pr-10 py-3 rounded-lg"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-pink-500" />
          <h2 className="text-white font-bold text-lg">Trending</h2>
        </div>
      </div>

      {/* Empty State */}
      <div className="px-4 py-12 flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4">
          <Film className="w-10 h-10 text-gray-600" />
        </div>
        <h3 className="text-white text-lg font-semibold mb-2">No Videos Yet</h3>
        <p className="text-gray-400 text-sm text-center">
          Start creating and sharing videos to see them here!
        </p>
      </div>

      {/* Empty Grid Placeholder */}
      <div className="px-1">
        <div className="grid grid-cols-2 gap-1">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="aspect-[9/16] bg-gray-900 rounded flex items-center justify-center"
            >
              <Film className="w-8 h-8 text-gray-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}