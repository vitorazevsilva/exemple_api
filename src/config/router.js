// const express = require('express');

module.exports = (app) => {
  // const secureRouter = express.Router();
  app.use('/users', app.routes.users);
  app.use('/accounts', app.routes.accounts);
  // app.use("/admin", app.config.passport.authenticate(), secureRouter);
};
