import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  products: { type: Object },
  fullName: { type: String },
  email: { type: String },
  phone: { type: String },
  city: { type: String },
  streetAddress: { type: String },
  paid: { type: Boolean },
}, {
  timestamps: true
});

const OrderModel = model('Order', orderSchema);

export default OrderModel;