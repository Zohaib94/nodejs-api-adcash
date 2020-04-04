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
  let cat = await categoryObject.save();

  let productObjects = products.map((p) => {
    p._category = cat._id;
    return new Product(p);
  });

  let productObject = productObjects[0];
  productObject = await productObject.save();

  cat.products.push(productObject);
  await cat.save();
};

const models = { Product, Category };

export { connectDb, seedData };

export default models;
