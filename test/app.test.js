const request = require('supertest');

const app = require('../src/app');

describe('[APP][GET]', () => {
  test('[APP][1] - App to resolve at the root', () => request(app)
    .get('/')
    .then((res) => {
      expect(res.status).toBe(200);
    }));
});
