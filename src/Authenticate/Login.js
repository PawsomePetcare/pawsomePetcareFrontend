import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Eye, EyeOff } from 'react-feather';
import paw from '../assets/Home/paw.ico';
import backgroundImage from '../assets/Backgrounds/Home.jpg'
import './Login.css'; 

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(emailId, password);
    navigate('/home');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-box">
        <img src={paw} alt="Logo" className="img-fluid mb-3" style={{ width: '50px', height: '50px' }} />
        <h2 className="mb-4 text-center">Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <div className="password-wrapper">
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
              <span onClick={togglePasswordVisibility} className="password-toggle-icon">
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </Form.Group>
          <Button disabled={!password || !emailId} variant="primary" type="submit" className="mt-3">
            Login
          </Button>
        </Form>
        <div className="text-center mt-3">
          <Button variant="primary" onClick={() => navigate('/signup')}>
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
