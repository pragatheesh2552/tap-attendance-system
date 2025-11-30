// frontend/src/pages/manager/ManagerNavbar.jsx
import React from "react";

export default function ManagerNavbar({ onNav, onLogout }) {
  return (
    <div style={{
      padding: 10, background: "#f5f7fb", borderBottom: "1px solid #e6e9ef",
      display: "flex", gap: 8, alignItems: "center"
    }}>
      <strong style={{ marginRight: 12 }}>Manager Panel</strong>
      <button onClick={() => onNav("dashboard")}>Dashboard</button>
      <button onClick={() => onNav("all")}>All Attendance</button>
      <button onClick={() => onNav("reports")}>Reports</button>
      <button onClick={() => onNav("calendar")}>Team Calendar</button>
      <div style={{ marginLeft: "auto" }}>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}
