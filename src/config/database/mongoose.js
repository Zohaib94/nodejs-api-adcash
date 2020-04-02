import mongoose from 'mongoose';

import Product from '../../models/Product';
import Category from '../../models/Category';

const connectDb = () => {
  return mongoose.connect('mongodb://127.0.0.1/adcash_database', {
    useNewUrlParser: true,
  });
};

const seedData = async (category, products) => {
  const categoryObject = new Category(category);

  const productObjects = products.map((p) => {
    p.category = categoryObject.id;
    return new Product(p);
  });

  await categoryObject.save();
  await Product.insertMany(productObjects, function (error, docs) {});
};

const models = { Product, Category };

export { connectDb, seedData };

export default models;
