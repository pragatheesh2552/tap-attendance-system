// frontend/src/pages/manager/ManagerContainer.jsx
import React, { useState } from "react";
import ManagerNavbar from "./ManagerNavbar";
import ManagerDashboard from "./ManagerDashboard";
import AllAttendance from "./AllAttendance";
import Reports from "./Reports";
import TeamCalendar from "./TeamCalendar";

export default function ManagerContainer({ token, onLogout }) {
  const [view, setView] = useState("dashboard");

  return (
    <div>
      <ManagerNavbar onNav={setView} onLogout={onLogout} />
      {view === "dashboard" && <ManagerDashboard token={token} />}
      {view === "all" && <AllAttendance token={token} />}
      {view === "reports" && <Reports token={token} />}
      {view === "calendar" && <TeamCalendar token={token} />}
    </div>
  );
}
