
# nodejs-api-adcash

API is deployed on https://nodejs-api-adcash.herokuapp.com/api/v1

**Endpoints:**

- `GET /categories` (List all categories)

- `GET /categories/:categoryId` (List a category with all of its products)

- `POST /categories` (Add a new category)

- `PATCH /categories/:categoryId` (Update Category)

- `DELETE /categories/:categoryId` (Delete Category)

- `POST /categories/:categoryId/products` (Add a new product in a category)

- `PATCH /categories/:categoryId/products/:productId` (Update a product in that category)

- `DELETE /categories/:categoryId/products/:productId` (Delete a product in that category)

**Deployment Steps with Heroku:**
- Create App on Heroku
- Setup MongoDB on MongoDB Cloud, Create a new Cluster and setup Connection to get connection string.
- Add Heroku Remote on local environment
- `git push heroku master`
- Setup `MONGOLAB_URL` environment variable on heroku.
- (Not recommended: For quicker deployment to face less issues regarding installation of dev dependencies for now, I have set `heroku config:set NPM_CONFIG_PRODUCTION=false`)
