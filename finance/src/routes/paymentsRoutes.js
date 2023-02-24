const { Router } = require('express');
const PaymentsController = require('../controllers/PaymentsController');
const updateValidation = require('../middleware/validationUpdateStatus');
const idValidation = require('../middleware/idValidation');

const router = Router();

router.get('/payments', PaymentsController.getPayments)
router.post('/payments', PaymentsController.insertPayments)
router.get('/payments/:id', idValidation.verifyID, PaymentsController.getDetailPayment)
router.patch('/payments/:id/confirm', idValidation.verifyID, updateValidation.verifyStatus, PaymentsController.updateStatusPayment)
router.patch('/payments/:id/cancel', idValidation.verifyID, updateValidation.verifyStatus, PaymentsController.updateStatusPayment)

module.exports = router;