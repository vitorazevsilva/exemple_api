module.exports = (app) => {
  const findAll = async (query = {}) => app.db('accounts').where(query).select();
  const find = async (query = {}) => app.db('accounts').where(query).first();
  const save = async (data) => {
    const result = await app.db('accounts').insert(data, '*');
    return result[0];
  };
  return { save, findAll, find };
};
