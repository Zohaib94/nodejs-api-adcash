import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Category = model('Category', categorySchema);

export default Category;
