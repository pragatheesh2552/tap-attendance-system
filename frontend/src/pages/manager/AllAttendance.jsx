// frontend/src/pages/manager/AllAttendance.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllAttendance({ token }) {
  const API = "http://localhost:5000/api";
  const headers = { Authorization: "Bearer " + token };
  const [rows, setRows] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const load = async () => {
    try {
      const params = {};
      if (employeeId) params.employeeId = employeeId;
      if (date) params.date = date;
      if (status) params.status = status;
      const res = await axios.get(API + "/attendance/all", { headers, params });
      setRows(res.data);
    } catch (err) {
      console.error(err);
      alert("Error loading data");
    }
  };

  useEffect(() => { load(); }, []);

  const doExport = () => {
    const params = new URLSearchParams();
    if (employeeId) params.append("employeeId", employeeId);
    if (date) { params.append("from", date); params.append("to", date); }
    if (status) params.append("status", status);
    window.open(`${API}/attendance/export?${params.toString()}`, "_blank");
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>All Attendance</h3>
      <div style={{ marginBottom: 12 }}>
        <input placeholder="EmployeeId e.g. EMP001" value={employeeId} onChange={e=>setEmployeeId(e.target.value)} />
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{ marginLeft: 8 }}/>
        <select value={status} onChange={e=>setStatus(e.target.value)} style={{ marginLeft: 8 }}>
          <option value="">All</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
        <button onClick={load} style={{ marginLeft: 8 }}>Filter</button>
        <button onClick={doExport} style={{ marginLeft: 8 }}>Export CSV</button>
      </div>

      <table border="1" cellPadding="6">
        <thead><tr><th>EmpId</th><th>Name</th><th>Date</th><th>In</th><th>Out</th><th>Hours</th><th>Status</th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r._id}>
              <td>{r.userId?.employeeId}</td>
              <td>{r.userId?.name}</td>
              <td>{r.date}</td>
              <td>{r.checkInTime || "-"}</td>
              <td>{r.checkOutTime || "-"}</td>
              <td>{r.totalHours ? r.totalHours.toFixed(2) : "-"}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
