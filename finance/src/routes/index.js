const bodyParser = require('body-parser');
// eslint-disable-next-line import/extensions
const payments = require('./paymentsRoutes');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(payments);
};
