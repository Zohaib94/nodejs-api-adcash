import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../../../src/config/server/index';
import CategoryService from '../../../../src/services/CategoryService';
import ProductService from '../../../../src/services/ProductService';

const BASE_CATEGORY_URL = '/api/v1/categories';

describe('ProductsController', () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      },
    );
  });

  afterAll(async (done) => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    done();
  });

  it('POST /categories/:categoryId/products (Validation Errors)', async (done) => {
    const category = await CategoryService.createCategory({
      title: 'Test',
    });

    const inputObject = {
      title: 'Updated Test',
    };

    const expectedOutput =
      'Product validation failed: name: Path `name` is required., description: Path `description` is required.';

    const res = await request(app)
      .post(`${BASE_CATEGORY_URL}/${category.id}/products/`)
      .send(inputObject);

    expect(res.statusCode).toEqual(422);
    expect(res.body.message).toEqual(expectedOutput);
    done();
  });

  it('POST /categories/:categoryId/products (Category Not Found)', async (done) => {
    const inputObject = {
      title: 'Updated Test',
    };

    const expectedOutput = 'Category Not Found';

    const res = await request(app)
      .post(`${BASE_CATEGORY_URL}/5e8888fa04c0410048cc853e/products/`)
      .send(inputObject);

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual(expectedOutput);
    done();
  });

  it('POST /categories/:categoryId/products (Category ID Invalid)', async (done) => {
    const inputObject = {
      title: 'Updated Test',
    };

    const expectedOutput = 'Invalid Category ID';

    const res = await request(app)
      .post(`${BASE_CATEGORY_URL}/5e8888fa04c0410048cc853/products/`)
      .send(inputObject);

    expect(res.statusCode).toEqual(422);
    expect(res.body.message).toEqual(expectedOutput);
    done();
  });

  it('POST /categories/:categoryId/products (Success)', async (done) => {
    const category = await CategoryService.createCategory({
      title: 'Test',
    });

    const inputObject = {
      name: 'Product Name',
      description: 'Product Description',
    };

    const res = await request(app)
      .post(`${BASE_CATEGORY_URL}/${category.id}/products/`)
      .send(inputObject);

    expect(res.statusCode).toEqual(200);
    expect(res.body.resource.name).toEqual(inputObject.name);
    expect(res.body.resource.description).toEqual(
      inputObject.description,
    );
    done();
  });
});
