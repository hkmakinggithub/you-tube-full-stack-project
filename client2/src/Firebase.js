import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyAZciNohqYaP7dyJDj5kf7MQGUAjREVZ1c",
  authDomain: "video-79b7b.firebaseapp.com",
  projectId: "video-79b7b",
  storageBucket: "video-79b7b.appspot.com",
  messagingSenderId: "480714967500",
  appId: "1:480714967500:web:dc1fbbb3ba784183673569",
  measurementId: "G-0C3PJC6JZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app