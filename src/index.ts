import express, { Application, Request, Response } from 'express';

import { urlencoded } from 'body-parser';
import { existsSync } from 'fs';
import sharp from "sharp";

const app: Application = express();
const port = 3000;

app.use(urlencoded({ extended: true }));
app.use(express.static('images')); // add suport static file like image

// http://localhost:3000/api/images?filename=fjord&width=1280&height=1080
let outImg: string;
let imgUrl: string;
let imgFull: string;
app.get(
  '/api/images',
  (req: express.Request, res: express.Response ) => {
    try {
      imgFull = `${__dirname}/../images/full/${req.query.filename}.jpg`; // make path image for sharp for resize
      outImg = `${__dirname}/../images/tum/${req.query.filename}-${req.query.width}-${req.query.height}.jpg`; // make path image after add user
      imgUrl = `/tum/${req.query.filename}-${req.query.width}-${req.query.height}.jpg`; // make path image short after add user

      if (existsSync(outImg)) {
        // check if image exist by lb fs
        res.send(`<img src="${imgUrl}" ></img>`); // show image of alredy exist
      } else {
        sharp(imgFull) // here is input image to sharp for resize
          .resize(Number(req.query.width), Number(req.query.height)) // now resize it
          .toFile(outImg) // here is output image
          .then(() => {
            res.send(`<img src="${imgUrl}" ></img>`); // and then show image
          });
      }
    } catch (error) {
      res.send(`Missing filename, height or width`); // show error
    }
  }
);

// Body parsing Middleware
app.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res
    .status(200)
    .send(
      'http://localhost:3000/api/images?filename=fjord&width=1280&height=1080'
    );
});
//Returns a message in response text to hit the main api/images endpoint
app.get('/api', async (req: Request, res: Response): Promise<Response> => {
  return res
    .status(200)
    .send(
      'Returns a message in response text to hit the main api/images endpoint'
    );
});

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured:  `);
}

export default app;
