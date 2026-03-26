/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await authService.getMe();
        setUser(response.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const register = async (userData) => {
    try {
      setError(null);
      const response = await authService.register(userData);
      setUser(response.user);
      return response.user;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMsg);
      throw err;
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const response = await authService.login(credentials);
      setUser(response.user);
      return response.user;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMsg);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      // Always clear user state even if logout API fails
      setUser(null);
      setError(null);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
