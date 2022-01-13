// import * as express from 'express';
import express, { Request, Response } from 'express';

const apiRoute = express.Router();

//Returns a message in response text to hit the main api/images endpoint
apiRoute.get('/api', async (req: Request, res: Response): Promise<Response> => {
  return res
    .status(200)
    .send(
      'Returns a message in response text to hit the main api/images endpoint'
    );
});

export default apiRoute;
