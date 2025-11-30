// frontend/src/App.jsx
import React from "react";
import Login from "./pages/Login";
import Employee from "./pages/Employee";
import ManagerContainer from "./pages/manager/ManagerContainer";

export default function App() {
  const [token, setToken] = React.useState(localStorage.getItem("token") || "");
  const [role, setRole] = React.useState(localStorage.getItem("role") || "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    setToken("");
    setRole("");
  };

  if (!token) {
    return (
      <Login
        onLogin={(tok, r) => {
          setToken(tok);
          setRole(r);
          localStorage.setItem("token", tok);
          localStorage.setItem("role", r);
        }}
      />
    );
  }

  return (
    <>
      {role === "manager" ? (
        <ManagerContainer token={token} onLogout={handleLogout} />
      ) : (
        <div>
          <div style={{ padding: 10, background: "#f7f9fb", borderBottom: "1px solid #eee" }}>
            <span>Attendance System</span>
            <button style={{ float: "right" }} onClick={handleLogout}>Logout</button>
          </div>
          <Employee token={token} />
        </div>
      )}
    </>
  );
}
