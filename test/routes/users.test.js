const request = require('supertest');
const { faker } = require('@faker-js/faker');

const app = require('../../src/app');

describe('[USERS][GET]', () => {
  test('[USERS][1] - Listar os Utilizadores', () => request(app)
    .get('/users')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    }));
});

describe('[USERS][POST]', () => {
  test('[USERS][2] - Inserir Utilizadores', () => {
    const fakeData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    return request(app)
      .post('/users')
      .send(fakeData)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(fakeData.name);
      });
  });

  test('[USERS][3] - Inserir Utilizadores sem nome', () => {
    const fakeData = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    return request(app)
      .post('/users')
      .send(fakeData)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.messageError).toBe('Nome é um atributo obrigatório!');
      });
  });

  test('[USERS][4] - Inserir Utilizadores sem email', () => {
    const fakeData = {
      name: faker.person.fullName(),
      password: faker.internet.password(),
    };
    return request(app)
      .post('/users')
      .send(fakeData)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.messageError).toBe('Email é um atributo obrigatório!');
      });
  });

  test('[USERS][5] - Inserir Utilizadores sem password', () => {
    const fakeData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    };
    return request(app)
      .post('/users')
      .send(fakeData)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.messageError).toBe('Password é um atributo obrigatório!');
      });
  });
});
