import express from 'express';
import users from './usersRoutes.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: 'ECOMM' });
  });

  app.use(
    express.json(),
    users,
  );
};

export default routes;
