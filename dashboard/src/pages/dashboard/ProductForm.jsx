import { Button, Label, TextInput, Textarea, Select, Card, FileInput } from "flowbite-react";
import { Toaster } from "react-hot-toast";

import { useProduct } from "../../context/ProductContext.jsx";
import { useCategory } from "../../context/CategoryContext.jsx";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { uploadImage } from "../../utils/cloudinary.js";

function ProductForm() {
  const { getProducts, createProduct, updateProduct, getProduct } = useProduct();
  const { getCategories, categories } = useCategory();
  const { register, handleSubmit, reset, setValue, control } = useForm();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [goToProducts, setGoToProducts] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const uploaded = await Promise.all(Array.from(files).map(async (file) => {
      const imageUrl = await uploadImage(file);
      return imageUrl;
    }));
    uploaded.forEach((url) => append({ url }));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProduct = async () => {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue("name", product.name);
        setValue("brand", product.brand);
        setValue("price", product.price);
        setValue("category", product.category ? product.category._id : "");
        if (product.category) {
          const selectedCategory = categories.find(
            (category) => category._id === product.category._id
          );
          setSelectedCategory(selectedCategory);

          if (selectedCategory) {
            selectedCategory.properties.forEach((property) => {
              const propertyName = `properties.${property.name}`;
              setValue(propertyName, product.properties[property.name]);
            });
          }
        }
        setValue("description", product.description);
        //setValue("images", product.images);
        reset({ images: product.images });
      }
    };
    loadProduct();
  }, []);

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  const onSubmit = async (data) => {
    if (params.id) {
      data._id = params.id;
      await updateProduct(data);
      setGoToProducts(true);
    } else {
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
      data.images = data.images.map((image) => image.url);
      await createProduct(data);
      getProducts();
      reset();
      setGoToProducts(true);
    }
  };

  if (goToProducts) navigate("/products");

  return (
    <>
      <Toaster />
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <Label htmlFor="name" value="Nombre" className="mb-2 block cursor-pointer" />
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
            <Label value="Categoria"></Label>
            <Select
              defaultValue=""
              {...register("category")}
              onChange={(e) =>
                handleCategory(
                  categories.find((category) => category._id === e.target.value)
                )
              }
            >
              <option value="">Elige la categoria</option>
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </div>

          <div className="mb-5">
            <Label value="Propiedades"></Label>
            {selectedCategory &&
              selectedCategory.properties.map((property) => (
                <div key={property.name}>
                  <Label htmlFor={`properties.${property.name}`}>
                    {property.name}
                  </Label>
                  <Select {...register(`properties.${property.name}`)}>
                    <option value="">Elige un valor</option>
                    {property.values.map((value, index) => (
                      <option value={value} key={index}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </div>
              ))}
          </div>

          <div className="mb-5">
            <Label htmlFor="images" value="Imágenes" className="mb-2 block" />
            <FileInput
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={(e) => handleImageUpload(e)}
            />
          </div>
          
          <div className="mb-5 flex flex-wrap gap-3">
            {fields.map((field, index) => (
              <div className="flex flex-col justify-center items-start gap-2" key={field.id}>
                <Label htmlFor={`images[${index}]`} value={`Imagen ${index + 1}`} />
                <img className="w-32 h-32" src={field.url} alt={`Imagen ${index + 1}`} />
                <Button color="failure" type="button" onClick={() => remove(index)}>Eliminar</Button>
              </div>
            ))}
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
              maxLength="400"
              rows={5}
              className="resize-none"
              {...register("description")}
            />
          </div>

          <div className="flex gap-3">
            <Button type="submit" color="blue">
              Guardar
            </Button>
            <Link to={'/products'}>
              <Button color="gray">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </>
  );
}

export default ProductForm;