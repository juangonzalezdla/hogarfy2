import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import { Breadcrumb } from "flowbite-react";
import Main from "../Main.jsx";

import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext.jsx";

function ParentCategoryPage() {
  const { parentCategory } = useParams();
  const { getCategories, categories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  const parentCategoryData = categories.find(
    (category) => category.name.toLowerCase() === parentCategory.toLowerCase()
  );
  const childCategories = categories.filter(
    (category) => category.parent && category.parent._id === parentCategoryData?._id
  );

  const replaceSpacesWithDashes = (str) => str.replace(/\s+/g, "-");

  return (
    <>
      <Header />
      <section className="w-full max-w-[1400px] my-0 mx-auto py-3 px-12 flex flex-col max-md:px-3">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item>
            <i className="bx bxs-home bx-xs mr-1"></i>
            <Link to="/" className="hover:underline">
              Inicio
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{parentCategoryData?.name}</Breadcrumb.Item>
        </Breadcrumb>
      </section>

      <Main>
        <h1 className="text-2xl text-azul font-semibold font-roboto mb-10">
          {parentCategoryData?.name} - Categorias hijas
        </h1>
        <section className="flex justify-center items-center flex-wrap gap-5">
          {childCategories.map((childCategory) => (
            <Link
              key={childCategory._id}
              to={`/c/${parentCategory.toLowerCase()}/${replaceSpacesWithDashes(
                childCategory.name.toLowerCase()
              )}`}
            >
              <article className="w-auto bg-white text-2xl text-azul font-bold px-10 py-20 rounded-xl shadow-md">
                {childCategory.name}
              </article>
            </Link>
          ))}
        </section>
      </Main>
      <Footer />
    </>
  );
}

export default ParentCategoryPage;