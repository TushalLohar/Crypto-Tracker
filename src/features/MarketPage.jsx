import OverviewSection from "../shared/components/OverviewSection";
import { useMarketData } from "./useMarketData";
import MarketTable from "./components/MarketTable";
import { Pagination } from "./components/pagination";
import { useState } from "react";
import { useGlobalStats } from "../hooks/useGlobalStats";
import { useCurrency } from "../context/CurrencyContext";

const MarketPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setperPage] = useState(10);
  const { currency } = useCurrency();

  const { coins, loading, error } = useMarketData({
    page: page,
    perPage: perPage,
    currency: currency,
  });

  const { globalStats, isGlobalLoading } = useGlobalStats();

  const handleRowsChange = (newRowsValue) => {
    setperPage(newRowsValue);
    setPage(1);
  };

  return (
    <div className="space-y-12">
      {/**Hero Section */}
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Cryptocurrency Prices by Market Cap
        </h1>
        <p className="text-neutral-400 text-lg max-w-3xl leading-relaxed">
          The global cryptocurrency market cap today is{" "}
          <span className="text-white font-medium">
            {globalStats?.marketCap || "$--"}
          </span>
          , a{" "}
          <span
            className={
              globalStats?.marketCapChange >= 0
                ? "text-emerald-400"
                : "text-rose-400"
            }
          >
            {globalStats?.marketCapChange?.toFixed(1) || "-"}%
          </span>{" "}
          change in the last 24 hours. Read more
        </p>
      </div>
      {/**Overcards */}
      <OverviewSection globalData={globalStats} loading={isGlobalLoading} />

      <div className="bg-neutral-900/40 border border-neutral-800 rounded-3xl backdrop-blur-sm overflow-hidden min-h-100">
        {/* --- STATE 1: LOADING --- */}
        {loading && (
          <div className="flex items-center justify-center h-64 text-neutral-400 animate-pulse text-lg font-medium">
            Loading market data...
          </div>
        )}
        {/* --- STATE 2: ERROR --- */}
        {error && !loading && (
          <div className="flex items-center justify-center h-64 text-rose-400 bg-rose-500/10 m-8 rounded-2xl border border-rose-500/20">
            {error}
          </div>
        )}
        {/* --- STATE 3: SUCCESS --- */}
        {!loading && !error && (
          <>
            <MarketTable
              coins={coins}
              currency={currency}
              page={page}
              perPage={perPage}
            />
            <Pagination
              currentPage={page}
              onPageChange={setPage}
              itemsPerPage={perPage}
              onItemsPerPageChange={handleRowsChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MarketPage;
