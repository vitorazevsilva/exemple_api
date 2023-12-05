const request = require('supertest');
const { faker } = require('@faker-js/faker');

const app = require('../src/app');

const MAIN_ROUTE = '/secure';

let user;
let userFakeData;
beforeAll(async () => {
  userFakeData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const resUser = await app.services.user.save(userFakeData);
  const resAuth = await app.services.auth.signin({
    email: userFakeData.email,
    password: userFakeData.password,
  });
  user = { ...resUser, ...resAuth };
});

describe('[PASSPORT][GET]', () => {
  test('[1] - Request with valid token (header)', () => request(app)
    .get(MAIN_ROUTE)
    .send()
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
    }));

  test('[2] - Request with invalid token (header)', () => request(app)
    .get(MAIN_ROUTE)
    .send()
    .set('authorization', 'bearer baac1de508fb43e285aec2802126a0a2')
    .then((res) => {
      expect(res.status).toBe(401);
    }));

  test('[3] - Request with valid token (query)', () => request(app)
    .get(`${MAIN_ROUTE}?Token=${user.token}`)
    .send()
    .then((res) => {
      expect(res.status).toBe(200);
    }));

  test('[4] - Request with invalid token (query)', () => request(app)
    .get(`${MAIN_ROUTE}?Token=baac1de508fb43e285aec2802126a0a2`)
    .send()
    .then((res) => {
      expect(res.status).toBe(401);
    }));
  test('[5] - Request without token', () => request(app)
    .get(MAIN_ROUTE)
    .send()
    .then((res) => {
      expect(res.status).toBe(401);
    }));
});
