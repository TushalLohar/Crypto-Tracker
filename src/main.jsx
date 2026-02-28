import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./app/routes";
import { CurrencyProvider } from "./context/CurrencyContext"; // Your import is perfect

createRoot(document.getElementById("root")).render(
  // Wrap the Provider completely around your Router!
  <CurrencyProvider>
    <RouterProvider router={router} />
  </CurrencyProvider>
);