// backend/src/routes/managerRoutes.js
const router = require('express').Router();
const managerController = require('../controllers/managerController');
const auth = require('../middleware/auth');

// Manager / team routes
router.get('/all', auth, managerController.getAll);
router.get('/employee/:id', auth, managerController.getByEmployee);
router.get('/summary', auth, managerController.summary);
router.get('/today-status', auth, managerController.todayStatus);
router.get('/export', auth, managerController.export);

module.exports = router;
