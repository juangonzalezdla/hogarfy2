import { useEffect } from "react";
import { useProduct } from "../context/ProductContext.jsx";
import { useCategory } from "../context/CategoryContext.jsx";
import Main from "./Main.jsx";
import ProductGrid from "./ProductGrid.jsx";
import ProductCard from "./ProductCard.jsx";

function NewProducts() {
  const { products, getRecentProducts } = useProduct();
  const { getCategories, categories } = useCategory();

  useEffect(() => {
    getRecentProducts();
    getCategories();
  }, [getRecentProducts]);

  return (
    <Main>
      <h2 className="text-2xl font-roboto text-azul font-bold mb-10">
        Nuevos productos
      </h2>
      <ProductGrid>
        {products.map((product) => {
          const parentCategories = categories.filter(
            (category) => !category.parent
          );
          const childCategories = categories.filter(
            (category) => category.parent
          );
          // Encontrar la categoría del producto
          const productCategory = childCategories.find(
            (category) => category._id === product.category._id
          );
          // Validar si la categoría es hija y obtener la categoría padre
          const parentCategory = parentCategories.find(
            (category) => category._id === productCategory.parent._id
          );
          // Construir la URL
          const url = `/c/${parentCategory?.name.toLowerCase()}/${
            productCategory?.name.toLowerCase().replace(/\s+/g, "-")
          }/product/${product._id}`;

          return (
            <ProductCard
              key={product._id}
              url={url}
              _id={product._id}
              name={product.name}
              brand={product.brand}
              images={product.images}
              price={product.price}
            />
          );
        })}
      </ProductGrid>
    </Main>
  );
}

export default NewProducts;