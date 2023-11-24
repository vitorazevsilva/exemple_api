const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = async (query = {}) => app.db('accounts').where(query).select();
  const find = async (query = {}) => app.db('accounts').where(query).first();
  const save = async (data) => {
    if (!data.name) throw new ValidationError('Nome é um atributo obrigatório!');
    const result = await app.db('accounts').insert(data, '*');
    return result[0];
  };
  const update = async (data, id) => {
    const result = await app.db('accounts').where({ id }).update(data, '*');
    return result[0];
  };
  const remove = async (id) => {
    const accountDB = await app.services.account.find({ id });
    if (!accountDB || accountDB === undefined) throw new ValidationError('Conta invalida!');
    return app.db('accounts').where({ id }).del();
  };
  return {
    save, findAll, find, update, remove,
  };
};
