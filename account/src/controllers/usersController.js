import users from '../models/usersModel.js';
import Hash from '../utils/hash.js';
import createToken from '../utils/token.js';

class UserController {
  static getUsers = (req, res) => {
    // eslint-disable-next-line array-callback-return
    users.find((err, user) => {
      res.status(200).json(user);
    });
  };

  static getUserById = (req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line no-shadow
    users.findById(id, (err, users) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - id do usuário não encontrado` });
      } else {
        res.status(200).send(users);
      }
    });
  };

  static insertUser = async (req, res) => {
    const senhaHash = await Hash.encrypt(req.body.senha);
    req.body.senha = senhaHash;
    console.log(senhaHash);
    // eslint-disable-next-line new-cap
    const user = new users({ ...req.body });
    console.log(user.senha);

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

    users.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário atualizado com sucesso' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static deleteUser = (req, res) => {
    const { id } = req.params;

    users.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Usuário removido com sucesso' });
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
