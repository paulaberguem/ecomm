import express from 'express';
import passport from 'passport';
import routes from './routes/index.js';
import './authorization/estrategiaAutenticacao.js';

const app = express();
app.use(express.json());
app.use(passport.initialize());
routes(app);

export default app;
