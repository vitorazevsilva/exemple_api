module.exports = (app) => {
  const findAll = async () => app.db('users').select('*');
  const save = async (data) => {
    const result = await app.db('users').insert(data, '*');
    return result[0];
  };
  return { findAll, save };
};
