// Auth.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate();
    const { login, signup, simulateLogin, currentUser } = useContext(AuthContext);

    // Redirect if already logged in
    useEffect(() => {
        if (currentUser) {
            console.log("Auth - User already logged in, redirecting to home");
            navigate('/');
        }
    }, [currentUser, navigate]);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!isLogin && !formData.full_name) {
            newErrors.full_name = 'Full name is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        
        try {
            let result;
            
            if (isLogin) {
                console.log("Auth - Logging in user:", formData.email);
                result = await login(formData.email, formData.password);
            } else {
                console.log("Auth - Signing up user:", formData.email);
                result = await signup(formData.full_name, formData.email, formData.password);
            }
            
            if (result.success) {
                console.log("Auth - Authentication successful");
                setSuccess(true);
                
                // Redirect to home page after successful authentication
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                console.error("Auth - Authentication failed:", result.message);
                setErrors({ general: result.message || 'Authentication failed' });
            }
        } catch (error) {
            console.error("Auth - Error during authentication:", error);
            setErrors({ general: 'Authentication failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: ''
            });
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setFormData({
            full_name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const handleSocialAuth = async (provider) => {
        // For now, simulate social login with the simulateLogin function
        try {
            console.log(`Auth - ${isLogin ? 'Login' : 'Signup'} with ${provider}`);
            setLoading(true);
            
            const mockUser = {
                displayName: `${provider} User`,
                email: `user@${provider.toLowerCase()}.com`,
                photoURL: null,
                provider: provider.toLowerCase()
            };
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            simulateLogin(mockUser);
            setSuccess(true);
            
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            console.error(`Auth - ${provider} login error:`, error);
            setErrors({ general: `${provider} login failed. Please try again.` });
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="auth-container">
                <div className="auth-form-container">
                    <div className="auth-success">
                        <h2>Success!</h2>
                        <p>{isLogin ? 'Login successful!' : 'Account created successfully!'}</p>
                        <p>Redirecting to homepage...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-container">
            <div className="auth-form-container">
                <div className="auth-header">
                    <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p>
                        {isLogin 
                            ? 'Log in to your EduSens account' 
                            : 'Join EduSens to start your learning journey'
                        }
                    </p>
                </div>

                {errors.general && (
                    <div className="general-error">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="full_name">Full Name</label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                aria-describedby="full_name-error"
                                className={errors.full_name ? 'error' : ''}
                                disabled={loading}
                            />
                            {errors.full_name && (
                                <span id="full_name-error" className="error-message">
                                    {errors.full_name}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            aria-describedby="email-error"
                            className={errors.email ? 'error' : ''}
                            disabled={loading}
                        />
                        {errors.email && (
                            <span id="email-error" className="error-message">
                                {errors.email}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            aria-describedby="password-error"
                            className={errors.password ? 'error' : ''}
                            disabled={loading}
                        />
                        {errors.password && (
                            <span id="password-error" className="error-message">
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                aria-describedby="confirm-password-error"
                                className={errors.confirmPassword ? 'error' : ''}
                                disabled={loading}
                            />
                            {errors.confirmPassword && (
                                <span id="confirm-password-error" className="error-message">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                    )}

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
                    </button>
                </form>

                <div className="social-auth">
                    <p>Or continue with</p>
                    <div className="social-buttons">
                        {['Google', 'Apple', 'Microsoft', 'Yahoo'].map((provider) => (
                            <button
                                key={provider}
                                className="social-button"
                                onClick={() => handleSocialAuth(provider)}
                                type="button"
                                aria-label={`${isLogin ? 'Login' : 'Sign up'} with ${provider}`}
                                disabled={loading}
                            >
                                {provider}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="auth-footer">
                    <p>
                        {isLogin 
                            ? "Don't have an account? " 
                            : "Already have an account? "
                        }
                        <button 
                            type="button" 
                            className="auth-toggle" 
                            onClick={toggleMode}
                            disabled={loading}
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;