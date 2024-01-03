import ProductModel from '../models/product.schema.js';

export const createProduct = async (req, res) => {
  try {
    const { brand, name, description, price, images, properties, category } = req.body;

    const product = new ProductModel({
      brand,
      name,
      description,
      price,
      images,
      properties,
      category
    });
    await product.save();

    return res.status(200).json('Producto creado con éxito');
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate('category');
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getRecentProducts = async (req, res) => {
  try {
    const recentProducts = await ProductModel.find({}, null, {sort: {'_id': -1}, limit: 20}).populate('category');
    return res.status(200).json(recentProducts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json('Producto no encontrado');

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { brand, name, description, price, images, properties, category } = req.body;

    const updatedProduct = await ProductModel.findById(req.params.id);
    if(!updatedProduct) return res.status(404).json('Producto no encontrado');

    updatedProduct.brand = brand;
    updatedProduct.name = name;
    updatedProduct.description = description;
    updatedProduct.price = price;
    updatedProduct.images = images;
    updatedProduct.properties = properties;
    updatedProduct.category = category;
    await updatedProduct.save();

    return res.status(201).json('Producto actualizado');
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return res.status(404).json('Producto no encontrado');

    await product.deleteOne();

    return res.status(204).json('Producto eliminado');
  } catch (error) {
    return res.status(500).json(error);
  }
};