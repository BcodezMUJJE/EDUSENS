import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import './SocialAuth.css';

const SocialAuth = ({ mode = 'login' }) => {
  const { socialAuth, loading } = useContext(AuthContext);
  const [socialLoading, setSocialLoading] = useState(null);

  const handleGoogleAuth = async () => {
    setSocialLoading('google');
    
    try {
      // Load Google OAuth library if not already loaded
      if (!window.google) {
        await loadGoogleScript();
      }

      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'openid email profile',
        ux_mode: 'popup',
        callback: async (response) => {
          try {
            // Get user profile from Google
            const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: {
                'Authorization': `Bearer ${response.access_token}`
              }
            });
            const profile = await profileResponse.json();
            
            const result = await socialAuth('google', response.access_token, profile);
            
            if (!result.success) {
              showToast('error', result.message || 'Google authentication failed');
            }
          } catch (error) {
            console.error('Google auth error:', error);
            showToast('error', 'Failed to authenticate with Google');
          }
        },
        error_callback: (error) => {
          console.error('Google OAuth error:', error);
          showToast('error', 'Google authentication was cancelled or failed');
        }
      });

      client.requestAccessToken();
    } catch (error) {
      console.error('Google OAuth initialization error:', error);
      showToast('error', 'Failed to initialize Google authentication');
    } finally {
      setSocialLoading(null);
    }
  };

  const handleMicrosoftAuth = async () => {
    setSocialLoading('microsoft');
    
    try {
      // Load Microsoft MSAL library if not already loaded
      if (!window.msal) {
        await loadMicrosoftScript();
      }

      const msalConfig = {
        auth: {
          clientId: process.env.REACT_APP_MICROSOFT_CLIENT_ID,
          authority: 'https://login.microsoftonline.com/common',
          redirectUri: window.location.origin,
        },
        cache: {
          cacheLocation: 'sessionStorage',
          storeAuthStateInCookie: false,
        }
      };

      const msalInstance = new window.msal.PublicClientApplication(msalConfig);
      
      const loginRequest = {
        scopes: ['openid', 'profile', 'email'],
        prompt: 'select_account',
      };

      const response = await msalInstance.loginPopup(loginRequest);
      
      const result = await socialAuth('microsoft', response.accessToken, {
        id: response.account.localAccountId,
        email: response.account.username,
        name: response.account.name,
        picture: null // Microsoft doesn't provide picture in basic scope
      });
      
      if (!result.success) {
        showToast('error', result.message || 'Microsoft authentication failed');
      }
    } catch (error) {
      console.error('Microsoft auth error:', error);
      if (error.errorCode !== 'user_cancelled') {
        showToast('error', 'Failed to authenticate with Microsoft');
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const handleAppleAuth = async () => {
    setSocialLoading('apple');
    
    try {
      // Load Apple Sign-In library if not already loaded
      if (!window.AppleID) {
        await loadAppleScript();
        
        window.AppleID.auth.init({
          clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
          scope: 'name email',
          redirectURI: `${window.location.origin}/auth/apple/callback`,
          state: 'apple-auth',
          usePopup: true,
        });
      }

      const response = await window.AppleID.auth.signIn();
      
      // Apple provides limited user info
      const profile = {
        id: response.user,
        email: response.email,
        name: response.name ? `${response.name.firstName} ${response.name.lastName}` : null,
        picture: null
      };
      
      const result = await socialAuth('apple', response.authorization.id_token, profile);
      
      if (!result.success) {
        showToast('error', result.message || 'Apple authentication failed');
      }
    } catch (error) {
      console.error('Apple auth error:', error);
      if (error.error !== 'popup_closed_by_user') {
        showToast('error', 'Failed to authenticate with Apple');
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const loadGoogleScript = () => {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const loadMicrosoftScript = () => {
    return new Promise((resolve, reject) => {
      if (window.msal) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://alcdn.msauth.net/browser/2.32.2/js/msal-browser.min.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const loadAppleScript = () => {
    return new Promise((resolve, reject) => {
      if (window.AppleID) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const showToast = (type, message) => {
    if (window) {
      window.dispatchEvent(new CustomEvent('edusens-toast', { 
        detail: { type, message } 
      }));
    }
  };

  const isLoading = loading || socialLoading;
  const actionText = mode === 'register' ? 'Sign up' : 'Sign in';

  return (
    <div className="social-auth">
      <div className="social-divider">
        <span>Or {mode === 'register' ? 'sign up' : 'continue'} with</span>
      </div>
      
      <div className="social-buttons">
        <button
          type="button"
          className="social-button google"
          onClick={handleGoogleAuth}
          disabled={isLoading}
        >
          <div className="social-icon">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </div>
          {socialLoading === 'google' ? (
            <span className="loading-spinner"></span>
          ) : (
            <span>{actionText} with Google</span>
          )}
        </button>

        <button
          type="button"
          className="social-button microsoft"
          onClick={handleMicrosoftAuth}
          disabled={isLoading}
        >
          <div className="social-icon">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#f25022" d="M1 1h10v10H1z"/>
              <path fill="#00a4ef" d="M13 1h10v10H13z"/>
              <path fill="#7fba00" d="M1 13h10v10H1z"/>
              <path fill="#ffb900" d="M13 13h10v10H13z"/>
            </svg>
          </div>
          {socialLoading === 'microsoft' ? (
            <span className="loading-spinner"></span>
          ) : (
            <span>{actionText} with Microsoft</span>
          )}
        </button>

        <button
          type="button"
          className="social-button apple"
          onClick={handleAppleAuth}
          disabled={isLoading}
        >
          <div className="social-icon">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
          </div>
          {socialLoading === 'apple' ? (
            <span className="loading-spinner"></span>
          ) : (
            <span>{actionText} with Apple</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialAuth;