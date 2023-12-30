import ProductLinkContainer from "./ProductLinkContainer.jsx";
import ProductLink from "./ProductLink.jsx";
import { useCategory } from "../../context/CategoryContext.jsx";
import { useEffect } from "react";

function CategoryDropdown() {
  const { getCategories, categories } = useCategory();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const parentCategories = categories.filter((category) => !category.parent);
  const childCategories = categories.filter((category) => category.parent);

  const getChildCategoriesForParent = (parentId) =>
    childCategories.filter(
      (childCategory) => childCategory.parent._id === parentId
    );

  const replaceSpacesWithDashes = (str) => str.replace(/\s+/g, "-");

  return (
    <>
      {parentCategories.map((parentCategory) => (
        <div key={parentCategory._id} className="group relative">
          <div className="bg-blanco text-azul text-lg font-roboto border-none font-bold outline-none p-2.5 flex justify-center items-center group-hover:bg-gris-claro">
            {parentCategory.name}
            <i className="bx bx-chevron-down"></i>
          </div>
          <ProductLinkContainer>
            {getChildCategoriesForParent(parentCategory._id).map(
              (childCategory) => (
                <ProductLink
                  key={childCategory._id}
                  link={`/c/${parentCategory.name.toLowerCase()}/${replaceSpacesWithDashes(
                    childCategory.name.toLowerCase()
                  )}`}
                  name={childCategory.name}
                />
              )
            )}
          </ProductLinkContainer>
        </div>
      ))}
    </>
  );
}

export default CategoryDropdown;