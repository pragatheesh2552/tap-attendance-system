// backend/src/controllers/managerController.js
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const { Parser } = require('json2csv');

exports.getAll = async (req, res) => {
  try {
    const { employeeId, date, status, from, to } = req.query;
    const q = {};
    if (employeeId) {
      const user = await User.findOne({ employeeId });
      if (!user) return res.json([]);
      q.userId = user._id;
    }
    if (date) q.date = date;
    if (status) q.status = status;
    if (from && to) q.date = { $gte: from, $lte: to };

    const data = await Attendance.find(q).populate('userId', 'name email employeeId department').sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByEmployee = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = await Attendance.find({ userId }).sort({ date: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.summary = async (req, res) => {
  try {
    const { from, to } = req.query;
    const match = {};
    if (from && to) match.date = { $gte: from, $lte: to };
    const agg = await Attendance.aggregate([
      { $match: match },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);
    res.json(agg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.todayStatus = async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0,10);
    const records = await Attendance.find({ date: today }).populate('userId', 'name employeeId department');
    const present = records.length;
    const total = await User.countDocuments({ role: "employee" });
    res.json({ totalEmployees: total, presentToday: present, records });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.export = async (req, res) => {
  try {
    const { from, to, employeeId } = req.query;
    const q = {};
    if (from && to) q.date = { $gte: from, $lte: to };
    if (employeeId) {
      const user = await User.findOne({ employeeId });
      if (!user) return res.status(404).json({ message: "Employee not found" });
      q.userId = user._id;
    }
    const rows = await Attendance.find(q).populate('userId', 'name employeeId email department').sort({ date: -1 });
    const data = rows.map(r => ({
      date: r.date,
      employeeId: r.userId?.employeeId || "",
      name: r.userId?.name || "",
      department: r.userId?.department || "",
      checkIn: r.checkInTime || "",
      checkOut: r.checkOutTime || "",
      totalHours: r.totalHours || 0,
      status: r.status || ""
    }));
    const parser = new Parser();
    const csv = parser.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(`attendance_export_${from || 'all'}_${to || 'all'}.csv`);
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
