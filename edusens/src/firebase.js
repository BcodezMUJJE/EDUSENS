// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "your-api-key",
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "your-auth-domain",
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "your-project-id",
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "your-storage-bucket",
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id",
//   appId: process.env.REACT_APP_FIREBASE_APP_ID || "your-app-id"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// Mock auth object for development
const auth = {
  // Add mock methods if needed
  // currentUser: null,
  // onAuthStateChanged: (callback) => callback(null),
  // signOut: () => Promise.resolve()
};

export { auth };
export default {}; // Export empty object as a placeholder for the Firebase app
