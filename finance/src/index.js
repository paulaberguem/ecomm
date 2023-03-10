const express = require('express');
// eslint-disable-next-line import/extensions
const routes = require('./routes');

const app = express();
const port = 3002;

routes(app);

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;
