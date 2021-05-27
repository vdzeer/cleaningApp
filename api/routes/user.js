const Router = require('express');
const router = new Router();
const UserController = require('../controllers/user');

router.get('/getCleaners', UserController.getCleaners);
router.post('/getOneCleaner', UserController.getOneCleaner);
router.post('/getOrders', UserController.getOrders);
router.post('/addOrder', UserController.addOrder);
router.post('/deleteOrder', UserController.deleteOrder);

module.exports = router;
