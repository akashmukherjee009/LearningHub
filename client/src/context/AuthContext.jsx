import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    // If we have a token, we could fetch user details to re-hydrate state if not saved.
    // For now, let's assume we store user stringified in localStorage alongside token
    const savedUser = localStorage.getItem('user');
    if (savedUser && token) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Login failed');

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Registration failed');

      // The backend creates the user, we should then log them in to get the token
      // The demo API response doesn't return a token on register, so we'll call login automatically
      const loginResp = await login(userData.email, userData.password);
      setLoading(false);
      return loginResp;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateProfile = async (updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Update failed');

      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setLoading(false);
      return { success: true };
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
