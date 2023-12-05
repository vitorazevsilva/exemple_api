const app = require('express')();
const knex = require('knex');
const cors = require('cors');
const winston = require('winston');
const consign = require('consign');
const { uuid } = require('uuidv4');
const knexfile = require('../knexfile');

app.use(cors());
app.env = process.env.NODE_ENV || 'production';

app.db = knex(knexfile[app.env]);

app.address = {
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 3001,
};

app.logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.json({ space: 1 }),
    }),
    new winston.transports.File({
      filename: `./logs/${app.env}.log`,
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json({ space: 1 }),
      ),
    }),
  ],
});

consign({ cwd: 'src', verbose: false })
  .include('./config/middlewares.js')
  .include('./services')
  .include('./routes')
  .include('./config/router.js')
  .into(app);

app.get('/', (req, res) => {
  const date = new Date();
  res.status(200).json({
    message: 'Welcome to CD API',
    server_info: {
      host: app.address.host,
      port: app.address.port,
      environment: process.env.NODE_ENV || 'production',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: date.getTime(),
      time_now: `${String(date.getFullYear())}-${String(
        date.getMonth() + 1,
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(
        date.getHours(),
      ).padStart(2, '0')}:${String(date.getMinutes()).padStart(
        2,
        '0',
      )}:${String(date.getSeconds()).padStart(2, '0')}`,
    },
  });
});

app.use(({ name, message, stack }, req, res, next) => {
  if (name === 'validationError') res.status(400).json({ error: message });
  else {
    const id = uuid();
    app.logger.error(`${id}:${name}\n${message}\n${stack}`);
    res.status(500).json({ id, error: 'System Error!' });
  }
  next();
});

app.use((req, res) => res.status(404).json({ error: 'Pedido Desconhecido!' }));
module.exports = app;
