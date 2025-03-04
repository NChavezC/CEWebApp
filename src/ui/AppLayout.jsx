import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="bg-gray-100 grid grid-cols-[0.1fr_1fr] grid-rows-[0.1fr_auto_0.1fr] gap-0 h-screen w-full">
      <Header />
      <Sidebar />
      <main>
        <div className="col-span-5 row-span-1">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
