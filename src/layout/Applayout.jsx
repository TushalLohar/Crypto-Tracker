import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-[#0d1217] text-white flex flex-col">
      <Header />
      
      <main className="pt-24 px-4 sm:px-6 pb-16 flex-1">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;