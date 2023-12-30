import { useEffect } from "react";
import { useProduct } from "../context/ProductContext.jsx";
import ProductCard from "./ProductCard.jsx";
import Main from "./Main.jsx";

function NewProducts() {
  const { products, getProducts } = useProduct();

  useEffect(() => {
    getProducts();
  }, []);

  const recentProducts = products.slice(0, 10);

  return (
    <Main>
      <h2 className="text-2xl font-roboto text-azul font-bold mb-10">Nuevos productos</h2>
      <section className="grid grid-cols-4 gap-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {recentProducts.map((product) => (
          <ProductCard
            key={product._id}
            name={product.name}
            brand={product.brand}
            images={product.images}
            price={product.price}
          />
        ))}
      </section>
    </Main>
  );
}

export default NewProducts;