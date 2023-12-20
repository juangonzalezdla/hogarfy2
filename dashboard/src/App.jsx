import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ProtectedRoute, ProtectedRouteDashboard } from "./ProtectedRoutes.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Products from "./pages/dashboard/Products.jsx";
import NewProduct from "./pages/dashboard/NewProduct.jsx";
import EditProduct from "./pages/dashboard/EditProduct.jsx";
import Categories from "./pages/dashboard/Categories.jsx";
import Orders from "./pages/dashboard/Orders.jsx";

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route element={<ProtectedRouteDashboard />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/new" element={<NewProduct />} />
                  <Route path="/products/edit/:id" element={<EditProduct />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/orders" element={<Orders />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;