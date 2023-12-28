import { useState } from "react";
import DashboardNavbar from "./DashboardNavbar.jsx";

function DashboardLayout({ children }) {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="bg-white min-h-screen ">
      <div className="md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <i className="bx bx-menu bx-md"></i>
        </button>
        <div className="flex grow justify-center mr-6">
          <h2 className="text-azul font-poppins text-2xl font-bold">
            <i className="bx bxs-store text-2xl"></i>
            <span className="ml-2">Hogarfy</span>
          </h2>
        </div>
      </div>
      <div className="flex">
        <DashboardNavbar show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;