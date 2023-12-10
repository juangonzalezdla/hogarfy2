import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  brand: { type: String },
  name: { type: String, require: true, minLength: 2, maxLength: 50 },
  description: String,
  price: { type: Number, require: true },
  images: [{ type: String }],
  properties: { type: Object },
  category: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Category' 
  }
});

const ProductModel = model('Product', productSchema);

export default ProductModel;