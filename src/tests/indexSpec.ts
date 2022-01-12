import supertest from 'supertest';
import app from '../index';

const req = supertest(app);

describe('first test', () => {
	beforeAll(function () { // wait async time 
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 1200;
	});

	// home api
	it('test home 200 ', () => {
		return req.get('/').then((res) => {
			expect(res.status).toBe(200);
		});
	});
	// home api

	// GET api images
	it('test api image 200 ', async () => {
		return await req.get('/api/images?filename=fjord&width=1280&height=1080').then((res) => {
			expect(res.status).toBe(200);

		});
	});
	// GET api images

});
