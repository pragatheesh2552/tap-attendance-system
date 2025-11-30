const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, employeeId, department } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already used" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      employeeId,
      department
    });

    res.json({ message: "Registered successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
};
