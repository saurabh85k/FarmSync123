import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Rehydrate from sessionStorage on page refresh
    const token = sessionStorage.getItem('token');
    const user = sessionStorage.getItem('user');
    return token ? { token, user: JSON.parse(user) } : null;
  });

  const login = (authResponse) => {
    sessionStorage.setItem('token', authResponse.token);
    sessionStorage.setItem('user', JSON.stringify({
      userId: authResponse.userId,
      name: authResponse.name,
      email: authResponse.email,
      role: authResponse.role,
    }));
    setAuth({
      token: authResponse.token,
      user: {
        userId: authResponse.userId,
        name: authResponse.name,
        email: authResponse.email,
        role: authResponse.role,
      },
    });
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access anywhere
export const useAuth = () => useContext(AuthContext);