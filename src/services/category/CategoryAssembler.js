import CategoryDTO from '../../models/category/CategoryDTO';

class CategoryAssembler {
  static toResource(categoryObject) {
    let categoryResource = new CategoryDTO(categoryObject.title);
    return categoryResource;
  }
}

export default CategoryAssembler;
