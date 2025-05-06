import React, { useState } from "react";
import { Input } from "../../components/ui/Input.jsx";
import { Button } from "../../components/ui/Button.jsx";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx"; // ✅ Import auth context

const RegisterForm = () => {
  const { register } = useAuth(); // ✅ Get register function
  const navigate = useNavigate(); // ✅ To redirect after success

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "entrepreneur",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate registration
    register(formData);
    setSuccess("Registration successful!");
    setError("");

    // Redirect after short delay
    setTimeout(() => {
      navigate("/login");
    }, 1000); // Optional delay
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <Input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <Input type="email" name="email" placeholder="E-mail" onChange={handleChange} required />
        <Input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
        <Input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <Input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
        
        <div className="role-select">
          <label htmlFor="role">I am a:</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="investor">Investor</option>
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <Button type="submit" className="btn-gradient">Register</Button>

        <Button type="button" className="btn-gradient">
          <Link to="/login" id="sign-in">Have account? Sign In</Link>
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;
