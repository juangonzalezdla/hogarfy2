import DashboardLayout from "./DashboardLayout.jsx";
import ProductForm from "./ProductForm.jsx";
import { Toaster } from "react-hot-toast";
import { useProduct } from "../context/ProductContext.jsx";

function EditProduct() {
  const { productData } = useProduct();

  return (
    <DashboardLayout>
      <Toaster />
      <h1 className="text-azul font-poppins text-lg font-bold mb-5">
        Editar producto {productData?.name}
      </h1>
      <ProductForm />
    </DashboardLayout>
  );
}

export default EditProduct;