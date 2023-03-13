import User from '../models/usersModel.js';
import Hash from '../authorization/hash.js';
import createToken from '../authorization/token.js';

class UserController {
  static getUsers = (req, res) => {
    // eslint-disable-next-line array-callback-return
    User.find((err, users) => {
      if (err) {
        res.status(404).send({ message: `${err.message} - usuários não encontrados` });
      } else {
        res.status(200).json(users);
      }
    });
  };

  static getUserById = (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, user) => {
      if (err) {
        res.status(404).send({ message: `${err.message} - id do usuário não encontrado` });
      } else {
        res.status(200).send(user);
      }
    });
  };

  static insertUser = async (req, res) => {
    const senhaHash = await Hash.encrypt(req.body.senha);
    req.body.senha = senhaHash;
    const user = new User({ ...req.body });
    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(201).send(user);
      }
    });
  };

  static updateUser = (req, res) => {
    const { id } = req.params;

    User.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).send({ message: 'usuário atualizado com sucesso' });
      }
    });
  };

  static deleteUser = (req, res) => {
    const { id } = req.params;

    User.findByIdAndDelete(id, (err) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.status(200).send({ message: 'usuário removido com sucesso' });
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
