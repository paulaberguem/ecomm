import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome:
      {
        type: String,
        minLength: 3,
        match: /^[a-zA-Z][a-zA-Z0-9]*/gm,
        required: true,
      },
    descricao: { type: String, required: true },
    slug:
        {
          type: String,
          match: /^[a-zA-Z0-9-]+$/,
          required: true,
        },
    precoUnico:
        {
          type: Number,
          min: 0,
          required: true,
        },
    estoque:
        {
          type: Number,
          min: 0,
          max: 10000,
          required: true,
        },
    categoria:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'categories',
          required: true,
        },
  },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
