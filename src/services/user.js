module.exports = (app) => {
  const findAll = async (query = {}) => app.db('users').where(query).select();
  const save = async (data) => {
    if (!data.name) return { messageError: 'Nome é um atributo obrigatório!' };
    if (!data.email) return { messageError: 'Email é um atributo obrigatório!' };
    if (!data.password) return { messageError: 'Password é um atributo obrigatório!' };

    const userDB = await app.services.user.findAll({ email: data.email });
    if (userDB && userDB.length > 0) return { messageError: 'Email duplicado na DB!' };
    const result = await app.db('users').insert(data, '*');
    return result[0];
  };
  return { findAll, save };
};
