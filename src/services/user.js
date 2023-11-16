module.exports = (app) => {
  const findAll = async () => app.db('users').select('*');
  const save = async (data) => {
    if (!data.name) return { messageError: 'Nome é um atributo obrigatório!' };
    if (!data.email) return { messageError: 'Email é um atributo obrigatório!' };
    if (!data.password) return { messageError: 'Password é um atributo obrigatório!' };
    const result = await app.db('users').insert(data, '*');
    return result[0];
  };
  return { findAll, save };
};
