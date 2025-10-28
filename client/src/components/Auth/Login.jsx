import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // added import
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { loginUser } from "../../api/auth";
import '../../styles/Auth.css';
import "../../styles/home.css"; // Import home styles for consistency

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // added

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    console.log('Login: sending', formData);
    try {
      const res = await loginUser(formData);
      console.log('Login response raw:', res);
      alert(res.message);
      // store user if provided (not token)
      if (res?.data?.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      console.log('About to navigate to /');
      try {
        navigate('/', { replace: true });
        console.log('navigate("/") called');
      } catch (navErr) {
        console.error('navigate failed:', navErr);
        // fallback: full page redirect
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err);
      alert('❌ Login failed!');
    }
  };

  return (
    
      
    <div className="auth-page-container">
      <div className="auth-form-container">
      <h3 className="text-center mb-3">Login</h3>
      <MDBInput
        wrapperClass="mb-4"
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder=" " // Add empty placeholder
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
      <p className="text-center mt-3">
        Don't have an account? <a href="/account/register">Register here</a>
      </p>
    </div>
    </div>
  
  );
};

export default Login;
