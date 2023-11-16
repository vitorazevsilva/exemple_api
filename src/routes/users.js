const express = require('express');

module.exports = (app) => {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      app.services.user.findAll().then((result) => {
        res.status(200).json(result);
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const result = await app.services.user.save(req.body);
      if (result.messageError) return res.status(400).json(result);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });
  return router;
};