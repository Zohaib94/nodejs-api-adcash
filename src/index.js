import { connectDb } from './config/database/mongoose';
import app from './config/server/index';

connectDb().then(async () => {
  const port = process.env.PORT || 3000;

  app.listen(port, () =>
    console.log('Adcash NodeJS API listening on port 3000!'),
  );
});
