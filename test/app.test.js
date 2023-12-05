const request = require('supertest');

const app = require('../src/app');

describe('[APP][GET]', () => {
  test('[1] - App to resolve at the root', () => request(app)
    .get('/')
    .then((res) => {
      expect(res.status).toBe(200);
    }));

  test('[2] - Page Not Found', () => request(app)
    .get('/notfound')
    .then((res) => {
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Pedido Desconhecido!');
    }));
});
