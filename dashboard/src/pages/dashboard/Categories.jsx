import DashboardLayout from "../../components/DashboardLayout.jsx";
import { Table, Button, Label, TextInput, Select, Dropdown, Modal } from "flowbite-react";
import { Toaster } from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { useCategory } from "../../context/CategoryContext.jsx";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

function Categories() {
  const { categories, getCategories, createCategory, updateCategory, deleteCategory } = useCategory();
  const { register, handleSubmit, setValue, reset, control } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });

  useEffect(() => {
    document.title = "Dashboard | Categorias";
    getCategories();
  }, []);

  const handleCategory = (category) => {
    setSelectedCategory(category);
    setShowEditCategory(true);
    setValue("name", category.name);
    setValue("parent", category.parent ? category.parent._id : "");
    setValue("properties", category.properties);
  };

  const onSubmit = async (data) => {
    data.properties.forEach((property) => {
      property.values = property.values.split(",").map((value) => value.trim());
    });

    if (selectedCategory) {
      data._id = selectedCategory._id;
      await updateCategory(data);
    } else {
      await createCategory(data);
    }
    reset();
    setSelectedCategory(null);
    setShowEditCategory(false);
    getCategories();
  };

  return (
    <DashboardLayout>
      <Toaster />
      <h1 className="text-azul font-poppins text-lg font-bold mb-5">
        Categorias
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-wrap gap-5 mb-5">
          <div className="max-w-[250px]">
            <div className="mb-2 block">
              <Label
                htmlFor="name"
                value={
                  showEditCategory
                    ? `Editar categoria ${selectedCategory.name}`
                    : "Nueva categoria"
                }
              />
            </div>
            <TextInput
              id="name"
              placeholder="Nombre de la categoria"
              type="text"
              defaultValue=""
              {...register("name")}
            />
          </div>

          <div className="max-w-[250px]">
            <div className="mb-2 block">
              <Label htmlFor="parent-category" value="Categoria padre" />
            </div>
            <Select defaultValue="" {...register("parent")} required>
              <option value="">Elige categoria padre</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div className="mb-5">
          <Label value="Propiedades"></Label>
          <Button
            onClick={() => append({ name: "", values: "" })}
            type="button"
          >
            Agregar nueva propiedad
          </Button>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex justify-start items-end gap-2 mt-3"
            >
              <div>
                <Label htmlFor={`properties[${index}].name`}>Nombre</Label>
                <TextInput {...register(`properties[${index}].name`)} />
              </div>
              <div>
                <Label htmlFor={`properties[${index}].values`}>Valores</Label>
                <TextInput {...register(`properties[${index}].values`)} />
              </div>
              <Button
                onClick={() => remove(index)}
                type="button"
                color="failure"
              >
                Eliminar
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-3 items-start">
          <Button type="submit" color="blue" className="mb-3">
            Guardar
          </Button>
          {selectedCategory && (
            <Button
              onClick={() => {
                setSelectedCategory(null);
                setShowEditCategory(false);
                reset();
              }}
              type="button"
              color="gray"
            >
              Cancelar
            </Button>
          )}
        </div>
      </form>

      {!selectedCategory && (
        <Table striped>
          <Table.Head>
            <Table.HeadCell className="bg-azul text-white px-3 py-4">
              Nombre categoria
            </Table.HeadCell>
            <Table.HeadCell className="bg-azul text-white px-3 py-4">
              Categoria padre
            </Table.HeadCell>
            <Table.HeadCell className="bg-azul px-3 py-4"></Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {categories.map((category) => (
              <Table.Row key={category._id} className="bg-white">
                <Table.Cell className="font-medium text-gray-900 px-3 py-4">
                  {category.name}
                </Table.Cell>
                <Table.Cell className="px-3 py-4">
                  {category?.parent?.name}
                </Table.Cell>
                <Table.Cell className="px-3 py-4">
                  <Dropdown
                    renderTrigger={() => (
                      <i className="bx bx-dots-horizontal-rounded text-[25px] cursor-pointer p-2 rounded-full hover:text-gray-800 hover:bg-gris-claro"></i>
                    )}
                    className="p-2 rounded-md"
                  >
                    <Dropdown.Item
                      onClick={() => handleCategory(category)}
                      className="text-base font-medium rounded-md flex items-center gap-2"
                    >
                      <i className="bx bx-edit text-[20px]"></i>
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={() => {
                        handleCategory(category);
                        setOpenModal(true);
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
      )}

      <Modal
        onClose={() => setOpenModal(false)}
        show={openModal}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gris-oscuro" />
            <h3 className="mb-5 text-lg font-normal text-gris-oscuro">
              {`¿Estás seguro de que quieres eliminar la categoria ${selectedCategory?.name}?`}
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => {
                  deleteCategory(selectedCategory._id);
                  setOpenModal(false);
                }}
                color="failure"
              >
                Si, Estoy seguro
              </Button>
              <Button onClick={() => setOpenModal(false)} color="gray">
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </DashboardLayout>
  );
}

export default Categories;