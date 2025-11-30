// backend/src/routes/dashboardRoutes.js
const router = require('express').Router();
const dashboard = require('../controllers/dashboardController');
const auth = require('../middleware/auth');

router.get('/employee', auth, dashboard.employeeDashboard);
router.get('/manager', auth, dashboard.managerDashboard);

module.exports = router;
