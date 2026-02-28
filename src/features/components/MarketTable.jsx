// src/features/components/MarketTable.jsx
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts";

const MarketTable = ({ coins, page = 1,perPage=50, currency = "usd" }) => {


  // JS Currency Formatter
  const formatCurrency = (val) => {
    if (val === null || val === undefined) return "-";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      maximumFractionDigits: 2,
    }).format(val);
  };

  //Percentage Formatter
  const formatPercentage = (val) => {
    if (val === null || val === undefined) return "-";
    return `${val.toFixed(2)}%`;
  };

  return (
    // 3. Responsive Scroll Wrapper
    <div className="overflow-x-auto">
      {/* 4. Minimum Width enforces scrolling on phones instead of squishing text */}
      <div className="min-w-275">
        {/* HEADER ROW  */}
        <div className="flex px-6 py-4 text-xs uppercase font-semibold tracking-widest text-neutral-500 border-b border-neutral-800 bg-[#0f141a]/50">
          <div className="w-12">#</div>
          <div className="flex-1">Coin</div>
          <div className="w-32 text-right">Price</div>
          <div className="w-24 text-right">1h</div>
          <div className="w-24 text-right">24h</div>
          <div className="w-24 text-right">7d</div>
          <div className="w-40 text-right">Volume</div>
          <div className="w-40 text-right">Market Cap</div>
          <div className="w-36 text-right">Last 7 Days</div>
        </div>

        {/*  DATA ROWS (Mapping)*/}
        {coins?.map((coin, index) => {
          // Row-Level Logic
          const isPositive7d = coin?.price_change_percentage_7d_in_currency > 0;

          // rank across multiple pages
          const globalRank = (page - 1) * perPage + index + 1;

          // Format data specifically for Recharts
          const chartData =
            coin?.sparkline_in_7d?.price?.map((value, i) => ({
              value,
              index: i,
            })) || [];

          return (
            //The Row Container (Must have a unique 'key')
            <div
              key={coin?.id}
              className="flex items-center px-6 py-5 border-b border-neutral-800/50 hover:bg-white/5 transition-colors duration-200 text-sm"
            >
              {/* Rank */}
              <div className="w-12 text-neutral-500 font-mono">
                {globalRank}
              </div>

              {/* Coin Identity (Image + Name + Symbol) */}
              <div className="flex-1 flex items-center gap-4">
                <img
                  src={coin?.image}
                  alt={coin?.name}
                  className="w-8 h-8 rounded-full object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-white font-semibold">{coin?.name}</span>
                  <span className="text-neutral-500 text-xs uppercase">
                    {coin?.symbol}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="w-32 text-right font-medium text-white">
                {formatCurrency(coin?.current_price)}
              </div>

              {/* 1H Change */}
              <div
                className={`w-24 text-right font-medium ${coin?.price_change_percentage_1h_in_currency > 0 ? "text-emerald-400" : "text-rose-400"}`}
              >
                {formatPercentage(coin?.price_change_percentage_1h_in_currency)}
              </div>

              {/* 24H Change */}
              <div
                className={`w-24 text-right font-medium ${coin?.price_change_percentage_24h > 0 ? "text-emerald-400" : "text-rose-400"}`}
              >
                {formatPercentage(coin?.price_change_percentage_24h)}
              </div>

              {/* 7D Change */}
              <div
                className={`w-24 text-right font-medium ${isPositive7d ? "text-emerald-400" : "text-rose-400"}`}
              >
                {formatPercentage(coin?.price_change_percentage_7d_in_currency)}
              </div>

              {/* Volume & Market Cap */}
              <div className="w-40 text-right text-neutral-300">
                {formatCurrency(coin?.total_volume)}
              </div>
              <div className="w-40 text-right text-neutral-300">
                {formatCurrency(coin?.market_cap)}
              </div>

              {/* 7. Recharts Sparkline */}
              <div className="w-36 flex justify-end">
                {chartData.length > 0 && (
                  <div className="w-32 h-14">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <YAxis domain={["dataMin", "dataMax"]} hide />
                        <Line
                          type="linear"
                          dataKey="value"
                          stroke={isPositive7d ? "#22c55e" : "#ef4444"}
                          strokeWidth={1.8}
                          dot={false}
                          isAnimationActive={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketTable;


