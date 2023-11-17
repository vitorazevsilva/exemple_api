const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.post('/', async (req, res, next) => {
    try {
      app.services.account.save(req.body)
        .then((result) => {
          res.status(201).json(result);
        });
    } catch (err) {
      next(err);
    }
  });

  router.get('/', async (req, res, next) => {
    try {
      app.services.account.findAll().then((result) => {
        res.status(200).json(result);
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    try {
      app.services.account.find({ id: req.params.id }).then((result) => {
        res.status(200).json(result);
      });
    } catch (err) {
      next(err);
    }
  });

  return router;
};
