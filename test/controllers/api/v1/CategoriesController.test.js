import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../../../src/config/server/index';

describe('CategoriesController', () => {
  beforeEach(async () => {
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
      .post('/api/v1/categories')
      .send(inputObject);

    expect(res.statusCode).toEqual(200);
    expect(res.body.resource.title).toEqual(inputObject.title);
    done();
  });

  it('GET /categories (return list)', async (done) => {
    const res = await request(app).get('/api/v1/categories');
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
      .post('/api/v1/categories')
      .send(inputObject);

    expect(res.statusCode).toEqual(422);
    expect(res.body.message).toEqual(errorMessage);
    done();
  });

  // it('GET /categories/:categoryId (Invalid ID)', async () => {
  //   const res = await request(app).get('/api/v1/categories');
  //   const expectedResult = [];

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.resource).toEqual(expectedResult);
  // });

  // it('GET /categories/:categoryId (Category does not exist)', async () => {
  //   const res = await request(app).get('/api/v1/categories');
  //   const expectedResult = [];

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.resource).toEqual(expectedResult);
  // });

  // it('GET /categories/:categoryId (Successful Case)', async () => {
  //   const res = await request(app).get('/api/v1/categories');
  //   const expectedResult = [];

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.resource).toEqual(expectedResult);
  // });

  // it('PATCH /categories/:categoryId (Successful Case, we have tested possible failures already)', async () => {
  //   const res = await request(app).get('/api/v1/categories');
  //   const expectedResult = [];

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.resource).toEqual(expectedResult);
  // });

  // it('DELETE /categories/:categoryId (Successful Case, we have tested possible failures already)', async () => {
  //   const res = await request(app).get('/api/v1/categories');
  //   const expectedResult = [];

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.resource).toEqual(expectedResult);
  // });
});
