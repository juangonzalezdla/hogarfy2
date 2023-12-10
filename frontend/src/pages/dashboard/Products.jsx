import DashboardLayout from "./DashboardLayout.jsx";
import {
  Table,
  Button,
  Modal,
  Label,
  TextInput,
  Textarea,
  Dropdown,
} from "flowbite-react";
import { Toaster } from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useProduct } from "../../context/ProductContext.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductSchema } from "../../schemas/product.js";

function Products() {
  const { products, getProducts, createProduct, deleteProduct } = useProduct();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModalCreate, setOpenModalCreate] = useState();
  const [openModalDelete, setOpenModalDelete] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Dashboard | Productos";
    getProducts();
  }, []);

  const handleProduct = (product) => {
    setSelectedProduct(product);
  };

  const onSubmit = async (data) => {
    console.log(data);
    await createProduct(data);
    getProducts();
    reset();
    setOpenModalCreate();
  };

  return (
    <DashboardLayout>
      <Toaster />
      <h1 className="text-azul font-poppins text-xl font-bold mb-5 text-center">
        Productos
      </h1>

      <Button
        color="blue"
        className="flex items-center justify-center mb-5"
        onClick={() => setOpenModalCreate("form-elements")}
      >
        <i className="bx bx-plus text-[20px] mr-1"></i>
        Agregar producto
      </Button>

      <Modal
        size="xl"
        show={openModalCreate === "form-elements"}
        onClose={() => setOpenModalCreate()}
      >
        <Modal.Header>Agregar producto</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <Label
                htmlFor="name" value="Nombre" className="mb-2 block cursor-pointer" />
              <TextInput
                id="name"
                placeholder="Nombre de producto"
                type="text"
                {...register("name")}
              />
            </div>

            <div className="mb-5">
              <Label htmlFor="brand" value="Marca" className="mb-2 block" />
              <TextInput
                id="brand"
                placeholder="Marca del producto"
                type="text"
                {...register("brand")}
              />
            </div>

            <div className="mb-5">
              <Label htmlFor="price" value="Precio" className="mb-2 block" />
              <TextInput
                id="price"
                placeholder="Precio"
                type="number"
                {...register("price")}
              />
            </div>

            <div className="mb-5">
              <Label htmlFor="description" value="Descricion" className="mb-2 block" />
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
              Agregar nuevo producto
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Table striped>
        <Table.Head>
          <Table.HeadCell className="bg-azul text-white">
            Nombre producto
          </Table.HeadCell>
          <Table.HeadCell className="bg-azul text-white">Marca</Table.HeadCell>
          <Table.HeadCell className="bg-azul text-white">
            Categoria
          </Table.HeadCell>
          <Table.HeadCell className="bg-azul text-white">precio</Table.HeadCell>
          <Table.HeadCell className="bg-azul"></Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {products.map((product) => (
            <Table.Row
              key={product._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="font-medium text-gray-900">
                {product.name}
              </Table.Cell>
              <Table.Cell>{product.brand}</Table.Cell>
              <Table.Cell>{product?.category?.name}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>
                <Dropdown
                  renderTrigger={() => (
                    <i className="bx bx-dots-horizontal-rounded text-[25px] cursor-pointer p-2 rounded-full hover:text-gray-800 hover:bg-gris-claro"></i>
                  )}
                  className="p-2 rounded-md"
                >
                  <Link to={`/dashboard/products/edit/${product._id}`}>
                    <Dropdown.Item className="text-base font-medium rounded-md flex items-center gap-2">
                      <i className="bx bx-edit text-[20px]"></i>
                      Editar
                    </Dropdown.Item>
                  </Link>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      handleProduct(product);
                      setOpenModalDelete(true);
                    }}
                    className="text-base text-red-700 font-medium rounded-md flex items-center gap-2"
                  >
                    <i className="bx bxs-trash text-[20px]"></i>
                    Eliminar
                  </Dropdown.Item>
                </Dropdown>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal
        show={openModalDelete}
        size="md"
        onClose={() => setOpenModalDelete(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gris-oscuro" />
            <h3 className="mb-5 text-lg font-normal text-gris-oscuro">
              {`¿Estás seguro de que quieres eliminar el producto ${selectedProduct?.name}?`}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  deleteProduct(selectedProduct._id);
                  setOpenModalDelete(false);
                }}
              >
                Si, Estoy seguro
              </Button>
              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </DashboardLayout>
  );
}

export default Products;