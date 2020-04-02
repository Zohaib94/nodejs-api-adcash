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
}

export default CategoryService;
