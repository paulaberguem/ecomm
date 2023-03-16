import { Strategy as BearerStrategy } from 'passport-http-bearer';
import passport from 'passport';
import jwt from 'jsonwebtoken';

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

// eslint-disable-next-line import/prefer-default-export
export const bearerStrategyAuth = passport.authenticate('bearer', { session: false });
