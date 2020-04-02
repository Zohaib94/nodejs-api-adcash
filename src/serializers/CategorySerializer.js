import CategoryResponse from '../responses/CategoryResponse';

class CategorySerializer {
  static toResource(categoryObject) {
    let categoryResource = new CategoryResponse(
      categoryObject.title,
      categoryObject.id,
    );
    return categoryResource;
  }
}

export default CategorySerializer;
