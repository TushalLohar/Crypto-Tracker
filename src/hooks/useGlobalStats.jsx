// src/hooks/useGlobalStats.jsx
import { useState, useEffect } from "react";
import { FetchGlobalStatsAPI } from "../utils/marketAPI";

export const useGlobalStats = () => {
  const [globalStats, setGlobalStats] = useState(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

  useEffect(() => {
    const getGlobalData = async () => {
      setIsGlobalLoading(true);
      try {
        const data = await FetchGlobalStatsAPI();
        
        if (data) {
          // Format the massive numbers into clean strings (e.g., $2.35T)
          setGlobalStats({
            marketCap: `$${(data.total_market_cap.usd / 1e12).toFixed(2)}T`,
            marketCapChange: data.market_cap_change_percentage_24h_usd,
            volume: `$${(data.total_volume.usd / 1e9).toFixed(2)}B`,
            volumeChange: null, 
            btcDominance: `${data.market_cap_percentage.btc.toFixed(1)}%`,
            btcDominanceChange: null, 
          });
        }
      } catch (error) {
        console.error("Error fetching global stats:", error);
      } finally {
        setIsGlobalLoading(false);
      }
    };

    getGlobalData();
  }, []);

  return { globalStats, isGlobalLoading };
};