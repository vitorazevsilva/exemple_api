const ValidationError = require('../errors/validationError');

module.exports = (app) => {
  const findAll = async (query = {}) => app.db('users').where(query).select();
  const save = async (data) => {
    if (!data.name) throw new ValidationError('Nome é um atributo obrigatório!');
    if (!data.email) throw new ValidationError('Email é um atributo obrigatório!');
    if (!data.password) throw new ValidationError('Password é um atributo obrigatório!');

    const userDB = await app.services.user.findAll({ email: data.email });
    if (userDB && userDB.length > 0) throw new ValidationError('Email duplicado na DB!');
    const result = await app.db('users').insert(data, '*');
    return result[0];
  };
  return { findAll, save };
};
