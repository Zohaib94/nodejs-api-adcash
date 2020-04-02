import { Router, response } from 'express';
import CategoryService from '../../../services/category/CategoryService';

const CategoriesController = Router();

CategoriesController.get('/', async (request, response) => {
  try {
    let categories = await CategoryService.getAllCategories();
    response.send(categories);
  } catch (err) {
    response.status(500).send(err);
  }
});

CategoriesController.get('/:categoryId', async (request, response) => {
  try {
    let categories = await CategoryService.getCategory(request.params.categoryId);
    response.send(categories);
  } catch (err) {
    response.status(500).send(err);
  }
});

export default CategoriesController;
