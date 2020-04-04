import { Router } from 'express';
import ProductService from '../../../services/ProductService';

const ProductsController = Router({ mergeParams: true });

ProductsController.delete(
  '/:productId',
  async (request, response) => {
    try {
      await ProductService.deleteCategoryProduct(request.params.categoryId, request.params.productId);
      response.send('Deleted Succesfully');
    } catch (err) {
      response.status(500).send(err);
    }
  },
);

ProductsController.patch(
  '/:productId',
  async (request, response) => {
    try {
      let updatedProduct = await ProductService.updateCategoryProduct(
        request.params.categoryId,
        request.params.productId,
        request.body,
      );
      response.send(updatedProduct);
    } catch (err) {
      response.status(500).send(err);
    }
  },
);

ProductsController.post('/', async (request, response) => {
  try {
    let newProduct = await ProductService.createCategoryProduct(
      request.params.categoryId,
      request.body
    );
    response.send(newProduct);
  } catch (err) {
    response.send(err);
  }
});

export default ProductsController;
