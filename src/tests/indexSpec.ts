import supertest from 'supertest';
import app from '../index';
import * as fs from 'fs';

const req = supertest(app);
const outImg = `${__dirname}/../../images/tum/fjord-222-222.jpg`; // make path image after add user

describe('first test', () => {
  beforeAll(function () {
    // wait async time
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200;
  });

  // home api
  it('test home 200 ', () => {
    return req.get('/').then((res) => {
      expect(res.status).toBe(200);
    });
  });
  // home api

  // main api
  it('test main api 200 ', () => {
    return req.get('/api').then((res) => {
      expect(res.status).toBe(200);
    });
  });
  // main api

  // main api
  it('test main api 404 ', () => {
    return req.get('/404').then((res) => {
      expect(res.status).toBe(404);
    });
  });
  // main api

  // GET api images
  it('test api image 200 ', async () => {
    return await req
      .get('/api/images?filename=fjord&width=222&height=222')
      .then((res) => {
        expect(res.status).toBe(200);

        try {
          fs.unlinkSync(outImg);
        } catch {
          console.log('err test pass image');
        }
      });
  });
  // GET api images
});
