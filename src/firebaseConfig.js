
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBmu2iAn2bEUPLR2hBHCQAhknCpMMWjz3o",
  authDomain: "fir-login-aea12.firebaseapp.com",
  databaseURL: "https://fir-login-aea12-default-rtdb.firebaseio.com",
  projectId: "fir-login-aea12",
  storageBucket: "fir-login-aea12.appspot.com",
  messagingSenderId: "394751119213",
  appId: "1:394751119213:web:60bb6ffdf84365efe11464",
  measurementId: "G-JWSVR4CMZB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {app,auth}