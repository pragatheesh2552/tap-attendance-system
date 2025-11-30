// backend/src/app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const managerRoutes = require("./routes/managerRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Error:", err.message));

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes); // contains checkin, checkout, my-history, my-summary, today
app.use("/api/attendance", managerRoutes);   // manager endpoints (all, export, etc)
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Attendance API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
