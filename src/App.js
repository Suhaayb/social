import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db, signInWithGoogle } from './config/firebase';

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
    <div className='App'>
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
    </div>
  );
}

export default App;
