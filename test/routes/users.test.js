const request = require('supertest');

const app = require('../../src/app');

const mail = `${Date.now()}@temp.ipca.pt`;

describe('[USERS][GET]', () => {
  test('[USERS][1] - Listar Utilizadores', () => request(app)
    .get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    }));
});

describe('[USERS][POST]', () => {
  test('[USERS][2] - Listar Utilizadores', () => request(app)
    .post('/users')
    .send({ name: 'Vitor Silva', email: mail, password: 'myS3cr3tPasswd' })
    .then((res) => {
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('Vitor Silva');
    }));
});
