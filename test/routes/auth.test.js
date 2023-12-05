const request = require('supertest');
const { faker } = require('@faker-js/faker');

const app = require('../../src/app');

const MAIN_ROUTE = '/auths';

let user;
let userFakeData;
beforeAll(async () => {
  userFakeData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const resUser = await app.services.user.save(userFakeData);
  user = { ...resUser };
});

describe('[AUTHS][POST]', () => {
  test('[1] - Receber token ao autenticar', () => request(app)
    .post(`${MAIN_ROUTE}/signin`)
    .send({ email: user.email, password: userFakeData.password })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.token).not.toBeNull();
    }));

  test('[2] - Tentativa de autenticação errada (password)', () => request(app)
    .post(`${MAIN_ROUTE}/signin`)
    .send({ email: user.email, password: 'myPasswd' })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Autenticação invalida!');
    }));

  test('[3] - Tentativa de autenticação errada (email)', () => request(app)
    .post(`${MAIN_ROUTE}/signin`)
    .send({ email: 'a22537@alunos.ipca.pt', password: userFakeData.password })
    .then((res) => {
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Autenticação invalida!');
    }));
});
