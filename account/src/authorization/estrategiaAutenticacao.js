import localStrategy from 'passport-local';
import bearerStrategy from 'passport-http-bearer';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import users from '../models/usersModel.js';

const LocalStrategy = localStrategy.Strategy;
const BearerStrategy = bearerStrategy.Strategy;

function verificaUsuario(user) {
  if (!user) throw new Error('Não existe usuário com esse e-mail!');
}

async function verificaSenha(senha, hashSenha) {
  const senhaValida = await bcryptjs.compareSync(senha, hashSenha);
  if (!senhaValida) throw new Error('E-mail ou senha inválidos!');
}

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
    session: false,
  }, async (email, senha, done) => {
    try {
      const user = await users.findOne({ email });
      verificaUsuario(user);
      await verificaSenha(senha, user.senha);

      done(null, user);
    } catch (error) {
      done(error);
    }
  }),
);

passport.use(
  new BearerStrategy(
    async (token, done) => {
      try {
        const payload = jwt.verify(token, process.env.CHAVE_JWT);
        const user = await users.findById(payload.id);
        done(null, user, { token });
      } catch (error) {
        done(error);
      }
    },
  ),
);
