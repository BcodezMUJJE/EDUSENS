import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false); // Set to false since we're not waiting for Firebase

  // Mock logout function
  const logout = () => {
    // return signOut(auth);
    setCurrentUser(null);
    return Promise.resolve(); // Return a resolved promise to maintain API compatibility
  };

  // Listen for auth state changes
  useEffect(() => {
    // console.log("Setting up auth listener");
    
    // Firebase auth state listener - COMMENTED OUT
    // const unsubscribe = onAuthStateChanged(auth, (user) => {
    //   console.log("Auth state changed:", user);
    //   setCurrentUser(user);
    //   setLoading(false);
    // });
    
    // Mock cleanup function
    return () => {
      // if (unsubscribe) unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
