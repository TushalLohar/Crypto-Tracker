const BASE_URL = "https://api.coingecko.com/api/v3";
const cache = new Map();

export const ApiClient = async (
  endpoint,
  { method = "GET", params = {}, signal } = {},
) => {
  try {
    const querystring = new URLSearchParams(params).toString();

    const url = `${BASE_URL}${endpoint}${querystring ? `?${querystring}` : ""}`;

    if (method == "GET" && cache.has(url)) {
      console.log("serving from cache", url);

      return {
        data: cache.get(url),
        error: null,
        status: 200,
        fromcache: true,
      };
    }

    const response = await fetch(url, { method, signal });

    if (!response.ok) {
      let errormessage = "An unexpected error occurred.";

      switch (response.status) {
        case 400:
          errormessage = "Bad Request: Check your parameters.";
          break;
        case 401:
          errormessage = "Unauthorized: API key issues.";
          break;
        case 404:
          errormessage = "Not Found: The resource doesn't exist.";
          break;
        case 429:
          errormessage = "Rate Limit Exceeded: Slow down!.";
          break;

        case 500:
          errormessage = "Server Error.";
          break;
      }
      return {
        data: null,
        error: errormessage,
        status: response.status,
      };
    }

    const data = await response.json();

    if (method === "GET") {
      cache.set(url, data);
    }
    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (err) {
    if (err.name === "AbortError") {
      return {
        data: null,
        error: "Request cancelled",
        isAborted: true,
      };
    }

    return {
      data: null,
      error: err.message || "Network Error",
    };
  }
};
