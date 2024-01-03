import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { CategoryProvider } from "./context/CategoryContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ProtectedRoute } from "./ProtectedRoutes.jsx";

import HomePage from "./pages/HomePage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AccountPage from "./pages/account/AccountPage.jsx";
import UpdateEmail from "./pages/account/UpdateEmail.jsx";
import UpdatePassword from "./pages/account/UpdatePassword.jsx";
import DeleteAccount from "./pages/account/DeleteAccount.jsx";
import SobreNosotros from "./pages/legal/SobreNosotros.jsx";
import PreguntasFrecuentes from "./pages/legal/PreguntasFrecuentes.jsx";
import TerminosCondiciones from "./pages/legal/TerminosCondiciones.jsx";
import Privacidad from "./pages/legal/Privacidad.jsx";
import ParentCategoryPage from "./components/categories/ParentCategoryPage.jsx";
import ChildCategoryPage from "./components/categories/ChildCategoryPage.jsx";
import ProductDetails from "./components/ProductDetails.jsx";

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CategoryProvider>
          <ProductProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/register" element={<RegisterPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/legal/sobre-nosotros/" element={<SobreNosotros />} />
                <Route path="/legal/preguntas-frecuentes/" element={<PreguntasFrecuentes />} />
                <Route path="/legal/terminos-condiciones" element={<TerminosCondiciones />} />
                <Route path="/legal/privacidad" element={<Privacidad />} />
                <Route path="/c/:parentCategory" element={<ParentCategoryPage />} />
                <Route path="/c/:parentCategory/:childCategory" element={<ChildCategoryPage />} />
                <Route path="/c/:parentCategory/:childCategory/product/:id" element={<ProductDetails />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/u/account/:id" element={<AccountPage />} />
                  <Route path="/u/account/update-email/:id" element={<UpdateEmail />} />
                  <Route path="/u/account/update-password/:id" element={<UpdatePassword />} />
                  <Route path="/u/account/delete/:id" element={<DeleteAccount />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ProductProvider>
        </CategoryProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;