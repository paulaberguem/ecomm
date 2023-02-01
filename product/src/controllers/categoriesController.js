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

}

export default CategoryController