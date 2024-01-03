import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Features from "../components/Features.jsx";
import CategoriesNavbar from "../components/categories/CategoriesNavbar.jsx";
import NewProducts from "../components/NewProducts.jsx";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    document.title = "Hogarfy ¡Compra tus necesidades!";
  }, []);

  return (
    <div className="bg-azul-palido">
      <Header />
      <CategoriesNavbar />
      <NewProducts />
      <Features />
      <Footer />
    </div>
  );
}

export default HomePage;