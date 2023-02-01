import categories from "../models/categoriesModel.js"

class CategoryController {

  static getCategories = (req, res) => {
    categories.find((err, category) => {
        res.status(200).json(category)
    })
  }

  static getCategoryById = (req, res) => {
    const id = req.params.id;

    categories.findById(id, (err, categories) => {
      if(err) {
        res.status(500).send({message: `${err.message} - id da categoria não encontrado`})
      } else {
        res.status(200).send(categories)
      }
    })
  }

  static insertCategory = (req, res) => {
    const category = new categories(req.body);

    categories.findOne(category.nome, (err, categories) => {
      if(!err) {
        category.save((err) => {
          if(err) {
            res.status(500).send({message: `${err.message} - falha ao cadastrar categoria`})
          } else {
            res.status(201).send(category.toJSON())
          }
        })
      } else {
        res.status(500).send({message: `${err.message} - categoria já cadastrada`})
      }
    })
  }

  static updateCategory = (req, res) => {
    const id = req.params.id;

    categories.findByIdAndUpdate(id, {$set: req.body}, (err) => {
      if(!err) {
        res.status(200).send({message: 'Categoria atualizada com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static deleteCategory = (req, res) => {
    const id = req.params.id;

    categories.findByIdAndDelete(id, (err) => {
      if(!err){
        res.status(200).send({message: 'Categoria removida com sucesso'})
      } else {
        res.status(500).send({message: err.message})
      }
    })
  }

  static updateStatusCategory = (req, res) => {
    const id = req.params.id;
    const status = req.body.status;

    categories.findByIdAndUpdate(id, { $set: { status: newStatus } }, (err) => {
      if(!err) {
        res.status(200).send({ message: 'status atualizado com sucesso' });
      } else {
        res.status(500).send({ message: err.message })
      }
    })
  }

}

export default CategoryController