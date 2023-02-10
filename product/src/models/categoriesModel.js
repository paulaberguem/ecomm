import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: 
      { type: String,
        minLength: 3,
        match: /^[a-zA-Z][a-zA-Z0-9]*/,
       required: true
      },
    status: {type: Boolean}
  }
);

const categories = mongoose.model('categories', categorySchema);

export default categories;