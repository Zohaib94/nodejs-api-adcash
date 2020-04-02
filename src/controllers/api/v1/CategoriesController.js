import { Router } from 'express';

const CategoriesController = Router();

CategoriesController.get('/', (request, response) => {
  return response.send([]);
});

export default CategoriesController;
