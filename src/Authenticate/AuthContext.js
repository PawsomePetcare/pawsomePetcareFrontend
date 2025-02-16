import React, { createContext, useState, useContext } from 'react';
import { BASEURL } from '../Constants/Constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [errMessage, setErrMessage] = useState('');

  const login = async (userId, password) => {
    setErrMessage('')
    // Replace with actual API call to validate userId
    await fetch(`${BASEURL}/users/validateUser?userId=${userId}&password=${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.userId>0) {
          setUserId(data.userId);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setErrMessage('User not found');
        }
      });
  };

  const signup = async (emailId, password, name) => {
    setErrMessage('')
    // Replace with actual API call to add user
    await fetch(`${BASEURL}/users/addUser?userId=${emailId}&password=${password}&name=${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.userId>0) {
          setUserId(data.userId);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          setErrMessage('User already has an account');
        }
      });
  };

  const logout = () => {
    setErrMessage('')
    setIsAuthenticated(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, signup, userId }}>
      {children}
      {errMessage && <div className="alert alert-danger mt-3">{errMessage}</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
