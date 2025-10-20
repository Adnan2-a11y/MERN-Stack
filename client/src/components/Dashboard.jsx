import React from "react";
import "../styles.css";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!user) {
    return <p>Unauthorized. Please login.</p>;
  }

  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h2>Welcome, {user.username} 🎉</h2>
      <p>Role: {user.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
