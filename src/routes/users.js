const express = require("express");

module.exports = (app) => {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      app.db("users").select().then((result) => {
        res.status(200).json(result)
      })

    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const result = await app.db("users").insert(req.body, '*');
      res.status(201).json(result[0])
    } catch (err) {
      next(err);
    }
  });
  return router;
};