import './App.css';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query } from 'firebase/firestore';
import { db, signInWithGoogle, auth } from './config/firebase';

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
    </div>
  );
}

export default App;
