// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'sahand-estate.firebaseapp.com',
  projectId: 'sahand-estate',
  storageBucket: 'sahand-estate.appspot.com',
  messagingSenderId: '996013558518',
  appId: '1:996013558518:web:c7054e45ee8795885f3ad7',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
