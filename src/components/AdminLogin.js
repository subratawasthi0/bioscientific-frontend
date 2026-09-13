import React, { useState } from "react";
import "../styles/Admin.css";
import { api } from "../api"; // Make sure this path is correct!

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/dashboard/users/login", { email, password });

    if (res.success) {
      // Save the JWT token into the browser
      localStorage.setItem("adminToken", res.data.token);
      onLogin(); // Tell parent App.js to show Dashboard
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>Admin Panel</h2>
        <p>Welcome back! Please enter your details.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary-admin"
            style={{ width: "100%", padding: "12px" }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
