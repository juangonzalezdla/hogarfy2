import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ProtectedRoute } from "./ProtectedRoutes.jsx";

import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Products from "./pages/dashboard/Products.jsx";
import NewProduct from "./components/NewProduct.jsx";
import EditProduct from "./components/EditProduct.jsx";
import Categories from "./pages/dashboard/Categories.jsx";

function App() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <ProductProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/new" element={<NewProduct />} />
                <Route path="/products/edit/:id" element={<EditProduct />} />
                <Route path="/categories" element={<Categories />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProductProvider>
      </CategoryProvider>
    </AuthProvider>
  );
}

export default App;