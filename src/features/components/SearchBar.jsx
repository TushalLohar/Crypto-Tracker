
import { useState, useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { SearchCoinsAPI } from "../../utils/marketAPI";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);


  useEffect(() => {
    const controller = new AbortController();

    const fetchSearchResults = async () => {

      if (!debouncedSearchTerm.trim()) {
        setResults([]);
        setIsOpen(false);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      setIsOpen(true);

      try {
        const data = await SearchCoinsAPI(debouncedSearchTerm, controller.signal);
        // CoinGecko sometimes returns dozens of results. We only want the top 5 to keep the UI clean.
        setResults(data.slice(0, 5)); 
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Search failed:", error);
          setResults([]);
        }
      } finally {
        setIsSearching(false);
      }
    };

    fetchSearchResults();

    return () => controller.abort();
  }, [debouncedSearchTerm]); // ONLY runs when the delayed text changes!

  return (
    <div className="relative w-full max-w-sm hidden md:block z-50">
      
      {/* --- Search Input --- */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {isSearching ? (
            // A tiny loading spinner when fetching
            <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            // The magnifying glass
            <svg className="w-4 h-4 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.trim() && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Slight delay so clicks register before closing
          placeholder="Search 14,000+ coins..."
          className="block w-full py-2.5 pl-10 pr-4 text-sm text-white bg-neutral-900/50 border border-neutral-800 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-neutral-900 outline-none transition-all placeholder-neutral-600"
        />
      </div>

      {/* --- Floating Results Dropdown --- */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-[#0d1217] border border-neutral-800 rounded-xl shadow-2xl shadow-black overflow-hidden py-2">
          
          {results.length === 0 && !isSearching ? (
            <div className="px-4 py-3 text-sm text-neutral-500 text-center">
              No coins found for "{debouncedSearchTerm}"
            </div>
          ) : (
            results.map((coin) => (
              <button
                key={coin.id}
                onClick={() => console.log("Navigate to:", coin.id)} // We will hook this up to a Coin Page later!
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-800 transition-colors text-left"
              >
                <img src={coin.thumb} alt={coin.name} className="w-6 h-6 rounded-full" />
                <div className="flex flex-col">
                  <span className="text-white text-sm font-medium">{coin.name}</span>
                  <span className="text-neutral-500 text-xs uppercase">{coin.symbol}</span>
                </div>
                <span className="ml-auto text-xs font-medium text-neutral-600">
                  #{coin.market_cap_rank || "?"}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;