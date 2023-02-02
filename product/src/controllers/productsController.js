import products from '../models/productsModel.js'

class ProductController {

  static getProducts = (req, res) => {
    products.find((err, product) => {
        res.status(200).json(product)
    })
  }

  static getProductById = (req, res) => {
    const id = req.params.id;

   products.findById(id, (err, products) => {
      if(err) {
        res.status(500).send({message: `${err.message} - id do produto não encontrado`})
      } else {
        res.status(200).send(products)
      }
    })
  }

  static insertproduct = (req, res) => {
    let product = new products(req.body);

    product.save((err) => {
      if(err) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(201).send(product.toJSON());
      }
    });
  }

  static updateProduct = (req, res) => {
    const id = req.params.id;

    products.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Produto atualizado com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static deleteProduct = (req, res) => {
    const id = req.params.id;

    products.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Produto removido com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

}

export default ProductController