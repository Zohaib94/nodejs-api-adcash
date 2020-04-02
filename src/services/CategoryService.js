import Category from '../models/Category';
import CategorySerializer from '../serializers/CategorySerializer';

class CategoryService {
  static async getAllCategories() {
    let categories = await Category.find();

    return categories.map((category) =>
      CategorySerializer.toResource(category),
    );
  }

  static async getCategory(id) {
    let category = await Category.findById(id).populate('products');

    if (category) {
      return CategorySerializer.toResourceWithProducts(category);
    } else {
      throw 'Not Found';
    }
  }

  static async deleteCategory(id) {
    let category = await CategoryService.getCategory(id);

    await Category.deleteOne({ _id: category.id });
  }

  static async updateCategory(id, params) {
    let category = await Category.findById(id);

    if (!category) {
      throw 'Not Found';
    }

    try {
      category.set({ title: params.title });
      let updatedCategory = await category.save();

      return CategorySerializer.toResource(updatedCategory);
    } catch (error) {
      throw error;
    }
  }

  static async createCategory(params) {
    try {
      let category = new Category();
      category.set({ title: params.title });
      let newCategory = await category.save();

      return CategorySerializer.toResource(newCategory);
    } catch (error) {
      throw error;
    }
  }
}

export default CategoryService;
