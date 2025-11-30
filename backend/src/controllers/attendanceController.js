// backend/src/controllers/attendanceController.js
const Attendance = require("../models/Attendance");
const moment = require("moment");

exports.checkIn = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = moment().format("YYYY-MM-DD");

    const already = await Attendance.findOne({ userId, date: today });
    if (already) return res.json({ message: "Already checked in today", record: already });

    const attendance = await Attendance.create({
      userId,
      date: today,
      checkInTime: moment().format("HH:mm"),
      status: "present"
    });

    res.json(attendance);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const userId = req.user.id;
    const today = moment().format("YYYY-MM-DD");

    const record = await Attendance.findOne({ userId, date: today });
    if (!record) return res.status(400).json({ message: "Not checked in" });

    record.checkOutTime = moment().format("HH:mm");

    const inTime = moment(record.checkInTime, "HH:mm");
    const outTime = moment(record.checkOutTime, "HH:mm");
    record.totalHours = outTime.diff(inTime, "hours", true);

    await record.save();

    res.json({ message: "Checked out", record });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.myHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Attendance.find({ userId }).sort({ date: -1 });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.mySummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const monthStart = moment().startOf('month').format('YYYY-MM-DD');
    const records = await Attendance.find({ userId, date: { $gte: monthStart }});
    const present = records.filter(r => r.status === 'present').length;
    const absent = records.filter(r => r.status === 'absent').length;
    const late = records.filter(r => r.status === 'late').length;
    const totalHours = records.reduce((s,r)=> s + (r.totalHours||0),0);
    res.json({ present, absent, late, totalHours });
  } catch(err){ res.status(500).json({message:err.message}); }
};

exports.today = async (req,res) => {
  try {
    const userId = req.user.id;
    const today = moment().format('YYYY-MM-DD');
    const rec = await Attendance.findOne({ userId, date: today });
    res.json(rec || null);
  } catch(err){ res.status(500).json({message:err.message}); }
};