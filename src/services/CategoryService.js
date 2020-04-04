import Category from '../models/Category';
import CategorySerializer from '../serializers/CategorySerializer';
import ErrorResponse from '../responses/ErrorResponse';

class CategoryService {
  static async getAllCategories() {
    let categories = await Category.find();

    return categories.map((category) =>
      CategorySerializer.toResource(category),
    );
  }

  static async getCategory(id) {
    let category = await Category.findById(id).populate('products');
    if (!category) throw new ErrorResponse('Category Not Found', 404);

    return CategorySerializer.toResourceWithProducts(category);
  }

  static async deleteCategory(id) {
    let category = await CategoryService.getCategory(id);

    await Category.deleteOne({ _id: category.id });
  }

  static async updateCategory(id, params) {
    let category = await Category.findById(id);
    if (!category) throw new ErrorResponse('Category Not Found', 404);

    try {
      category.set({ title: params.title });
      let updatedCategory = await category.save();

      return CategorySerializer.toResource(updatedCategory);
    } catch (error) {
      throw new ErrorResponse(error.message, 422);
    }
  }

  static async createCategory(params) {
    try {
      let category = new Category();
      category.set({ title: params.title });
      let newCategory = await category.save();

      return CategorySerializer.toResource(newCategory);
    } catch (error) {
      throw new ErrorResponse(error.message, 422);
    }
  }
}

export default CategoryService;
