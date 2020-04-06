
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

**Testing:**
- `npm test` to run tests.

**Deployment Steps with Heroku:**
Note: The app is already deployed on https://nodejs-api-adcash.herokuapp.com/api/v1, However, to deploy this application, take following steps:
- Make sure Heroku CLI is installed in your local environment.
- `git clone https://github.com/Zohaib94/nodejs-api-adcash.git`
- `heroku create app-name` (or Create App on Heroku Web Console in your account and add heroku remote through Heroku CLI)
- Setup MongoDB on MongoDB Cloud, Create a new Cluster and setup Connection to get connection string.
- Setup `MONGOLAB_URL` environment variable on Heroku Web Console for your newly created app.
- `git push heroku master`
- `heroku config:set NPM_CONFIG_PRODUCTION=false`
