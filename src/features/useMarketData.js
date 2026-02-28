import GlobalMarketData from "../utils/marketAPI";
import { useState, useEffect } from "react";

export const useMarketData = ({
  page ,
  perPage, 
  currency
} = {}) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setErrror] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoins = async () => {
      try {
        setLoading(true);
        setErrror(null);

        const { data, error } = await GlobalMarketData({
          page,
          perPage,
          currency,
          signal: controller.signal,
        });

        if (error === "Request cancelled") return;

        if (error) {
          setErrror(error);
          return;
        }
        setCoins(data || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setErrror("Failed to fetch data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
    return () => controller.abort();
  }, [page, perPage, currency]);

  return { coins, loading, error };
};
