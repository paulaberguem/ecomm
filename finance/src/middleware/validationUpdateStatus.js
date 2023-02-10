const database = require('../models');

const verifyStatus = async (req, res, next) => {
    const { id } = req.params
    try {
        const {status} = await database.Payments.findById(id)
        if (status === 'CONFIRMADO') {
            return res.status(405).json({ message: 'o status não pode ser alterado!' });
          }
        if (status === 'CANCELADO') {
            return res.status(405).json({ message: 'o status não pode ser alterado' });
        }
          next();
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { verifyStatus }