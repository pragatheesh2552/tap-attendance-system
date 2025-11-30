// backend/seed/seedFull.js
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Attendance = require('../src/models/Attendance');
require('dotenv').config({ path: __dirname + '/../.env' });

async function run(){
  await mongoose.connect(process.env.MONGO_URI);
  console.log('DB connected for seed');

  await User.deleteMany({});
  await Attendance.deleteMany({});

  const bcrypt = require('bcryptjs');

  const manager = await User.create({
    name: 'Manager One', email: 'manager@example.com', password: await bcrypt.hash('Manager@123',10),
    role: 'manager', employeeId: 'MGR001', department: 'Admin'
  });

  const emp1 = await User.create({
    name: 'Rahul Employee', email: 'emp1@example.com', password: await bcrypt.hash('Employee@123',10),
    role: 'employee', employeeId: 'EMP001', department: 'Engineering'
  });

  const moment = require('moment');
  for(let i=0;i<15;i++){
    const d = moment().subtract(i,'days').format('YYYY-MM-DD');
    const status = i % 7 === 0 ? 'absent' : (i % 5 === 0 ? 'late' : 'present');
    await Attendance.create({
      userId: emp1._id,
      date: d,
      checkInTime: status === 'absent' ? null : '09:05',
      checkOutTime: status === 'absent' ? null : '17:30',
      totalHours: status === 'absent' ? 0 : 8.42,
      status
    });
  }

  console.log('Seed done');
  process.exit(0);
}

run().catch(e=>{ console.error(e); process.exit(1); });
