const database = require('../models');

class PaymentsController {

    static async insertPayments(req, res){
        const payment = {...req.body, status: 'CRIADO'}
        try {
            const {id, status} = await database.Payments.create(payment)
            return res.status(201).json({id, status})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

   static async getPayments(req, res){
    try {
        const getAllPayments = await database.Payments.findAll()
        return res.status(200).json(getAllPayments)
    } catch (error) {
        return res.status(500).json(error.message)
    }
   }
}

module.exports = PaymentsController