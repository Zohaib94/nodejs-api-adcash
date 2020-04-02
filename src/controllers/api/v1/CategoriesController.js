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
    let category = await CategoryService.getCategory(request.params.categoryId);
    response.send(category);
  } catch (err) {
    response.status(500).send(err);
  }
});

CategoriesController.delete('/:categoryId', async (request, response) => {
  try {
    await CategoryService.deleteCategory(request.params.categoryId);
    response.send("Deleted Succesfully");
  } catch (err) {
    response.status(500).send(err);
  }
});

CategoriesController.patch('/:categoryId', async (request, response) => {
  try {
    let updatedCategory = await CategoryService.updateCategory(request.params.categoryId, request.body);
    response.send(updatedCategory);
  } catch (err) {
    response.status(500).send(err);
  }
});

CategoriesController.post('/', async (request, response) => {
  try {
    let updatedCategory = await CategoryService.createCategory(request.body);
    response.send(updatedCategory);
  } catch (err) {
    response.status(500).send(err);
  }
});


export default CategoriesController;
