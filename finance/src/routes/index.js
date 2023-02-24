const bodyParser = require('body-parser')
const payments = require('./paymentsRoutes')

module.exports = app => {
  app.use(bodyParser.json())
  app.use(payments)
}