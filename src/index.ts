import express from 'express';
import { urlencoded } from 'body-parser';

import apiRoute from './utils/api';
import imgRoute from './utils/image';
import homeRoute from './utils/utils';

const app = express();
const port = 3000;

app.use(urlencoded({ extended: true }));
app.use(express.static('images')); // add suport static file like image

app.use('/', apiRoute);
app.use('/', imgRoute);
app.use('/', homeRoute);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured:  `);
}

export default app;
