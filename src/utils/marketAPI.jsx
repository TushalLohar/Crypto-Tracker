import { ApiClient } from "./apiClient";

const GlobalMarketData = async ({
  page = 1,
  perPage = 10,
  currency = "usd",
  signal,
} = {}) => {
  return ApiClient("/coins/markets", {
    params: {
      vs_currency: currency,
      order: "market_cap_desc",
      per_page: perPage,
      page: page,
      sparkline: true,
      price_change_percentage: "1h,24h,7d",
    },
    signal: signal,
  });
};

export default GlobalMarketData;

export const SearchCoinsAPI = async (query, signal) => {
  try {
    const response = await ApiClient("/search", {
      params: { query: query },
      signal: signal,
    });
    
    const coinsArray = response?.data?.coins || response?.coins || [];
    
    return coinsArray;
    
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Search API Error:", error);
    }
    return []; 
  }
};


export const FetchGlobalStatsAPI = async () => {
  try {
    const response = await ApiClient("/global");
    // CoinGecko wraps this specific endpoint's data in an extra 'data' object
    return response.data?.data || response.data; 
  } catch (error) {
    console.error("Failed to fetch global stats:", error);
    return null;
  }
};