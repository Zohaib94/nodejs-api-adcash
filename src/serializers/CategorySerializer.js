import CategoryResponse from '../responses/CategoryResponse';
import ProductResponse from '../responses/ProductResponse';

class CategorySerializer {
  static toResource(categoryObject) {
    let categoryResource = new CategoryResponse(
      categoryObject.title,
      categoryObject.id,
    );
    return categoryResource;
  }

  static toResourceWithProducts(categoryObject) {
    let categoryProducts = categoryObject.products.map((product) => {
      return new ProductResponse(product.name, product.description, product._id);
    })

    let categoryResource = new CategoryResponse(
      categoryObject.title,
      categoryObject.id
    );

    categoryResource.setProducts(categoryProducts);

    return categoryResource;
  }
}

export default CategorySerializer;
