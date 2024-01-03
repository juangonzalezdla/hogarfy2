import Header from "../Header.jsx";
import { Breadcrumb } from "flowbite-react";
import Main from "../Main.jsx";
import ProductGrid from "../ProductGrid.jsx";
import ProductCard from "../ProductCard.jsx";
import Footer from "../Footer.jsx";

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext.jsx";
import { useProduct } from "../../context/ProductContext.jsx";

function ChildCategoryPage() {
  const { parentCategory, childCategory } = useParams();
  const { getCategories, categories } = useCategory();
  const { getProducts, products } = useProduct();

  useEffect(() => {
    getCategories();
    getProducts();
  }, [getCategories, getProducts]);

  const parentCategoryData = categories.find(
    (category) => category.name.toLowerCase() === parentCategory.toLowerCase()
  );
  const childCategoryData = categories.find(
    (category) =>
      category.parent &&
      category.parent.name.toLowerCase() === parentCategory.toLowerCase() &&
      category.name.toLowerCase().replace(/\s+/g, "-") === childCategory.toLowerCase()
  );

  const filteredProducts = products.filter(
    (product) =>
      product.category &&
      product.category._id.toString() === childCategoryData?._id.toString()
  );

  return (
    <>
      <Header />
      <section className="w-full max-w-[1400px] my-0 mx-auto py-3 px-12 flex flex-col max-md:px-3">
        <Breadcrumb>
          <Breadcrumb.Item>
            <i className="bx bxs-home bx-xs mr-1"></i>
            <Link to="/" className="hover:underline">
              Inicio
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link
              to={`/c/${parentCategoryData?.name.toLowerCase()}`}
              className="hover:underline"
            >
              {parentCategoryData?.name}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{childCategoryData?.name}</Breadcrumb.Item>
        </Breadcrumb>
      </section>

      <Main>
        <h1 className="text-2xl text-azul font-bold mb-20">
          {childCategoryData?.name}
        </h1>
        {filteredProducts.length === 0 ? (
          <p>Esta categoría aún no tiene productos.</p>
        ) : (
          <ProductGrid>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                url={`/c/${parentCategoryData?.name.toLowerCase()}/${childCategoryData?.name.toLowerCase().replace(/\s+/g, "-")}/product/${
                  product._id
                }`}
                _id={product._id}
                name={product.name}
                brand={product.brand}
                images={product.images}
                price={product.price}
              />
            ))}
          </ProductGrid>
        )}
      </Main>
      <Footer />
    </>
  );
}

export default ChildCategoryPage;