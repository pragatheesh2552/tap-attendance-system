const router = require("express").Router();
const auth = require("../middleware/auth");
const { checkIn, checkOut, myHistory } = require("../controllers/attendanceController");

router.post("/checkin", auth, checkIn);
router.post("/checkout", auth, checkOut);
router.get("/history", auth, myHistory);

module.exports = router;
