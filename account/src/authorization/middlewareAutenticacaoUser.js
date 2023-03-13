import passport from 'passport';

const localMiddlewareAut = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (error, user) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ message: 'Informe dados válidos para email e senha!' });
      }
      if (!user) return res.status(400).json({ message: 'Por favor preencha os campos com email e senha!' });
      req.user = user;
      return next();
    },
  )(req, res, next);
};

const bearerMiddlewareAut = (req, res, next) => {
  passport.authenticate(
    'bearer',
    { session: false },
    (error, user, info) => {
      if (error) return res.status(400).json({ message: 'Token inválido!' });
      if (!user) return res.status(401).json({ message: 'Usuário não autenticado!' });
      req.token = info.token;
      req.user = user;
      return next();
    },
  )(req, res, next);
};

export { localMiddlewareAut, bearerMiddlewareAut };
