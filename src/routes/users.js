const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      app.services.user.findAll()
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const result = await app.services.user.save(req.body);
      res.status(201).json(result);
    } catch (err) {
      // res.status(400).json({ error: err.message });
      next(err);
    }
    return false;
  });
  return router;
};
