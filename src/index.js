import express from 'express';
import cors from 'cors';
import routes from './config/routes';

const BASE_API_URL = '/api/v1';
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_API_URL}/categories`, routes.CategoriesController);
app.use(`${BASE_API_URL}/products`, routes.ProductsController);

app.listen(3000, () =>
  console.log('Adcash NodeJS API listening on port 3000!'),
);
