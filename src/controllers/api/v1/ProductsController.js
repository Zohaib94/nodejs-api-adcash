import { Router } from 'express';

const ProductsController = Router();

ProductsController.get('/', (request, response) => {
  return response.send([]);
});

export default ProductsController;
