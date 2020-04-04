import ProductSerializer from '../serializers/ProductSerializer';
import Product from '../models/Product';
import Category from '../models/Category';
import CategoryService from './CategoryService';

class ProductService {
  static async deleteCategoryProduct(categoryId, productId) {
    let category = await Category.findById(categoryId);
    let product = await Product.findById(productId);

    if(!category) throw "Category Not Found"
    if(!product) throw "Product Not Found"
    if(!(category.products.includes(product._id))) throw "Product is not of this category"

    await Product.deleteOne({ _id: product.id });

    category.products.pull(product._id)
    await category.save();

    return 200;
  }

  static async updateCategoryProduct(categoryId, productId, params) {
    let category = await Category.findById(categoryId);
    let product = await Product.findById(productId);

    if(!category) throw "Category Not Found"
    if(!product) throw "Product Not Found"
    if(!(category.products.includes(product._id))) throw "Product is not of this category"

    try {
      product.set({ name: params.name, description: params.description });
      let updatedProduct = await product.save();

      return ProductSerializer.toResource(updatedProduct);
    } catch (error) {
      throw error;
    }
  }

  static async createCategoryProduct(categoryId, params) {
    let category = await Category.findById(categoryId);

    let productParams = {
      name: params.name,
      description: params.description,
      _category: category._id
    }

    let product = new Product(productParams);
    product = await product.save()

    category.products.push(product);
    await category.save();

    return (ProductSerializer.toResource(product));
  }
}

export default ProductService;
