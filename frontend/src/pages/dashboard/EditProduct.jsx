import DashboardLayout from "./DashboardLayout.jsx";
import { Button, Label, TextInput, Textarea, Dropdown } from "flowbite-react";
import { Toaster } from "react-hot-toast";

import { useProduct } from "../../context/ProductContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProductSchema } from "../../schemas/product.js";

function EditProduct() {
  const { getProduct, productData, updateProduct } = useProduct();
  const [goToProducts, setGoToProducts] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProductSchema),
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue("name", product.name);
        setValue("brand", product.brand);
        setValue("price", product.price);
        setValue("properties", product.properties);
        setValue("category", product.category);
        setValue("description", product.description);
        setValue("images", product.images);
      }
    };
    loadProduct();
  }, []);

  const onSubmit = async (data) => {
    data._id = params.id;
    await updateProduct(data);
    setGoToProducts(true);
  };

  if(goToProducts) navigate("/dashboard/products"); 

  return (
    <DashboardLayout>
      <Toaster />
      <h1 className="text-azul font-poppins text-xl font-bold mb-5 text-center">
        Editar producto {productData?.name}
      </h1>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <Label htmlFor="name" value="Nombre" className="mb-2 block cursor-pointer" />
            <TextInput
              id="name"
              placeholder="Nombre de producto"
              type="text"
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-red-500 font-semibold">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <Label htmlFor="brand" value="Marca" className="mb-2 block" />
            <TextInput
              id="brand"
              placeholder="Marca del producto"
              type="text"
              {...register("brand")}
            />
            {errors.brand?.message && (
              <p className="text-red-500 font-semibold">
                {errors.brand?.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <Label htmlFor="price" value="Precio" className="mb-2 block" />
            <input
              id="price"
              placeholder="Precio"
              type="number"
              {...register("price")}
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="description" value="Descripcion" className="mb-2 block" />
            <Textarea
              id="description"
              placeholder="Descripcion del producto..."
              type="text"
              maxLength="200"
              rows={4}
              className="resize-none"
              {...register("description")}
            />
          </div>

          <Button className="mt-6" type="submit" color="blue">
            Actualizar producto
          </Button>
        </form>
      </div>
    </DashboardLayout>
  );
}

export default EditProduct;