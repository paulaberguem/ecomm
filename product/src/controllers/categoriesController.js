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
        res.status(404).send({message: `${err.message} - id da categoria não encontrado`})
      } else {
        res.status(200).send(categories)
      }
    })
  }

  static insertCategory = async (req, res) => {

    let category = new categories(req.body);

    const isThereCategory = await categories.findOne({nome: req.body.nome})
    
    if (isThereCategory) return res.status(400).send({ message: "Essa categoria já está cadastrada" });

    category.save((err) => {
      if(err) {
        res.status(400).send({ message: err.message });
      } else {
        res.status(201).send(category.toJSON());
      }
    });
  }

  static updateCategory = async (req, res) => {
    const id = req.params.id;

    const teste = await categories.findByIdAndUpdate(id, {$set: req.body}, {new: true});

    if(!teste){
      return res.status(404).send({message: 'Categoria não encontrada'})
    }
    res.status(200).send({message: "Categoria atualizada com sucesso"})

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
    const newStatus = req.body.status;

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