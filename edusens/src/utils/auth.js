/**
 * Authentication utility functions for managing tokens and user data
 */

// Local storage keys
const TOKEN_KEY = 'edusens_auth_token';
const USER_KEY = 'edusens_user';

/**
 * Store authentication token in local storage
 * @param {string} token - The JWT token
 */
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get authentication token from local storage
 * @returns {string|null} The JWT token or null if not found
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove authentication token from local storage
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Store user data in local storage
 * @param {Object} user - The user object
 */
export const setUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get user data from local storage
 * @returns {Object|null} The user object or null if not found
 */
export const getUser = () => {
  const userJson = localStorage.getItem(USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

/**
 * Remove user data from local storage
 */
export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Clear all authentication data from local storage
 */
export const clearAuth = () => {
  removeToken();
  removeUser();
};

/**
 * Check if user is authenticated based on token existence
 * @returns {boolean} True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Parse JWT token to get payload data
 * @param {string} token - The JWT token
 * @returns {Object|null} The decoded payload or null if invalid
 */
export const parseToken = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(window.atob(base64));
    return payload;
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - The JWT token
 * @returns {boolean} True if expired, false otherwise
 */
export const isTokenExpired = (token) => {
  const payload = parseToken(token);
  if (!payload) return true;
  
  const currentTime = Date.now() / 1000;
  return payload.exp < currentTime;
};