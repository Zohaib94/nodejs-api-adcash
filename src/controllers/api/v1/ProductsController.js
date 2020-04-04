import { Router } from 'express';
import ProductService from '../../../services/ProductService';
import SuccessResponse from '../../../responses/SuccessReponse';
import { Types } from 'mongoose';
import ErrorResponse from '../../../responses/ErrorResponse';

const ProductsController = Router({ mergeParams: true });

ProductsController.delete(
  '/:productId',
  async (request, response) => {
    try {
      if (!Types.ObjectId.isValid(request.params.categoryId))
        throw new ErrorResponse('Invalid Category ID', 422);
      if (!Types.ObjectId.isValid(request.params.productId))
        throw new ErrorResponse('Invalid Product ID', 422);

      await ProductService.deleteCategoryProduct(
        request.params.categoryId,
        request.params.productId,
      );

      let responseObject = new SuccessResponse({
        message: 'Product has been deleted Successfully',
      });
      response.json(responseObject);
    } catch (err) {
      response.status(err.code).json(err.getResource());
    }
  },
);

ProductsController.patch('/:productId', async (request, response) => {
  try {
    if (!Types.ObjectId.isValid(request.params.categoryId))
      throw new ErrorResponse('Invalid Category ID', 422);
    if (!Types.ObjectId.isValid(request.params.productId))
      throw new ErrorResponse('Invalid Product ID', 422);

    let updatedProduct = await ProductService.updateCategoryProduct(
      request.params.categoryId,
      request.params.productId,
      request.body,
    );

    let responseObject = new SuccessResponse(updatedProduct);
    response.json(responseObject);
  } catch (err) {
    response.status(err.code).json(err.getResource());
  }
});

ProductsController.post('/', async (request, response) => {
  try {
    if (!Types.ObjectId.isValid(request.params.categoryId))
      throw new ErrorResponse('Invalid Category ID', 422);

    let newProduct = await ProductService.createCategoryProduct(
      request.params.categoryId,
      request.body,
    );

    let responseObject = new SuccessResponse(newProduct);
    response.json(responseObject);
  } catch (err) {
    response.status(err.code).json(err.getResource());
  }
});

export default ProductsController;
