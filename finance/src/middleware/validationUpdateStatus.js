const database = require('../models');

const verifyStatus = async (req, res, next) => {
    const { id } = req.params
    try {
        const {status} = await database.Payments.findOne({where: {id: Number(id)}});
        
        if (status === 'CONFIRMADO' || status === 'CANCELADO') return res.status(405).json({ message: 'o status não pode ser alterado!' });
        
        next();
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = { verifyStatus }