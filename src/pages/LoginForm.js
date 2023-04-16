import React, { useState } from 'react';
import './LoginForm.css';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { authActions } from '../store/AuthStore';




function LoginForm() {
  const history=useHistory()  ;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const[isSignedIn,setSignedIn]=useState(false)

  //redux store
  const dispatch=useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert('Please fill out both email and password fields.');
      return;
    }
   try{
    const userCredential=await  signInWithEmailAndPassword(auth, email, password)
    console.log(userCredential)

    // Signed in 
    const user = userCredential.user;
    console.log(user)
    setErrorMessage("");
    setSignedIn(true);
    dispatch(authActions.login({token:user.accessToken,userId:user.uid}))
    history.replace('/addexpense')
    //alert("You have been signed in successfully!");
  }catch(error) {
    setErrorMessage(error.message);
  }


  };

  return (
    <div className='container'>


    <form className="login-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
    </div>
  );
}
export default LoginForm;