
import { initializeApp  } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDoZjpJaCQFgZ3vTep1EB_Xec7GFj4XKUs",
  authDomain: "email-password-auth-98bcc.firebaseapp.com",
  projectId: "email-password-auth-98bcc",
  storageBucket: "email-password-auth-98bcc.appspot.com",
  messagingSenderId: "1014783904867",
  appId: "1:1014783904867:web:2b7b8aba48f850e6d1bc56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth