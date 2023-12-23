import DashboardLayout from "./DashboardLayout.jsx";
import { Table, Button, Modal, Dropdown } from "flowbite-react";
import { Toaster } from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { useProduct } from "../../context/ProductContext.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Products() {
  const { products, getProducts, createProduct, deleteProduct } = useProduct();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState();
  const { reset } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  useEffect(() => {
    document.title = "Dashboard | Productos";
    getProducts();
  }, []);

  const handleProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  const onSubmit = async (data) => {
    if (!selectedCategory) {
      console.error("No se ha seleccionado una categoría");
      return;
    }
    const productProperties = {};
    selectedCategory.properties.forEach((property) => {
      productProperties[property.name] = data.properties[property.name];
    });
    data.properties = productProperties;
    data.category = selectedCategory._id;
    await createProduct(data);
    getProducts();
    reset();
  };

  return (
    <DashboardLayout>
      <Toaster />
      <h1 className="text-azul font-poppins text-lg font-bold mb-5">
        Productos
      </h1>
      <Link to={'/products/new'}>
        <Button
          color="blue"
          className="flex items-center justify-center mb-5"
        >
          <i className="bx bx-plus text-[20px] mr-1"></i>
          Agregar producto
        </Button>
      </Link>

      <Table striped>
        <Table.Head>
          <Table.HeadCell className="bg-azul text-white">Nombre producto</Table.HeadCell>
          <Table.HeadCell className="bg-azul text-white max-md:hidden">Marca</Table.HeadCell>
          <Table.HeadCell className="bg-azul text-white max-md:hidden">Categoria</Table.HeadCell>
          <Table.HeadCell className="bg-azul text-white max-md:hidden">precio</Table.HeadCell>
          <Table.HeadCell className="bg-azul"></Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {products.map((product) => (
            <Table.Row
              key={product._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="font-medium text-gray-900">{product.name}</Table.Cell>
              <Table.Cell className="max-md:hidden">{product.brand}</Table.Cell>
              <Table.Cell className="max-md:hidden">{product?.category?.name}</Table.Cell>
              <Table.Cell className="max-md:hidden">{product.price}</Table.Cell>
              <Table.Cell>
                <Dropdown
                  renderTrigger={() => (
                    <i className="bx bx-dots-horizontal-rounded text-[25px] cursor-pointer p-2 rounded-full hover:text-gray-800 hover:bg-gris-claro"></i>
                  )}
                  className="p-2 rounded-md"
                >
                  <Link to={`/products/edit/${product._id}`}>
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