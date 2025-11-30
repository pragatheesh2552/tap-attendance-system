// frontend/src/pages/manager/ManagerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManagerDashboard({ token }) {
  const API = "http://localhost:5000/api";
  const headers = { Authorization: "Bearer " + token };
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(API + "/dashboard/manager", { headers });
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  if (!stats) return <div style={{ padding: 20 }}>Loading dashboard...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Manager Dashboard</h2>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <div style={{ padding: 12, background: "#fff", border: "1px solid #ddd" }}>
          <div>Total Employees</div>
          <h3>{stats.totalEmployees}</h3>
        </div>

        <div style={{ padding: 12, background: "#fff", border: "1px solid #ddd" }}>
          <div>Present Today</div>
          <h3>{stats.presentToday}</h3>
        </div>

        <div style={{ padding: 12, background: "#fff", border: "1px solid #ddd" }}>
          <div>Late Today</div>
          <h3>{stats.lateToday}</h3>
        </div>
      </div>

      <h4>Weekly trend (last 7 days)</h4>
      <table border="1" cellPadding="6">
        <thead><tr><th>Date</th><th>Present</th></tr></thead>
        <tbody>
          {stats.weeklyTrend.map(d => (
            <tr key={d.date}><td>{d.date}</td><td>{d.count}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
