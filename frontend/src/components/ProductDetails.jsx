import Header from "./Header.jsx";
import { Breadcrumb } from "flowbite-react";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";

import { useParams, Link } from "react-router-dom"
import { useProduct } from "../context/ProductContext.jsx"
import { useCategory } from "../context/CategoryContext.jsx";
import { useEffect, useState } from "react";

function ProductDetails() {
  const { id, parentCategory, childCategory } = useParams();
  const { getProduct, productData } = useProduct();
  const { getCategories, categories } = useCategory();
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    getProduct(id);
    getCategories();
  }, [getProduct, id, getCategories]);


  useEffect(() => {
    // Verifica si activeImage es null antes de asignar la primera imagen
    if (!activeImage && productData?.images && productData.images.length > 0) {
      setActiveImage(productData.images[0]);
    }
  }, [productData, activeImage]);

  const parentCategoryData = categories.find(
    (category) => category.name.toLowerCase() === parentCategory.toLowerCase()
  );
  const childCategoryData = categories.find(
    (category) =>
      category.parent &&
      category.parent.name.toLowerCase() === parentCategory.toLowerCase() &&
      category.name.toLowerCase().replace(/\s+/g, "-") === childCategory.toLowerCase()
  );

  function formatPrice(price) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  }

  const formattedPrice = formatPrice(productData?.price);

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
          <Breadcrumb.Item>
            <Link
              to={`/c/${parentCategoryData?.name.toLowerCase()}/${childCategoryData?.name.toLowerCase()}`}
              className="hover:underline"
            >
              {childCategoryData?.name}
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{productData?.name}</Breadcrumb.Item>
        </Breadcrumb>
      </section>
      <Main>
        <div className="grid grid-cols-2 gap-10 max-md:grid-cols-1">
          <div className="">
            <figure className="flex justify-center bg-gris-claro p-5 rounded-lg">
              <img className="w-56 h-56" src={activeImage} alt="" />
            </figure>
            <div className="flex gap-3 flex-wrap mt-5">
              {productData?.images.map((image, index) => (
                <div key={index} onClick={() => setActiveImage(image)}>
                  <img src={image} alt="" className="w-28 h-25 bg-gris-claro p-3 rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          <div className="">
            <h1 className="text-black text-xl font-bold mb-5">{productData?.name}</h1>
            <p className="text-black text-sm font-normal mb-5">{productData?.description}</p>
            <p className="text-gris-oscura text-lg font-bold">{formattedPrice}</p>
          </div>
        </div>
      </Main>
      <Footer />
    </>
  )
}

export default ProductDetails