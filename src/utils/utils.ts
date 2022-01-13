// import * as express from 'express';
import express, { Request, Response } from 'express';

const homeRoute = express.Router();

// Body parsing Middleware
homeRoute.get('/', async (req: Request, res: Response): Promise<Response> => {
  return res
    .status(200)
    .send(
      'http://localhost:3000/api/images?filename=fjord&width=1280&height=1080'
    );
});

export default homeRoute;
