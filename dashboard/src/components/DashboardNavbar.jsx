import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function DashboardNavbar({ show }) {
  const { logout } = useAuth();
  const inactiveLink = "";
  const activeLink = "flex items-center p-2 bg-gris-claro text-gris-oscuro rounded-lg hover:bg-gris-claro group";
  const location = useLocation();
  const { pathname } = location;

  return (
    <aside className={(show?'left-0':'-left-full')+" fixed top-0 p-4 w-full bg-white h-full md:static md:w-auto transition-all z-10"}>
      <div className="mb-5 mr-4">
        <h2 className="text-azul font-poppins text-2xl font-bold">
          <i className="bx bxs-store text-2xl"></i>
          <span className="ml-2">Hogarfy</span>
        </h2>
      </div>
      <nav className="flex flex-col gap-2">
        <div className="font-medium text-lg space-y-2">
          <Link
            to={"/"}
            className={
              pathname === "/"
                ? activeLink
                : inactiveLink + " flex items-center p-2 text-gris-oscuro rounded-lg hover:bg-gris-claro group"
            }
          >
            <i className="bx bxs-dashboard text-2xl"></i>
            <span className="ml-2">Dashboard</span>
          </Link>

          <Link
            to={"/products"}
            className={
              pathname === "/products"
                ? activeLink
                : inactiveLink + " flex items-center p-2 text-gris-oscuro rounded-lg hover:bg-gris-claro group"
            }
          >
            <i className="bx bxs-shopping-bags text-2xl"></i>
            <span className="ml-2">Productos</span>
          </Link>

          <Link
            to={"/categories"}
            className={
              pathname === "/categories"
                ? activeLink
                : inactiveLink + " flex items-center p-2 text-gris-oscuro rounded-lg hover:bg-gris-claro group"
            }
          >
            <i className="bx bxs-category text-2xl"></i>
            <span className="ml-2">Categorias</span>
          </Link>
          <hr />
          <Link
            to={"/auth/login"}
            className="flex items-center p-2 text-red-700 rounded-lg hover:bg-red-100 group"
            onClick={() => {
              logout();
            }}
          >
            <i className="bx bx-log-out text-2xl"></i>
            <span className="ml-2">Salir</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}

export default DashboardNavbar;