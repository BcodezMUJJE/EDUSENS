import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AuthDebug = () => {
  const { currentUser, setCurrentUser, logout } = useContext(AuthContext);
  const mockUser = {
    displayName: 'Test User',
    email: 'test@example.com',
    photoURL: null
  };

  // Function to simulate login
  const simulateLogin = () => {
    console.log("AuthDebug - Setting currentUser:", mockUser);
    setCurrentUser(mockUser);
  };

  // Function to simulate logout
  const simulateLogout = async () => {
    await logout();
  };

  const styles = {
    container: {
      margin: '20px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      maxWidth: '500px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: '#333',
    },
    status: {
      padding: '10px',
      backgroundColor: currentUser ? '#e6f7e6' : '#f7e6e6',
      borderRadius: '4px',
      marginBottom: '15px',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    buttons: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center'
    },
    button: {
      padding: '10px 20px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'all 0.2s ease',
    },
    loginButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    logoutButton: {
      backgroundColor: '#f44336',
      color: 'white',
    },
    userInfo: {
      marginTop: '15px',
      padding: '10px',
      backgroundColor: '#e6e6e6',
      borderRadius: '4px',
      lineHeight: '1.5'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>Authentication Debug</div>
      <div style={styles.status}>
        Status: {currentUser ? 'Logged In' : 'Logged Out'}
      </div>
      <div style={styles.buttons}>
        <button 
          style={{...styles.button, ...styles.loginButton}} 
          onClick={simulateLogin}
          disabled={currentUser}
        >
          Simulate Login
        </button>
        <button 
          style={{...styles.button, ...styles.logoutButton}} 
          onClick={simulateLogout}
          disabled={!currentUser}
        >
          Simulate Logout
        </button>
      </div>
      {currentUser && (
        <div style={styles.userInfo}>
          <div><strong>Name:</strong> {currentUser.displayName || 'N/A'}</div>
          <div><strong>Email:</strong> {currentUser.email || 'N/A'}</div>
        </div>
      )}
    </div>
  );
};

export default AuthDebug;