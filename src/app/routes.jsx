import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout"; 
import MarketPage from "../features/MarketPage";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, 
    children: [
      {
        path: "/",
        element: <MarketPage/>, 
      },
      {
        path: "/portfolio",
        element: <div className="p-8 text-white">Portfolio Page (Under Construction)</div>,
      }
    ],
  },
]);