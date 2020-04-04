import { Router, response } from 'express';
import CategoryService from '../../../services/CategoryService';
import ProductsController from './ProductsController';
import SuccessResponse from '../../../responses/SuccessReponse';

const CategoriesController = Router();

CategoriesController.get('/', async (request, response) => {
  try {
    let categories = await CategoryService.getAllCategories();
    let responseObject = new SuccessResponse(categories);

    response.json(responseObject);
  } catch (err) {
    response.status(err.code).json(err.getResource());
  }
});

CategoriesController.get(
  '/:categoryId',
  async (request, response) => {
    try {
      let category = await CategoryService.getCategory(
        request.params.categoryId,
      );
      let responseObject = new SuccessResponse(category);

      response.json(responseObject);
    } catch (err) {
      response.status(err.code).json(err.getResource());
    }
  },
);

CategoriesController.delete(
  '/:categoryId',
  async (request, response) => {
    try {
      await CategoryService.deleteCategory(request.params.categoryId);
      let responseObject = new SuccessResponse({
        message: 'Category has been deleted successfully',
      });

      response.json(responseObject);
    } catch (err) {
      response.status(err.code).json(err.getResource());
    }
  },
);

CategoriesController.patch(
  '/:categoryId',
  async (request, response) => {
    try {
      let updatedCategory = await CategoryService.updateCategory(
        request.params.categoryId,
        request.body,
      );
      let responseObject = new SuccessResponse(updatedCategory);

      response.json(responseObject);
    } catch (err) {
      response.status(err.code).json(err.getResource());
    }
  },
);

CategoriesController.post('/', async (request, response) => {
  try {
    let newCategory = await CategoryService.createCategory(
      request.body,
    );
    let responseObject = new SuccessResponse(newCategory);

    response.json(responseObject);
  } catch (err) {
    response.status(err.code).json(err.getResource());
  }
});

CategoriesController.use('/:categoryId/products', ProductsController);

export default CategoriesController;
