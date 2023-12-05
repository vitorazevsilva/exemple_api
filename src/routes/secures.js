const router = require('express').Router();

module.exports = () => router.get('/', async (req, res) => res.status(200).json({ message: "It's safe here!" }));
