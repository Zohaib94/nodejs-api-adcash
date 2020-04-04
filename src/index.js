import express from 'express';
import cors from 'cors';

import routes from './config/routes';
import { connectDb } from './config/database/mongoose';

const BASE_API_URL = '/api/v1';
const CATEGORY_API_URL = `${BASE_API_URL}/categories`;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(CATEGORY_API_URL, routes.CategoriesController);

connectDb().then(async () => {
  app.listen(3000, () =>
    console.log('Adcash NodeJS API listening on port 3000!'),
  );
});
