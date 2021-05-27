const Router = require('express');
const router = new Router();
const AdminController = require('../controllers/admin');

router.get('/getOrders', AdminController.getOrders);
router.put('/updateOrder', AdminController.updateOrder);
router.post('/addCleaner', AdminController.addCleaner);
router.put('/updateCleaner', AdminController.updateCleaner);
router.post('/deleteCleaner', AdminController.deleteCleaner);
router.post('/havePermission', AdminController.havePermission);

module.exports = router;
