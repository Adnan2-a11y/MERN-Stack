import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // added
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { registerUser } from "../../api/auth";
import "../../styles/Auth.css";
import "../../styles/home.css"; // Import home styles for consistency

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    studentId: "",
    department: "",
    batch: "",
    phone: "",
    email: "",
    password: "",
    role: "student",
  });
  const navigate = useNavigate(); // added

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validation function
  const validate = () => {
    const newErrors = {};
    const regex = {
      username: /^[a-zA-Z0-9_]{3,}$/,
      fullName: /^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
      studentId: /^\d{15}$/,
      department: /^[A-Za-z]+$/,
      batch: /^[A-Za-z0-9]+$/,
      phone: /^\+8801[3-9]\d{8}$/,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    };

    if (!regex.username.test(formData.username))
      newErrors.username = "Username must be at least 3 characters (letters/numbers only)";
    if (!regex.fullName.test(formData.fullName))
      newErrors.fullName = "Enter your full name (first and last)";
    if (!regex.studentId.test(formData.studentId))
      newErrors.studentId = "Student ID must be 15 digits";
    if (!regex.department.test(formData.department))
      newErrors.department = "Department must contain only letters";
    if (!regex.batch.test(formData.batch))
      newErrors.batch = "Batch must contain only letters/numbers (e.g. 3rd)";
    if (!regex.phone.test(formData.phone))
      newErrors.phone = "Enter valid Bangladeshi number (+8801...)";
    if (!regex.email.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!regex.password.test(formData.password))
      newErrors.password =
        "Password must include uppercase, lowercase, number, and special character";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) {
      alert("❌ Please fix the highlighted errors!");
      return;
    }
    try {
      const res = await registerUser(formData);
      alert(res.message);
      console.log("✅ Registered:", res);
      // After register, send user to login page (or homepage)
      navigate("/account/login");
    } catch (err) {
      console.error(err.response?.data || err);
      alert("❌ Registration failed!");
    }
  };

  return (
  
    <div className="auth-page-container">
      <div className="auth-form-container">
      <h3 className="text-center mb-3">Register</h3>
      {[
        { label: "Username", name: "username", type: "text" },
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Student ID", name: "studentId", type: "text" },
        { label: "Department", name: "department", type: "text" },
        { label: "Batch", name: "batch", type: "text" },
        { label: "Phone Number (+880...)", name: "phone", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Password", name: "password", type: "password" },
      ].map((input) => (
        <div key={input.name}>
          <MDBInput
            key={input.name}
            wrapperClass="mb-3"
            label={input.label}
            name={input.name}
            type={input.type}
            value={formData[input.name]}
            onChange={handleChange}
            placeholder=" " // Add empty placeholder
          />
          {errors[input.name] && (
            <p className="text-danger small">{errors[input.name]}</p>
          )}
        </div>
      ))}
      <MDBBtn className="auth-btn w-100" onClick={handleRegister}>
        Sign Up
      </MDBBtn>
      <p className="text-center mt-3">
        Already have an account? <a href="/account/login">Login here</a>
      </p>
    </div>
    </div>
  );
};

export default Register;
