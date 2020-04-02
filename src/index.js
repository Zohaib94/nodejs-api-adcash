import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.listen(3000, () =>
  console.log('Adcash NodeJS API listening on port 3000!'),
);
