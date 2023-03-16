import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    nome:
        {
          type: String,
          minLength: 3,
          match: /^[a-zA-Zà-úÀ-Ù\s]*/g,
          required: true,
        },
    email:
        {
          type: String,
          match: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)$/g,
          required: true,
        },
    senha:
        {
          type: String,
          required: true,
        },
    dataCriacaoUsuario: { type: Date, default: Date.now },
    cpf:
        {
          type: String,
          match: /\d{11}/gm,
          required: true,
        },
    telefone:
        {
          type: String,
          match: /^[0-9]{2}([0-9]{8}|[0-9]{9}|[0-9]{10})$/g,
          required: true,
        },
    endereco: {
      logradouro: { type: String, required: true },
      numero: { type: String, required: true },
      complemento: { type: String },
      cep:
            {
              type: String,
              match: /\d{8}/gm,
              required: true,
            },
      cidade: { type: String, required: true },
      estado:
            {
              type: String,
              enum:
                    [
                      'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF',
                      'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA',
                      'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO',
                      'RR', 'RS', 'SC', 'SE', 'SP', 'TO',
                    ],
              required: true,
            },
    },
  },
);

const User = mongoose.model('User', userSchema);

export default User;
