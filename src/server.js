const app = require('./app');

app.server = app.listen(app.address.port, app.address.host, () => {
  console.info(
    `Server is running at http://${app.address.host}:${app.address.port}`,
  );
});

process.stdin.on('data', (data) => {
  const dataStr = data.toString().replace(/\n/, '');
  if (dataStr === 'url') {
    console.info(`http://${app.address.host}:${app.address.port}`);
  } else {
    process.exit();
  }
});
