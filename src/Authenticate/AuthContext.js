// AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { BASEURL } from '../Constants/Constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const login = async (userId, password) => {
    // Replace with actual API call to validate userId
    await fetch(`${BASEURL}/users/validateUser?userId=${userId}&password=${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response)
      .then(data => {
        if (data.status==200) {
          setIsAuthenticated(true);
        }else{
          setIsAuthenticated(false);
          setErrMessage('User not found');
        }
      });
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
      {errMessage!='' && errMessage}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
