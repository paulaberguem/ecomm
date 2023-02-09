'use-strict'

module.exports = (sequelize, DataTypes) => {
  const Payments = sequelize.define('Payments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    valor: {
      type: DataTypes.DECIMAL(10,2),
      validate: {
        min: 0
      }
    },
    nome: {
      type: DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado){
          if (dado.length < 3) throw new Error('o campo nome deve ter mais de 3 caracteres')
        },
        isAlpha: true
      }
    },
    numeroCartao: {
      type: DataTypes.STRING,
      validate: {
        isCreditCard: true
      }
    },
    dataExpiracao: {
      type: DataTypes.STRING,
      validate: {
        is: /(\d{4})-(0[1-9]|1[0-2])$/gm
      }
    },
    cvv: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: [3]
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn:  [['CRIADO', 'CONFIRMADO', 'CANCELADO']]
      },
      defaultValue: "CRIADO"
    }
  });

  return Payments;
};