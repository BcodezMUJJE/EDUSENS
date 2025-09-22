import { setToken, setUser, removeToken, removeUser, getToken } from '../utils/auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Handle API response and errors
 * @param {Response} response - The fetch response
 * @returns {Promise} Resolved with the response data or rejected with error
 */
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

/**
 * Register a new user
 * @param {string} full_name - User's full name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} Signup result
 */
export const signup = async (full_name, email, password) => {
  try {
    console.log("authService - Signing up user:", email);
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name,
        email,
        password,
      }),
    });

    const data = await handleResponse(response);
    
    if (data.token) {
      console.log("authService - Setting token and user after signup");
      setToken(data.token);
      setUser(data.user);
    }
    
    return {
      success: true,
      ...data
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Login a user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} Login result
 */
export const login = async (email, password) => {
  try {
    console.log("authService - Logging in user:", email);
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await handleResponse(response);
    
    if (data.token) {
      console.log("authService - Setting token and user after login");
      setToken(data.token);
      setUser(data.user);
    }
    
    return {
      success: true,
      user: data.user,
      ...data
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Logout a user
 * @returns {Promise} Logout result
 */
export const logout = async () => {
  try {
    console.log("authService - Logging out user");
    const token = getToken();
    
    if (!token) {
      console.log("authService - No token found for logout");
      removeToken();
      removeUser();
      return { success: true };
    }
    
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await handleResponse(response);
    
    console.log("authService - Removing token and user after logout");
    removeToken();
    removeUser();
    
    return {
      success: true,
      ...data
    };
  } catch (error) {
    console.error('Logout error:', error);
    
    // Still remove token and user data on error
    removeToken();
    removeUser();
    
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Verify user token
 * @returns {Promise} Verification result
 */
export const verifyToken = async () => {
  try {
    const token = getToken();
    
    if (!token) {
      console.log("authService - No token found for verification");
      return { success: false };
    }
    
    console.log("authService - Verifying token");
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await handleResponse(response);
    
    return {
      success: true,
      user: data.user,
      ...data
    };
  } catch (error) {
    console.error('Token verification error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Get user profile
 * @returns {Promise} User profile data
 */
export const getProfile = async () => {
  try {
    const token = getToken();
    
    if (!token) {
      console.log("authService - No token found for profile");
      return { success: false };
    }
    
    console.log("authService - Getting user profile");
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await handleResponse(response);
    
    return {
      success: true,
      user: data.user,
      ...data
    };
  } catch (error) {
    console.error('Get profile error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Update user profile
 * @param {Object} profileData - Updated profile data (full_name, username)
 * @returns {Promise} Update result
 */
export const updateProfile = async (profileData) => {
  try {
    const token = getToken();
    
    if (!token) {
      console.log("authService - No token found for profile update");
      return { success: false };
    }
    
    console.log("authService - Updating user profile");
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });

    const data = await handleResponse(response);
    
    // Update stored user data
    setUser(data.user);
    
    return {
      success: true,
      user: data.user,
      ...data
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Request password reset
 * @param {string} email - User's email
 * @returns {Promise} Password reset request result
 */
export const forgotPassword = async (email) => {
  try {
    console.log("authService - Requesting password reset for:", email);
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    });

    const data = await handleResponse(response);
    
    return {
      success: true,
      ...data
    };
  } catch (error) {
    console.error('Forgot password error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Reset password with token
 * @param {string} token - Reset token
 * @param {string} password - New password
 * @returns {Promise} Password reset result
 */
export const resetPassword = async (token, password) => {
  try {
    console.log("authService - Resetting password with token");
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password })
    });

    const data = await handleResponse(response);
    
    return {
      success: true,
      ...data
    };
  } catch (error) {
    console.error('Reset password error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};

/**
 * Google authentication
 * @param {string} tokenId - Google token ID
 * @returns {Promise} Google auth result
 */
export const googleAuth = async (tokenId) => {
  try {
    console.log("authService - Authenticating with Google");
    const response = await fetch(`${API_URL}/auth/social/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tokenId })
    });

    const data = await handleResponse(response);
    
    if (data.token) {
      console.log("authService - Setting token and user after Google auth");
      setToken(data.token);
      setUser(data.user);
    }
    
    return {
      success: true,
      user: data.user,
      ...data
    };
  } catch (error) {
    console.error('Google auth error:', error);
    return {
      success: false,
      message: error.message
    };
  }
};
