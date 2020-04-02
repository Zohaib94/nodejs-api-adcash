import CategoryDTO from '../../models/category/CategoryDTO';

class CategoryAssembler {
  static toResource(categoryObject) {
    let categoryResource = new CategoryDTO(categoryObject.title, categoryObject.id);
    return categoryResource;
  }
}

export default CategoryAssembler;
