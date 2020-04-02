class CategoryResponse {
  constructor(title = '', id = '') {
    this.title = title;
    this.id = id;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  getId() {
    return this.id;
  }

  setProducts(products) {
    this.products = products;
  }
}

export default CategoryResponse;
