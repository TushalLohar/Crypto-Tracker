import { LineChart, Sun } from "lucide-react"; // Removed 'Search' since our SearchBar has its own icon
import { Link } from "react-router-dom";
import SearchBar from "../features/components/SearchBar"; // Your custom component!
import CurrencySwitcher from "../features/components/CurrencySwitcher";
import { useCurrency } from "../context/CurrencyContext";

const Header = () => {
  const { currency, setCurrency } = useCurrency();
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0d1217]/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
        
        {/* Left: Name and Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
            <LineChart className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white hidden sm:block">
            CryptoTracker
          </span>
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-md mx-8 flex justify-center">
          {/* THIS is where we use your custom, smart component! */}
          <SearchBar onSearch={(text) => console.log("Searching for:", text)} />
        </div>

        {/* Right: Portfolio and Dark Mode */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/portfolio" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            Portfolio
          </Link>
          <CurrencySwitcher currency={currency} setCurrency={setCurrency} />
          <button className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all">
            <Sun className="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;