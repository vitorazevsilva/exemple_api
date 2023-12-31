const request = require('supertest');
const { faker } = require('@faker-js/faker');

const app = require('../../src/app');

const MAIN_ROUTE = '/secure/users';

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

describe('[USERS][GET]', () => {
  test('[1] - Listar os Utilizadores', () => request(app)
    .get(MAIN_ROUTE)
    .set('authorization', `bearer ${user.token}`)
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
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(fakeData.name);
        expect(res.body).not.toHaveProperty('password');
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
      .set('authorization', `bearer ${user.token}`)
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
      .set('authorization', `bearer ${user.token}`)
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
      .set('authorization', `bearer ${user.token}`)
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
      .set('authorization', `bearer ${user.token}`)
      .then((res) => {
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Email duplicado na DB!');
      });
  });

  test('[5] - Guardar a palavra-passe encriptada', () => {
    const fakeData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
    return request(app)
      .post(MAIN_ROUTE)
      .send(fakeData)
      .set('authorization', `bearer ${user.token}`)
      .then(async (res) => {
        expect(res.status).toBe(201);
        const { id } = res.body;
        const userDB = await app.services.user.findOne({ id });
        expect(userDB[0].password).not.toBeUndefined();
        expect(userDB[0].password).not.toBe(fakeData.password);
      });
  });
});
