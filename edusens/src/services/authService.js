import { setToken, setUser, removeToken } from '../utils/auth';

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
 * Log in an existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} Login result
 */
export const login = async (email, password) => {
  try {
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
      setToken(data.token);
      setUser(data.user);
    }
    
    return {
      success: true,
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
 * Log out the current user
 * @returns {Object} Logout result
 */
export const logout = () => {
  removeToken();
  
  return {
    success: true,
    message: 'Logged out successfully'
  };
};

/**
 * Verify the current token
 * @returns {Promise} Verification result
 */
export const verifyToken = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('edusens_auth_token')}`
      }
    });

    const data = await handleResponse(response);
    
    return {
      success: true,
      ...data
    };
  } catch (error) {
    console.error('Token verification error:', error);
    // Token may be invalid, remove it
    removeToken();
    
    return {
      success: false,
      message: error.message
    };
  }
};
            `INSERT INTO social_connections (user_id, provider, provider_user_id, provider_data) 
             VALUES ($1, $2, $3, $4)`,
            [userId, provider, providerUserId, JSON.stringify(providerData)]
          );
        }
        
        // Get the user data
        result = await client.query(
          'SELECT id, full_name, email, username FROM users WHERE id = $1',
          [userId]
        );
        
        const user = result.rows[0];
        
        // Create a new session
        const sessionToken = generateToken();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // Session expires in 7 days
        
        await client.query(
          `INSERT INTO sessions (user_id, session_token, expires_at) 
           VALUES ($1, $2, $3)`,
          [userId, sessionToken, expiresAt]
        );
        
        await client.query('COMMIT');
        
        return {
          user,
          sessionToken,
          expiresAt
        };
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    } catch (error) {
      throw error;
    }
  },
  
  // Initialize password reset
  async requestPasswordReset(email) {
    try {
      // Check if user exists
      const result = await db.query(
        'SELECT id FROM users WHERE email = $1',
        [email]
      );
      
      if (result.rows.length === 0) {
        // Don't reveal if email exists or not for security
        return { success: true };
      }
      
      const userId = result.rows[0].id;
      
      // Generate reset token
      const token = generateToken();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour
      
      // Store token in database
      await db.query(
        `INSERT INTO password_resets (user_id, token, expires_at) 
         VALUES ($1, $2, $3)`,
        [userId, token, expiresAt]
      );
      
      // In a real app, send an email with the reset link
      // For now, just return the token for testing
      return {
        success: true,
        token,
        userId
      };
    } catch (error) {
      throw error;
    }
  },
  
  // Reset password using token
  async resetPassword(token, newPassword) {
    try {
      // Begin a transaction
      const client = await db.getClient();
      try {
        await client.query('BEGIN');
        
        // Find the reset token
        const result = await client.query(
          `SELECT id, user_id, expires_at, used 
           FROM password_resets 
           WHERE token = $1`,
          [token]
        );
        
        if (result.rows.length === 0) {
          throw new Error('Invalid or expired token');
        }
        
        const resetData = result.rows[0];
        
        // Check if token is expired or already used
        if (new Date() > new Date(resetData.expires_at) || resetData.used) {
          throw new Error('Invalid or expired token');
        }
        
        // Hash the new password
        const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
        
        // Update the user's password
        await client.query(
          'UPDATE users SET password_hash = $1 WHERE id = $2',
          [passwordHash, resetData.user_id]
        );
        
        // Mark the token as used
        await client.query(
          'UPDATE password_resets SET used = TRUE WHERE id = $1',
          [resetData.id]
        );
        
        await client.query('COMMIT');
        
        return { success: true };
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    } catch (error) {
      throw error;
    }
  },
  
  // Verify a session token
  async verifySession(sessionToken) {
    try {
      const result = await db.query(
        `SELECT s.id, s.user_id, s.expires_at, u.full_name, u.email, u.username
         FROM sessions s
         JOIN users u ON s.user_id = u.id
         WHERE s.session_token = $1 AND s.expires_at > NOW()`,
        [sessionToken]
      );
      
      if (result.rows.length === 0) {
        return null;
      }
      
      const session = result.rows[0];
      return {
        sessionId: session.id,
        user: {
          id: session.user_id,
          fullName: session.full_name,
          email: session.email,
          username: session.username
        },
        expiresAt: session.expires_at
      };
    } catch (error) {
      throw error;
    }
  },
  
  // Logout (invalidate session)
  async logout(sessionToken) {
    try {
      await db.query(
        'DELETE FROM sessions WHERE session_token = $1',
        [sessionToken]
      );
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = authService;
