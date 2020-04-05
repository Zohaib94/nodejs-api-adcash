import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../../../src/config/server/index';

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

  afterEach(async (done) => {
    await mongoose.connection.close();
    done();
  });

  it('should return list of categories', async () => {
    const res = await request(app).get('/api/v1/categories');
    const expectedResult = [];

    expect(res.statusCode).toEqual(200);
    expect(res.body.resource).toEqual(expectedResult);
  });
});
