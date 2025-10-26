import React, { useState } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { loginUser } from "../../api/auth";
import '../../styles/Auth.css';


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await loginUser(formData);
      alert(res.message);
      console.log("✅ Logged in:", res);
    } catch (err) {
      console.error(err.response?.data || err);
      alert("❌ Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <h3 className="text-center mb-3">Login</h3>
      <MDBInput
        wrapperClass="mb-4"
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <MDBInput
        wrapperClass="mb-4"
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <MDBBtn className="auth-btn w-100" onClick={handleLogin}>
        Sign In
      </MDBBtn>
    </div>
  );
};

export default Login;
