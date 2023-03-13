const BearerStrategy = require('passport-http-bearer').Strategy;
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const bearerStrategy = new BearerStrategy(
  async (token, done) => {
    try {
      const payload = jwt.verify(token, process.env.CHAVE_JWT);
      done(null, payload);
    } catch (error) {
      done(error);
    }
  },
);

passport.use(bearerStrategy);

const bearerStrategyAuth = passport.authenticate('bearer', { session: false });

module.exports = bearerStrategyAuth;
