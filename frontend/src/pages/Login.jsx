// frontend/src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const API = "http://localhost:5000/api";
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    employeeId: "",
    department: ""
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitRegister = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        employeeId: form.employeeId,
        department: form.department
      };
      const res = await axios.post(API + "/auth/register", payload);
      alert("Registered successfully. Now login.");
      setIsRegister(false);
      setForm({ name: "", email: "", password: "", role: "employee", employeeId: "", department: "" });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API + "/auth/login", { email: form.email, password: form.password });
      const token = res.data.token;
      const user = res.data.user;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userName", user.name || "");
      onLogin(token, user.role);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Invalid login");
    }
  };

  return (
    <div style={{ padding: 32, fontFamily: "Arial" }}>
      <div style={{ maxWidth: 520 }}>
        <h2>{isRegister ? "Register" : "Login"}</h2>

        {isRegister ? (
          <form onSubmit={submitRegister}>
            <div style={{ marginBottom: 8 }}>
              <label>Name</label><br />
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label>Email</label><br />
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label>Password</label><br />
              <input name="password" type="password" value={form.password} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label>Role</label><br />
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            <div style={{ marginBottom: 8 }}>
              <label>Employee ID (eg. EMP001)</label><br />
              <input name="employeeId" value={form.employeeId} onChange={handleChange} />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label>Department</label><br />
              <input name="department" value={form.department} onChange={handleChange} />
            </div>

            <button type="submit" style={{ padding: "8px 14px" }}>Register</button>
            <button type="button" onClick={() => setIsRegister(false)} style={{ marginLeft: 8 }}>Back to Login</button>
          </form>
        ) : (
          <form onSubmit={submitLogin}>
            <div style={{ marginBottom: 8 }}>
              <label>Email</label><br />
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label>Password</label><br />
              <input name="password" type="password" value={form.password} onChange={handleChange} required />
            </div>

            <button type="submit" style={{ padding: "8px 14px" }}>Login</button>
            <button type="button" onClick={() => setIsRegister(true)} style={{ marginLeft: 8 }}>Register</button>
          </form>
        )}
      </div>
    </div>
  );
}
