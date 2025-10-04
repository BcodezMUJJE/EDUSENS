import React, { createContext, useState, useEffect, useCallback } from 'react';

// Define the shape of our auth context
export const AuthContext = createContext(null);

// Storage keys
const AUTH_USER_KEY = 'edusens_user';
const AUTH_TOKENS_KEY = 'edusens_tokens';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(AUTH_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  
  const [tokens, setTokens] = useState(() => {
    const stored = localStorage.getItem(AUTH_TOKENS_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Persist user/tokens to localStorage
  useEffect(() => {
    if (user && tokens) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
      localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(tokens));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
      localStorage.removeItem(AUTH_TOKENS_KEY);
    }
  }, [user, tokens]);

  // Auto-logout on token expiration
  useEffect(() => {
    if (!tokens?.accessToken) return;
    
    try {
      const tokenData = JSON.parse(atob(tokens.accessToken.split('.')[1]));
      const expiryTime = tokenData.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiry = expiryTime - currentTime;
      
      if (timeUntilExpiry <= 0) {
        handleLogout('Session expired. Please log in again.');
        return;
      }
      
      const timeout = setTimeout(() => {
        handleLogout('Session expired. Please log in again.');
      }, timeUntilExpiry);
      
      return () => clearTimeout(timeout);
    } catch (error) {
      console.error('Error parsing token:', error);
      handleLogout('Invalid session. Please log in again.');
    }
  }, [tokens]);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      if (user && tokens) {
        // Verify token is still valid
        const isValid = await verifyToken();
        if (!isValid) {
          setUser(null);
          setTokens(null);
        }
      }
    };
    
    initializeAuth();
  }, []);

  const makeAuthRequest = async (endpoint, options = {}) => {
    const response = await fetch(`${API_BASE_URL}/api/auth${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(tokens?.accessToken && { Authorization: `Bearer ${tokens.accessToken}` }),
        ...options.headers,
      },
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    
    return data;
  };

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await makeAuthRequest('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      if (response.success) {
        setUser(response.user);
        setTokens(response.tokens);
        showToast('success', 'Login successful!');
        return { success: true };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.message || 'Login failed. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (fullName, email, password, username) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await makeAuthRequest('/register', {
        method: 'POST',
        body: JSON.stringify({ full_name: fullName, email, password, username }),
      });
      
      if (response.success) {
        setUser(response.user);
        setTokens(response.tokens);
        showToast('success', 'Account created successfully!');
        return { success: true };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.message || 'Registration failed. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  const socialAuth = useCallback(async (provider, socialToken, profile) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await makeAuthRequest('/social', {
        method: 'POST',
        body: JSON.stringify({ provider, accessToken: socialToken, profile }),
      });
      
      if (response.success) {
        setUser(response.user);
        setTokens(response.tokens);
        showToast('success', response.isNewUser ? 'Account created successfully!' : 'Login successful!');
        return { success: true, isNewUser: response.isNewUser };
      } else {
        setError(response.message);
        return { success: false, message: response.message };
      }
    } catch (error) {
      const message = error.message || 'Social authentication failed. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUsername = useCallback(async (username) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await makeAuthRequest('/username', {
        method: 'PUT',
        body: JSON.stringify({ username }),
      });
      
      if (response.success) {
        setUser(prev => prev ? { ...prev, username: response.username } : null);
        showToast('success', 'Username updated successfully!');
        return { success: true };
      } else {
        setError(response.message);
        return { 
          success: false, 
          message: response.message,
          suggestions: response.suggestions 
        };
      }
    } catch (error) {
      const message = error.message || 'Failed to update username.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    
    try {
      if (tokens?.accessToken) {
        await makeAuthRequest('/logout', { method: 'POST' });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setTokens(null);
      setError(null);
      setLoading(false);
      showToast('info', 'Logged out successfully');
    }
  }, [tokens]);

  const verifyToken = useCallback(async () => {
    if (!tokens?.accessToken) return false;
    
    try {
      const response = await makeAuthRequest('/verify');
      return response.success;
    } catch (error) {
      return false;
    }
  }, [tokens]);

  const refreshTokens = useCallback(async () => {
    if (!tokens?.refreshToken) return false;
    
    try {
      const response = await makeAuthRequest('/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken: tokens.refreshToken }),
      });
      
      if (response.success) {
        setTokens(response.tokens);
        return true;
      }
      return false;
    } catch (error) {
      await logout();
      return false;
    }
  }, [tokens, logout]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleLogout = useCallback(async (message) => {
    await logout();
    if (message) {
      showToast('info', message);
    }
  }, [logout]);

  const showToast = (type, message) => {
    if (window) {
      window.dispatchEvent(new CustomEvent('edusens-toast', { 
        detail: { type, message } 
      }));
    }
  };

  // For demo/testing purposes only
  const simulateLogin = (userData) => {
    console.log("AuthContext - Simulating login with:", userData);
    setUser(userData);
    return { success: true };
  };

  // Forgot password function (placeholder for now)
  const forgotPassword = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      // For now, simulate the request
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('success', 'Password reset email sent! Please check your inbox.');
      return { success: true, message: 'Password reset email sent! Please check your inbox.' };
    } catch (error) {
      const message = 'Failed to process password reset request. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Reset password function (placeholder for now)
  const resetPassword = async (token, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // For now, simulate the request
      await new Promise(resolve => setTimeout(resolve, 1000));
      showToast('success', 'Password reset successfully!');
      return { success: true, message: 'Password reset successfully!' };
    } catch (error) {
      const message = 'Failed to reset password. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Legacy compatibility - provide both new and old property names
  const value = {
    // New enhanced properties
    user,
    tokens,
    loading,
    error,
    login,
    register,
    socialAuth,
    logout,
    updateUsername,
    refreshToken: refreshTokens,
    clearError,
    
    // Legacy properties for backward compatibility
    currentUser: user,
    handleLogin: (userData, tokenValue) => {
      setUser(userData);
      setTokens({ accessToken: tokenValue, refreshToken: tokenValue });
    },
    handleLogout: handleLogout,
    forgotPassword,
    resetPassword,
    simulateLogin,
    signup: register, // Alias for register
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading auth state...</div>}
    </AuthContext.Provider>
  );
};
