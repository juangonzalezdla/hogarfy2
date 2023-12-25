import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  brand: { type: String },
  name: { type: String, require: true },
  description: { type: String },
  price: { type: Number, require: true },
  images: [{ type: String }],
  properties: { type: Object },
  category: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Category' 
  }
}, {
  timestamps: true
});

const ProductModel = model('Product', productSchema);

export default ProductModel;