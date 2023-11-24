const request = require('supertest');
const { faker } = require('@faker-js/faker');

const app = require('../../src/app');

const MAIN_ROUTE = '/users';

let user;

beforeAll(async () => {
  const userFakeData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const resUser = await app.services.user.save(userFakeData);
  user = { ...resUser };
});

describe('[USERS][GET]', () => {
  test('[1] - Listar os Utilizadores', () => request(app)
    .get(MAIN_ROUTE)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    }));
});

describe('[USERS][POST]', () => {
  test('[1] - Inserir Utilizadores', () => {
    const fakeData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    return request(app)
      .post(MAIN_ROUTE)
      .send(fakeData)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(fakeData.name);
      });
  });

  test('[2] - Inserir Utilizadores sem nome', () => {
    const fakeData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    return request(app)
      .post(MAIN_ROUTE)
      .send(fakeData)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Nome é um atributo obrigatório!');
      });
  });

  test('[3] - Inserir Utilizadores sem email', () => {
    const fakeData = {
      name: faker.person.fullName(),
      password: faker.internet.password(),
    };
    return request(app)
      .post(MAIN_ROUTE)
      .send(fakeData)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Email é um atributo obrigatório!');
      });
  });

  test('[4] - Inserir Utilizadores sem password', () => {
    const fakeData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
    return request(app)
      .post(MAIN_ROUTE)
      .send(fakeData)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Password é um atributo obrigatório!');
      });
  });

  test('[5] - Inserir Utilizadores com email duplicado', () => {
    const fakeData = {
      name: faker.person.fullName(),
      email: user.email,
      password: faker.internet.password(),
    };
    return request(app)
      .post(MAIN_ROUTE)
      .send(fakeData)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Email duplicado na DB!');
      });
  });
});
