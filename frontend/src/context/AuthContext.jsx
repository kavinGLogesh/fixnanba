import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('fixnanba_token') || null);
  const [isAdmin, setIsAdmin] = useState(!!localStorage.getItem('fixnanba_token'));

  const login = (tok) => {
    setToken(tok);
    setIsAdmin(true);
    localStorage.setItem('fixnanba_token', tok);
  };

  const logout = () => {
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem('fixnanba_token');
  };

  return (
    <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
