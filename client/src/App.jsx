import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Account from "./components/account";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <nav style={{ 
        display: "flex", 
        gap: "1rem", 
        justifyContent: "center", 
        marginTop: "1rem",
        padding: "1rem",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #dee2e6"
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#1266f1', fontWeight: 'bold' }}>
          Login
        </Link>
        <Link to="/signup" style={{ textDecoration: 'none', color: '#1266f1', fontWeight: 'bold' }}>
          Signup
        </Link>
        <Link to="/dashboard" style={{ textDecoration: 'none', color: '#1266f1', fontWeight: 'bold' }}>
          Dashboard
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/signup" element={<Account />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;