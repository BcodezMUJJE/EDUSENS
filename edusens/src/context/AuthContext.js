import React, { createContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';
import { getToken, getUser, setToken, setUser, clearAuth } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add debugging for state changes
  useEffect(() => {
    console.log("AuthContext - currentUser changed:", currentUser);
  }, [currentUser]);

  // Initialize auth state from local storage
  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const savedToken = getToken();
        const savedUser = getUser();
        
        if (savedToken && savedUser) {
          console.log("AuthContext - Found saved token and user, verifying...");
          
          // Verify token with backend
          const response = await authService.verifyToken();
          
          if (response.success) {
            console.log("AuthContext - Token verified successfully");
            setCurrentUser(response.user);
          } else {
            console.log("AuthContext - Token invalid, clearing auth data");
            clearAuth();
          }
        } else {
          console.log("AuthContext - No saved auth data found");
        }
      } catch (error) {
        console.error("AuthContext - Error initializing auth:", error);
        clearAuth();
        setError("Failed to initialize authentication");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Function to handle user login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.login(email, password);
      
      if (response.success) {
        console.log("AuthContext - Login successful");
        setCurrentUser(response.user);
        return { success: true };
      } else {
        console.error("AuthContext - Login failed:", response.message);
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("AuthContext - Login error:", error);
      setError("Login failed. Please try again.");
      return { success: false, message: "Login failed. Please try again." };
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user signup
  const signup = async (fullName, email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.signup(fullName, email, password);
      
      if (response.success) {
        console.log("AuthContext - Signup successful");
        setCurrentUser(response.user);
        return { success: true };
      } else {
        console.error("AuthContext - Signup failed:", response.message);
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("AuthContext - Signup error:", error);
      setError("Registration failed. Please try again.");
      return { success: false, message: "Registration failed. Please try again." };
    } finally {
      setLoading(false);
    }
  };

  // Function to handle user logout
  const logout = async () => {
    setLoading(true);
    
    try {
      // Call logout API endpoint
      await authService.logout();
      
      // Clear auth data regardless of API response
      clearAuth();
      setCurrentUser(null);
      
      console.log("AuthContext - Logout successful");
      return { success: true };
    } catch (error) {
      console.error("AuthContext - Logout error:", error);
      
      // Still clear auth data on error
      clearAuth();
      setCurrentUser(null);
      
      return { success: false, message: "Logout encountered an error" };
    } finally {
      setLoading(false);
    }
  };

  // Social login functions
  const googleLogin = async (tokenId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.googleAuth(tokenId);
      
      if (response.success) {
        console.log("AuthContext - Google login successful");
        setCurrentUser(response.user);
        return { success: true };
      } else {
        console.error("AuthContext - Google login failed:", response.message);
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error("AuthContext - Google login error:", error);
      setError("Google login failed. Please try again.");
      return { success: false, message: "Google login failed. Please try again." };
    } finally {
      setLoading(false);
    }
  };

  // For demo/testing purposes only
  const simulateLogin = (userData) => {
    console.log("AuthContext - Simulating login with:", userData);
    setCurrentUser(userData);
    
    // Save the user data to localStorage for persistence
    setUser(userData);
    setToken("demo-token-" + Date.now()); // Fake token
    
    return { success: true };
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    googleLogin,
    simulateLogin,
    setCurrentUser, // Expose for testing only
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading auth state...</div>}
    </AuthContext.Provider>
  );
};
