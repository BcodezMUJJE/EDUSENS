// Auth.jsx
import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
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

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Handle authentication logic here
        console.log(isLogin ? 'Login data:' : 'Signup data:', formData);
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
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    const handleSocialAuth = (provider) => {
        // Implement social authentication logic here
        console.log(`${isLogin ? 'Login' : 'Signup'} with ${provider}`);
    };

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

                <form onSubmit={handleSubmit}>
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
                            />
                            {errors.confirmPassword && (
                                <span id="confirm-password-error" className="error-message">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                    )}

                    <button type="submit" className="submit-button">
                        {isLogin ? 'Log In' : 'Create Account'}
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