import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { db, signInWithGoogle, auth } from './config/firebase';
import Login from './Login';
import Register from './Register';

import AuthDetails from './components/AuthDetails';

import SignUp from './components/auth/SignUp';

function App() {
  const [Posts, setPosts] = useState([]);
  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign out successful');
      })
      .catch((error) => console.log(error));
  };
  const haalDocumentenOp = () => {
    const q = query(collection(db, 'Posts'));
    getDocs(q).then((firebaseResponse) => {
      const lijstVanDocumenten = firebaseResponse.docs.map((doc) => doc.data());
      setPosts(lijstVanDocumenten);
    });
  };

  useEffect(() => {
    haalDocumentenOp();
  }, []);

  return (
    <div className='App'>
      <AuthDetails />
      <SignUp></SignUp>
      <div className='paragraph-text'>
        <button class='button-25' onClick={signInWithGoogle}>
          Google Login
        </button>
        <button onClick={userSignOut}>Sign Out</button>
        {/* <h6>{localStorage.getItem('name')}</h6>
        <h6>{localStorage.getItem('email')}</h6> */}
      </div>
      {Posts.map((Posts) => (
        <div>
          <h1>{Posts.Title}</h1>
          <p>{Posts.Description}</p>
        </div>
      ))}
      <button class='login-with-google-btn' onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <h1>{localStorage.getItem('name')}</h1>
      <h1>{localStorage.getItem('email')}</h1> 
      <ul>
        <li>
          <a href='/'>Home</a>
        </li>

        <li>
          <a href='/search'>Search</a>
        </li>

        <li>
          <a href='/login'>Login</a>
        </li>

        <li>
          <a href='/register'>Register</a>
        </li>
      </ul>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
