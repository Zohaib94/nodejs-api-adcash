import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../../../src/config/server/index';
import CategoryService from '../../../../src/services/CategoryService';
import ProductService from '../../../../src/services/ProductService';

const BASE_CATEGORY_URL = '/api/v1/categories';

describe('CategoriesController', () => {
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

  it('POST /categories (success)', async (done) => {
    const inputObject = {
      title: 'Test',
    };

    const res = await request(app)
      .post(BASE_CATEGORY_URL)
      .send(inputObject);

    expect(res.statusCode).toEqual(200);
    expect(res.body.resource.title).toEqual(inputObject.title);
    done();
  });

  it('GET /categories (return list)', async (done) => {
    const res = await request(app).get(BASE_CATEGORY_URL);
    const expectedResult = 'Test';

    expect(res.statusCode).toEqual(200);
    expect(res.body.resource[0]['title']).toEqual(expectedResult);
    done();
  });

  it('POST /categories (validation error)', async (done) => {
    const inputObject = {};
    const errorMessage =
      'Category validation failed: title: Path `title` is required.';

    const res = await request(app)
      .post(BASE_CATEGORY_URL)
      .send(inputObject);

    expect(res.statusCode).toEqual(422);
    expect(res.body.message).toEqual(errorMessage);
    done();
  });

  it('GET /categories/:categoryId (Invalid ID)', async (done) => {
    const res = await request(app).get(
      `${BASE_CATEGORY_URL}/5e8888fa04c0410048cc853`,
    );
    const expectedResult = 'Invalid Category ID';

    expect(res.statusCode).toEqual(422);
    expect(res.body.message).toEqual(expectedResult);
    done();
  });

  it('GET /categories/:categoryId (Category Not Found)', async (done) => {
    const res = await request(app).get(
      `${BASE_CATEGORY_URL}/5e8888fa04c0410048cc853e`,
    );
    const expectedResult = 'Category Not Found';

    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual(expectedResult);
    done();
  });

  it('GET /categories/:categoryId (Successful Case)', async (done) => {
    const category = await CategoryService.createCategory({
      title: 'Test',
    });
    const product = await ProductService.createCategoryProduct(
      category.id,
      { name: 'Test Product', description: 'Test Description' },
    );

    const res = await request(app).get(
      `${BASE_CATEGORY_URL}/${category.id}`,
    );
    const expectedResult = {
      id: category.id,
      title: category.title,
      products: [
        {
          id: product.id,
          name: product.name,
          description: product.description,
        },
      ],
    };

    expect(res.statusCode).toEqual(200);
    expect(res.body.resource).toEqual(expectedResult);
    done();
  });

  it('PATCH /categories/:categoryId (Successful Case, we have tested possible failures already)', async (done) => {
    const category = await CategoryService.createCategory({
      title: 'Test',
    });

    const inputObject = {
      title: 'Updated Test',
    };

    const res = await request(app)
      .patch(`${BASE_CATEGORY_URL}/${category.id}`)
      .send(inputObject);

    expect(res.statusCode).toEqual(200);
    expect(res.body.resource.title).toEqual(inputObject.title);
    done();
  });

  it('DELETE /categories/:categoryId (Successful Case, we have tested possible failures already)', async (done) => {
    const category = await CategoryService.createCategory({
      title: 'Test',
    });

    const oldLength = (await CategoryService.getAllCategories())
      .length;
    const res = await request(app).delete(
      `${BASE_CATEGORY_URL}/${category.id}`,
    );
    const newLength = (await CategoryService.getAllCategories())
      .length;

    expect(res.statusCode).toEqual(200);
    expect(oldLength > newLength).toEqual(true);
    done();
  });
});
