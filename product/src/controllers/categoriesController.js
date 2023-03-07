import categories from '../models/categoriesModel.js';

class CategoryController {
  static getCategories = (req, res) => {
    // eslint-disable-next-line array-callback-return
    categories.find((err, category) => {
      res.status(200).json(category);
    });
  };

  static getCategoryById = (req, res) => {
    const { id } = req.params;

    // eslint-disable-next-line no-shadow
    categories.findById(id, (err, categories) => {
      if (err) {
        res.status(404).send({ message: `${err.message} - id da categoria não encontrado` });
      } else {
        res.status(200).send(categories);
      }
    });
  };

  // eslint-disable-next-line consistent-return
  static insertCategory = async (req, res) => {
    // eslint-disable-next-line new-cap
    const category = new categories(req.body);

    const isThereCategory = await categories.findOne({ nome: req.body.nome });
    if (isThereCategory) return res.status(400).send({ message: 'Essa categoria já está cadastrada' });

    category.save((err) => {
      if (err) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(201).send(category.toJSON());
      }
    });
  };

  // eslint-disable-next-line consistent-return
  static updateCategory = async (req, res) => {
    const { id } = req.params;

    // eslint-disable-next-line max-len
    const isThereCategory = await categories.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    if (!isThereCategory) {
      return res.status(404).send({ message: 'Categoria não encontrada' });
    }
    res.status(200).send({ message: 'Categoria atualizada com sucesso' });
  };

  static deleteCategory = (req, res) => {
    const { id } = req.params;

    categories.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(204).send({ message: 'Categoria removida com sucesso' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };

  static updateStatusCategory = (req, res) => {
    const { id } = req.params;
    const newStatus = req.body.status;

    categories.findByIdAndUpdate(id, { $set: { status: newStatus } }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'status atualizado com sucesso' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default CategoryController;
