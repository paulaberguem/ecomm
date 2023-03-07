// eslint-disable-next-line import/extensions
const database = require('../models');
// eslint-disable-next-line import/extensions
const statusPayment = require('../variables/statusVariables');

class PaymentsController {
  static async insertPayments(req, res) {
    const payment = { ...req.body, status: statusPayment.created };
    try {
      const { id, status } = await database.Payments.create(payment);
      const links = [
        {
          rel: 'self',
          method: 'GET',
          href: `https://http://localhost:3002/payments/${id}`,
        },
        {
          rel: 'confirm',
          method: 'PATCH',
          href: `https://http://localhost:3002/payments/${id}/confirm`,
        },
        {
          rel: 'cancel',
          method: 'PATCH',
          href: `https://http://localhost:3002/payments/${id}/cancel`,
        },

      ];
      return res.status(201).location(`/payments/${id}`).json({ id, status, links });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getPayments(req, res) {
    try {
      const getAllPayments = await database.Payments.findAll();
      return res.status(200).json(getAllPayments);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async getDetailPayment(req, res) {
    try {
      const { ...dataPayments } = req.payment;
      const { cvv: _, ...datas } = dataPayments.dataValues;

      return res.status(200).json(datas);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async updateStatusPayment(req, res) {
    const { id } = req.params;
    const status = req.body;
    try {
      await database.Payments.update(status, { where: { id: Number(id) } });
      const updatedStatus = await database.Payments.findOne({ where: { id: Number(id) } });
      return res.status(200).json({ id: updatedStatus.id, status: updatedStatus.status });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PaymentsController;
