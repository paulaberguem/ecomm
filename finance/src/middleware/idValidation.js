// eslint-disable-next-line import/extensions
const database = require('../models');

// eslint-disable-next-line consistent-return
const verifyID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getPaymentByID = await database.Payments.findOne({ where: { id: Number(id) } });

    if (!getPaymentByID) return res.status(200).json({ message: 'pagamento não encontrado' });

    req.payment = getPaymentByID;
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { verifyID };
