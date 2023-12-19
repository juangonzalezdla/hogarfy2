import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Products from "./pages/dashboard/Products.jsx";
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
              <Route path="/" element={<Navigate to="/auth/login" />} />
              <Route path="/auth/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/products" element={<Products />} />
                <Route path="/dashboard/products/edit/:id" element={<EditProduct />} />
                <Route path="/dashboard/categories" element={<Categories />} />
                <Route path="/dashboard/orders" element={<Orders />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;