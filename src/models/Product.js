import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  _category: { type: Schema.Types.ObjectId, ref: 'Category' },
});

const Product = model('Product', productSchema);

export default Product;
