import Category from '../../models/category/Category';
import CategoryAssembler from './CategoryAssembler';

class CategoryService {
  static async getAllCategories() {
    let categories = await Category.find();

    return categories.map(category =>
      CategoryAssembler.toResource(category)
    );
  }

  static async getCategory(id) {
    let category = await Category.findById(id);

    if (category) {
      return CategoryAssembler.toResource(category);
    } else {
      throw "Not Found";
    }
  }

  static async deleteCategory(id) {
    let category = await CategoryService.getCategory(id);

    await Category.deleteOne({_id: category.id})
  }
}

export default CategoryService;
