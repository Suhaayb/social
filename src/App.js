import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db, signInWithGoogle } from './config/firebase';
import Login from './Login';
import Register from './Register';

// import { auth, googleProvider } from './config/firebase';
// import { signInWithPopup } from 'firebase/auth';

function App() {
  const [Posts, setPosts] = useState([]);
  // const [userCedentials, setCredientials] = useState([]);

  const haalDocumentenOp = () => {
    const q = query(collection(db, 'Posts'));
    getDocs(q).then((firebaseResponse) => {
      const lijstVanDocumenten = firebaseResponse.docs.map((doc) => doc.data());
      setPosts(lijstVanDocumenten);
    });
  };

  // const loginWithGoogle = async () => {
  //   const userCedentials = await signInWithPopup(auth, googleProvider);
  //   setCredientials(userCedentials);
  //   console.log(userCedentials);
  // };

  useEffect(() => {
    haalDocumentenOp();
  }, []);

  return (
    <>
      {/* {Posts.map((Posts) => (
        <div>
          <h1>{Posts.Title}</h1>
          <p>{Posts.Description}</p>
        </div>
      ))}
      <button class='login-with-google-btn' onClick={signInWithGoogle}>
        Sign in with Google
      </button>
      <h1>{localStorage.getItem('name')}</h1>
      <h1>{localStorage.getItem('email')}</h1> */}
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
    </>
  );
}

export default App;
