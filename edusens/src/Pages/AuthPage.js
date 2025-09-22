import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthDebug from '../Components/AuthDebug';
import './AuthPage.css';

// Social media icons
import googleIcon from '../Assets/google-icon.svg';
import microsoftIcon from '../Assets/microsoft-icon.svg';
import appleIcon from '../Assets/apple-icon.svg';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  // Access the AuthContext
  const { login, signup, simulateLogin, currentUser } = useContext(AuthContext);
  
  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (currentUser) {
      console.log("AuthPage - User already logged in, redirecting to home");
      navigate('/');
    }
  }, [currentUser, navigate]);

  // Clear form state when switching between login/signup modes
  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess(false);
  }, [isLogin]);

  // Form validation
  const validateForm = () => {
    // Reset error
    setError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    // Password validation
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    // Password complexity check
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      setError('Password must contain uppercase, lowercase letters and numbers');
      return false;
    }

    // Confirm password validation (for signup only)
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      let result;
      
      if (isLogin) {
        console.log("AuthPage - Logging in user:", email);
        result = await login(email, password);
      } else {
        console.log("AuthPage - Signing up user:", email);
        // Use the full name if you have a field for it, or extract from email
        const fullName = email.split('@')[0]; // Simple fallback if no full name field
        result = await signup(fullName, email, password);
      }
      
      if (result.success) {
        console.log("AuthPage - Authentication successful");
        setSuccess(true);
        
        // Redirect to home page after successful authentication
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(result.message || 'Authentication failed. Please try again.');
        console.error('Authentication error:', result.message);
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
      console.error('Authentication error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setLoading(true);
    setError('');
    
    try {
      console.log(`AuthPage - Authenticating with ${provider}`);
      
      // For now, simulate OAuth login since we haven't implemented it yet
      // In a real implementation, we would call something like:
      // const result = await oauthLogin(provider);
      
      // For demo purposes, use the simulateLogin function if available
      if (provider === 'google' && typeof simulateLogin === 'function') {
        const mockUser = {
          displayName: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
          email: `user@${provider}.com`,
          photoURL: null,
          provider
        };
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        simulateLogin(mockUser);
        setSuccess(true);
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        // Fallback to simulated behavior
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSuccess(true);
        
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      console.error(`AuthPage - ${provider} login error:`, error);
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      <AuthDebug />
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <h1>{isLogin ? 'Log in to your Edusens Africa account' : 'Create account'}</h1>
            <p>
              {isLogin 
                ? 'Welcome back! Please enter your details.' 
                : 'Join EduSens Africa to access career guidance and learning resources.'}
            </p>
          </div>

          {success && (
            <div className="success-message">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{isLogin ? 'Login successful!' : 'Account created successfully!'} Redirecting...</span>
            </div>
          )}

          {!success && (
            <>
              <div className="oauth-buttons">
                <button 
                  className="oauth-button google"
                  onClick={() => handleOAuthLogin('google')}
                  disabled={loading}
                >
                  <img src={googleIcon} alt="Google" />
                  <span>Continue with Google</span>
                </button>
                
                <button 
                  className="oauth-button microsoft"
                  onClick={() => handleOAuthLogin('microsoft')}
                  disabled={loading}
                >
                  <img src={microsoftIcon} alt="Microsoft" />
                  <span>Continue with Microsoft</span>
                </button>
                
                <button 
                  className="oauth-button apple"
                  onClick={() => handleOAuthLogin('apple')}
                  disabled={loading}
                >
                  <img src={appleIcon} alt="Apple" />
                  <span>Continue with Apple</span>
                </button>
              </div>

              <div className="divider">
                <span>or</span>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-input-container">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      disabled={loading}
                    />
                    <button 
                      type="button" 
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {!isLogin && (
                    <p className="password-hint">Must be at least 8 characters with uppercase, lowercase and numbers</p>
                  )}
                </div>

                {!isLogin && (
                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <div className="password-input-container">
                      <input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                        disabled={loading}
                      />
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="forgot-password">
                    <Link to="/forgot-password">Forgot password?</Link>
                  </div>
                )}

                <button 
                  type="submit" 
                  className={`submit-button ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading-spinner"></span>
                  ) : isLogin ? 'Log in' : 'Sign up'}
                </button>
              </form>
            </>
          )}

          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                className="toggle-auth-mode"
                onClick={() => setIsLogin(!isLogin)}
                disabled={loading || success}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

