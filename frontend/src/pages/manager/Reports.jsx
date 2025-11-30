// frontend/src/pages/manager/Reports.jsx
import React, { useState } from "react";

export default function Reports({ token }) {
  const API = "http://localhost:5000/api";
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const download = () => {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    if (employeeId) params.append('employeeId', employeeId);
    window.open(`${API}/attendance/export?${params.toString()}`, '_blank');
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Reports</h3>
      <div>
        <label>From: <input type="date" value={from} onChange={e=>setFrom(e.target.value)} /></label>
        <label style={{ marginLeft: 8 }}>To: <input type="date" value={to} onChange={e=>setTo(e.target.value)} /></label>
        <label style={{ marginLeft: 8 }}>EmpId: <input value={employeeId} onChange={e=>setEmployeeId(e.target.value)} /></label>
        <button onClick={download} style={{ marginLeft: 8 }}>Export CSV</button>
      </div>
    </div>
  );
}
