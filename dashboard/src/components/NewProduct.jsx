import DashboardLayout from "./DashboardLayout.jsx";
import ProductForm from "./ProductForm.jsx";
import { Toaster } from "react-hot-toast";

function NewProduct() {
  return (
    <DashboardLayout>
      <Toaster />
      <h1 className="text-azul font-poppins text-lg font-bold mb-5">
        Nuevo producto
      </h1>
      <ProductForm />
    </DashboardLayout>
  );
}

export default NewProduct;