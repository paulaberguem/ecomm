import Users from '../models/usersModel.js';
import Hash from '../utils/hash.js';
import createToken from '../utils/token.js';

class UserController {
  static getUsers = (req, res) => {
    // eslint-disable-next-line array-callback-return
    Users.find((err, users) => {
      if (!err) {
        res.status(200).json(users);
      } else {
        res.status(404).send({ message: `${err.message} - usuários não encontrados` });
      }
    });
  };

  static getUserById = (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line no-shadow
    Users.findById(id, (err, user) => {
      if (!err) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: `${err.message} - id do usuário não encontrado` });
      }
    });
  };

  static insertUser = async (req, res) => {
    const senhaHash = await Hash.encrypt(req.body.senha);
    req.body.senha = senhaHash;
    const user = new Users({ ...req.body });
    user.save((err) => {
      if (!err) {
        res.status(201).send(user);
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static updateUser = (req, res) => {
    const { id } = req.params;

    Users.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'usuário atualizado com sucesso' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static deleteUser = (req, res) => {
    const { id } = req.params;

    Users.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'usuário removido com sucesso' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static loginUser = (req, res) => {
    const token = createToken(req.user);
    res.set('Authorization', token);
    res.status(204).send();
  };
}

export default UserController;
