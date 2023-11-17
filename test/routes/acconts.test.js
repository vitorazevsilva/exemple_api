const request = require('supertest');
const { faker } = require('@faker-js/faker');

const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';

let user;
let account;

beforeAll(async () => {
  const userFakeData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const resUser = await app.services.user.save(userFakeData);
  user = { ...resUser };

  const accountFakeData = { name: `Account #${Date.now()}`, user_id: user.id };
  const resAccount = await app.services.account.save(accountFakeData);
  account = { ...resAccount };
});

describe('[ACCOUNTS][POST]', () => {
  test('[ACCOUNTS][1] - Inserir conta', async () => {
    const fakeData = { name: `Account #${Date.now()}`, user_id: user.id };
    return request(app)
      .post(MAIN_ROUTE)
      .send(fakeData)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(fakeData.name);
      });
  });
});

describe('[ACCOUNTS][GET]', () => {
  test('[ACCOUNTS][2] - Listar contas', async () => request(app)
    .get(MAIN_ROUTE)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    }));

  test('[ACCOUNTS][3] - Lista conta por id', async () => request(app)
    .get(`${MAIN_ROUTE}/${account.id}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe(account.name);
      expect(res.body.user_id).toBe(account.user_id);
    }));
});
