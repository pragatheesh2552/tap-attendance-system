import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Employee({ token }) {
  const API = "http://localhost:5000/api";
  const [history, setHistory] = useState([]);
  const [msg, setMsg] = useState("");
  const headers = { Authorization: "Bearer " + token };

  const show = (t) => {
    setMsg(t);
    setTimeout(() => setMsg(""), 3000);
  };

  const checkIn = async () => {
    try {
      const res = await axios.post(API + "/attendance/checkin", {}, { headers });
      show("Checked in at " + (res.data.checkInTime || "now"));
      loadHistory();
    } catch (err) {
      console.error("checkIn error", err);
      show("Check-in failed: " + (err.response?.data?.message || err.message));
    }
  };

  const checkOut = async () => {
    try {
      const res = await axios.post(API + "/attendance/checkout", {}, { headers });
      show(res.data.message || "Checked out");
      loadHistory();
    } catch (err) {
      console.error("checkOut error", err);
      show("Check-out failed: " + (err.response?.data?.message || err.message));
    }
  };

  const loadHistory = async () => {
    try {
      const res = await axios.get(API + "/attendance/history", { headers });
      setHistory(res.data);
    } catch (err) {
      console.error("loadHistory error", err);
      show("Failed to load history");
    }
  };

  useEffect(() => {
    if (token) loadHistory();
  }, [token]);

  // Export history to CSV (client-side)
  const exportCsv = () => {
    if (!history.length) {
      show("No records to export");
      return;
    }
    const rows = [
      ["Date", "CheckIn", "CheckOut", "TotalHours", "Status"],
      ...history.map((r) => [r.date, r.checkInTime || "", r.checkOutTime || "", r.totalHours ?? "", r.status || ""])
    ];
    const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    show("Export started");
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>Employee Dashboard</h2>
      <div style={{ marginBottom: 10 }}>
        <button onClick={checkIn} style={{ marginRight: 8 }}>Check In</button>
        <button onClick={checkOut} style={{ marginRight: 8 }}>Check Out</button>
        <button onClick={exportCsv}>Export CSV</button>
      </div>

      {msg && (
        <div style={{ marginBottom: 12, padding: 8, background: "#e8f5e9", borderRadius: 6 }}>
          {msg}
        </div>
      )}

      <h3>My Attendance</h3>

      <table border="1" cellPadding="8">
        <thead><tr><th>Date</th><th>In</th><th>Out</th><th>Hours</th></tr></thead>
        <tbody>
          {history.map(item => (
            <tr key={item._id}>
              <td>{item.date}</td>
              <td>{item.checkInTime || "-"}</td>
              <td>{item.checkOutTime || "-"}</td>
              <td>{item.totalHours ? item.totalHours.toFixed(2) : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
