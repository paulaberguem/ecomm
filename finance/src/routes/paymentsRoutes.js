const { Router } = require('express');
// eslint-disable-next-line import/extensions
const PaymentsController = require('../controllers/PaymentsController');
// eslint-disable-next-line import/extensions
const updateValidation = require('../middleware/validationUpdateStatus');
// eslint-disable-next-line import/extensions
const idValidation = require('../middleware/idValidation');
const bearerStrategyAuth = require('../authorization/bearerEstrategia.js');

const router = Router();

router.get('/payments', bearerStrategyAuth, PaymentsController.getPayments);
router.post('/payments', bearerStrategyAuth, PaymentsController.insertPayments);
router.get('/payments/:id', bearerStrategyAuth, idValidation.verifyID, PaymentsController.getDetailPayment);
router.patch('/payments/:id/confirm', bearerStrategyAuth, idValidation.verifyID, updateValidation.verifyStatus, PaymentsController.updateStatusPayment);
router.patch('/payments/:id/cancel', bearerStrategyAuth, idValidation.verifyID, updateValidation.verifyStatus, PaymentsController.updateStatusPayment);

module.exports = router;
