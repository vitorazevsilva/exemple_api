const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const secret = 'ipca!#2324'; // altere isso para o seu próprio segredo

module.exports = (app) => {
  const strategy = new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter('Token'),
      ]),
      secretOrKey: secret,
    },
    (payload, done) => {
      app.services.user.findOne({ id: payload.id })
        .then((user) => {
          if (user) done(null, { ...payload });
          else done(null, false);
        })
        .catch((err) => done(err, false));
    },
  );

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate('jwt', { session: false }),
  };
};
