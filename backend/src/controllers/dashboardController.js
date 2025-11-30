// backend/src/controllers/dashboardController.js
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const moment = require('moment');

exports.employeeDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD');
    const thisMonthStart = moment().startOf('month').format('YYYY-MM-DD');
    const records = await Attendance.find({ userId, date: { $gte: thisMonthStart }});
    const present = records.filter(r => r.status === 'present').length;
    const late = records.filter(r => r.status === 'late').length;
    const totalHours = records.reduce((s,r)=> s + (r.totalHours||0), 0);
    const last7Date = moment().subtract(7,'days').format('YYYY-MM-DD');
    const recent = await Attendance.find({ userId, date: { $gte: last7Date } }).sort({ date: -1});
    const todayStatus = await Attendance.findOne({ userId, date: today });
    res.json({ todayStatus: !!todayStatus, present, late, totalHours, recent });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
};

exports.managerDashboard = async (req, res) => {
  try {
    const today = moment().format('YYYY-MM-DD');
    const totalEmployees = await User.countDocuments({ role: 'employee'});
    const presentToday = await Attendance.countDocuments({ date: today });
    const lateToday = await Attendance.countDocuments({ date: today, status: 'late' });
    const days = [];
    for (let i=6;i>=0;i--) {
      const d = moment().subtract(i,'days').format('YYYY-MM-DD');
      const c = await Attendance.countDocuments({ date: d });
      days.push({ date: d, count: c });
    }
    res.json({ totalEmployees, presentToday, lateToday, weeklyTrend: days });
  } catch(err){
    res.status(500).json({ message: err.message });
  }
};