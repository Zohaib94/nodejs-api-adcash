import Category from '../../models/category/Category';
import CategoryAssembler from './CategoryAssembler';

class CategoryService {
  static async getAllCategories() {
    let categories = await Category.find();

    try {
      return categories.map(category =>
        CategoryAssembler.toResource(category)
      );
    } catch (err) {
      throw err;
    }
  }

  static async getCategory(id) {
    let category = await Category.findById(id);

    try {
      if (category) {
        return CategoryAssembler.toResource(category);
      } else {
        throw "Not Found";
      }
    } catch (err) {
      throw err;
    }
  }
}

export default CategoryService;
