const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.post('/signin', async (req, res, next) => {
    app.services.auth.signin(req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  return router;
};
