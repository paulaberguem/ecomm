import Category from '../models/categoriesModel.js';

class CategoryController {
  static getCategories = (req, res) => {
    Category.find((err, categories) => {
      if (err) return res.status(500).send({ message: `${err.message} - erro interno do servidor` });
      if (!categories) return res.status(400).send('lista de produtos não encontrado');
      return res.status(200).json(categories);
    });
  };

  static getCategoryById = (req, res) => {
    const { id } = req.params;
    Category.findById(id, (err, category) => {
      if (err) return res.status(500).send({ message: `${err.message} - erro interno do servidor` });
      if (!category) return res.status(400).send('id da categoria não encontrado');
      return res.status(200).send(category);
    });
  };

  // eslint-disable-next-line consistent-return
  static insertCategory = async (req, res) => {
    const category = new Category(req.body);

    const isThereCategory = await Category.findOne({ nome: req.body.nome });
    if (isThereCategory) return res.status(400).send({ message: 'Essa categoria já está cadastrada' });

    Category.save((err) => {
      if (err) return res.status(500).send({ message: err.message });

      return res.status(201).send(category.toJSON());
    });
  };

  static updateCategory = async (req, res) => {
    const { id } = req.params;
    const isThereCategory = await Category.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    if (!isThereCategory) return res.status(404).send({ message: 'Categoria não encontrada' });
    return res.status(200).send({ message: 'Categoria atualizada com sucesso' });
  };

  static deleteCategory = async (req, res) => {
    const { id } = req.params;

    const isThereCategory = await Category.findByIdAndDelete(id);

    if (!isThereCategory) return res.status(404).send({ message: 'Categoria não encontrada' });
    return res.status(200).send({ message: 'Categoria removida com sucesso' });
  };

  static updateStatusCategory = async (req, res) => {
    const { id } = req.params;
    const newStatus = req.body.status;
    const isThereCategory = await Category.findByIdAndUpdate(id, { $set: { status: newStatus } });

    if (!isThereCategory) return res.status(404).send({ message: 'Categoria não encontrada' });
    return res.status(200).send({ message: 'status atualizado com sucesso' });
  };
}

export default CategoryController;
