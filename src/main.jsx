import { createRoot } from "react-dom/client";
import "./index.css";

function App() {
  return (
    <div className="text-white bg-black min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-semibold">
        Crypto Tracker Starting...
      </h1>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);