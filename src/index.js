import express from 'express';
import cors from 'cors';

import routes from './config/routes';
import models, { connectDb, seedData } from './config/database/mongoose';
import { category, products } from './config/database/seeds';

const BASE_API_URL = '/api/v1';
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_API_URL}/categories`, routes.CategoriesController);
app.use(`${BASE_API_URL}/products`, routes.ProductsController);

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if (eraseDatabaseOnSync) {
    await Promise.all([
      models.Product.deleteMany({}),
      models.Category.deleteMany({}),
    ]);

    seedData(category, products);
  }

  app.listen(3000, () =>
    console.log('Adcash NodeJS API listening on port 3000!'),
  );
});
