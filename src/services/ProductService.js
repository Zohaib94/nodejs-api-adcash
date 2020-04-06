import ProductSerializer from '../serializers/ProductSerializer';
import Product from '../models/Product';
import Category from '../models/Category';
import ErrorResponse from '../responses/ErrorResponse';

class ProductService {
  static async deleteCategoryProduct(categoryId, productId) {
    let category = await Category.findById(categoryId);
    let product = await Product.findById(productId);

    if (!category) throw new ErrorResponse('Category Not Found', 404);
    if (!product) throw new ErrorResponse('Product Not Found', 404);
    if (!category.products.includes(product._id)) {
      throw new ErrorResponse(
        'Product does not belong to this category',
        422,
      );
    }

    try {
      await Product.deleteOne({ _id: product.id });
      category.products.pull(product._id);
      await category.save();
    } catch (error) {
      throw new ErrorResponse(error.message, 422);
    }
  }

  static async updateCategoryProduct(categoryId, productId, params) {
    let category = await Category.findById(categoryId);
    let product = await Product.findById(productId);

    if (!category) throw new ErrorResponse('Category Not Found', 404);
    if (!product) throw new ErrorResponse('Product Not Found', 404);
    if (!category.products.includes(product._id)) {
      throw new ErrorResponse(
        'Product does not belong to this category',
        422,
      );
    }

    try {
      product.set({
        name: params.name,
        description: params.description,
      });
      let updatedProduct = await product.save();

      return ProductSerializer.toResource(updatedProduct);
    } catch (error) {
      throw new ErrorResponse(error.message, 422);
    }
  }

  static async createCategoryProduct(categoryId, params) {
    let category = await Category.findById(categoryId);
    if (!category) throw new ErrorResponse('Category Not Found', 404);

    let productParams = {
      name: params.name,
      description: params.description,
      _category: category._id,
    };

    let product = new Product(productParams);

    try {
      product = await product.save();

      category.products.push(product);
      await category.save();

      return ProductSerializer.toResource(product);
    } catch (error) {
      throw new ErrorResponse(error.message, 422);
    }
  }
}

export default ProductService;
