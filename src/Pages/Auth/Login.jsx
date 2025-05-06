import React, { useState } from 'react';
import { Input } from '../../components/ui/Input.jsx';
import { Button } from '../../components/ui/Button.jsx';
import '../../App.css';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'entrepreneur',
  });

  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Please enter both username and password');
      return;
    }

    // Simulate login
    login(formData);
    setError('');

    // Redirect based on role
    if (formData.role === 'investor') {
      navigate('/dashboard/investor');
    } else {
      navigate('/dashboard/entrepreneur');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <Input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <div className="role-select">
          <label htmlFor="role">Login as:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="entrepreneur">Entrepreneur</option>
            <option value="investor">Investor</option>
          </select>
        </div>

        {error && <p className="error-message">{error}</p>}

        <Button type="submit" className="login-button">
          LOGIN
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
