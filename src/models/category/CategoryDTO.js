class CategoryDTO {
  constructor(title='') {
    this.title = title;
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }
}

export default CategoryDTO;
