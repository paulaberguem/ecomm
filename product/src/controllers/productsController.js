import Product from '../models/productsModel.js';

class ProductController {
  static getProducts = (req, res) => {
    Product.find((err, products) => {
      if (err) return res.status(500).send({ message: `${err.message} - erro interno do servidor` });
      if (!products) return res.status(400).send('lista de produtos não encontrado');
      return res.status(200).json(products);
    });
  };

  static getProductById = (req, res) => {
    const { id } = req.params;
    Product.findById(id, (err, product) => {
      if (err) return res.status(500).send({ message: `${err.message} - erro interno do servidor` });
      if (!product) return res.status(400).send('id do produto não encontrado');
      return res.status(200).send(product);
    });
  };

  // eslint-disable-next-line consistent-return
  static insertproduct = async (req, res) => {
    const product = new Product(req.body);

    const isThereProduct = await Product.findOne({ nome: req.body.nome });
    if (isThereProduct) return res.status(400).send({ message: 'Esse produto já está cadastrado' });

    Product.save((err) => {
      if (err) return res.status(500).send({ message: err.message });

      return res.status(201).send(product.toJSON());
    });
  };

  static updateProduct = async (req, res) => {
    const { id } = req.params;
    const isThereProduct = await Product.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    if (!isThereProduct) return res.status(404).send({ message: 'Produto não encontrado' });
    return res.status(200).send({ message: 'Produto atualizado com sucesso' });
  };

  static deleteProduct = async (req, res) => {
    const { id } = req.params;

    const isThereProduct = await Product.findByIdAndDelete(id);

    if (!isThereProduct) return res.status(404).send({ message: 'Produto não encontrado' });
    return res.status(200).send({ message: 'Produto removido com sucesso' });
  };
}

export default ProductController;
