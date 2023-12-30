import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, require: true },
  properties: [{ type: Object }],
  parent: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Category',
    default: null
  }
});

const CategoryModel = model('Category', categorySchema);

export default CategoryModel;