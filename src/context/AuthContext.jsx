import React, { createContext, useState, useContext } from "react";

// Create the Context
const AuthContext = createContext();

// Create a custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap the app with auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data

  // Register function
  const register = (userData) => {
    setUser(userData); // Simulate user registration
  };

  // Login function
  const login = (userData) => {
    setUser(userData); // Simulate user login
  };

  // Logout function
  const logout = () => {
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
