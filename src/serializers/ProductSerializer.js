import ProductResponse from '../responses/ProductResponse';

class ProductSerializer {
  static toResource(productObject) {
    let productResource = new ProductResponse(
      productObject.name,
      productObject.description,
      productObject._id,
    );
    return productResource;
  }
}

export default ProductSerializer;
