const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');

// const ValidationError = require('../errors/validationError');

const secret = 'ipca!#2324';

module.exports = (app) => {
  const signin = async (data) => {
    let token = null;

    const user = await app.db('users').where({ email: data.email }).first('*');

    if (bcrypt.compareSync(data.password, user.password)) {
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      token = jwt.encode(payload, secret);
    }
    return { token };
  };
  return { signin };
};
