import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './config/routes';
import models, {
  connectDb,
  seedData,
} from './config/database/mongoose';
import { category, products } from './config/database/seeds';

const BASE_API_URL = '/api/v1';
const CATEGORY_API_URL = `${BASE_API_URL}/categories`;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(CATEGORY_API_URL, routes.CategoriesController);

const eraseDatabaseOnSync = false;

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
