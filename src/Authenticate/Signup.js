import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { EyeOff, Eye } from 'react-feather';
import paw from '../assets/Home/paw.ico';
import backgroundImage from '../assets/Backgrounds/Home.jpg'; 
import './Signup.css'; 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, name);
    navigate('/home');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="signup-box">
        <img src={paw} alt="Logo" className="img-fluid mb-3" style={{ width: '50px', height: '50px' }} />
        <h2 className="mb-4 text-center">Signup</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <Button disabled={!password || !email || !name} variant="primary" type="submit" className="mt-3">
            Signup
          </Button>
        </Form>
        <div className="text-center mt-3">
          <Button variant="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
