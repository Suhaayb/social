import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db, signInWithGoogle, auth } from './config/firebase';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';

import AuthDetails from './components/AuthDetails';

import SignUp from './components/auth/SignUp';


function App() {
  const [posts, setPosts] = useState([]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('sign out successful');
      })
      .catch((error) => console.log(error));
  };

  const fetchPosts = async () => {
    const q = query(collection(db, 'Posts'), orderBy('creation', 'desc'), limit(10));
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => doc.data());
    setPosts(postsData);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='App'>
      <AuthDetails />
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.Title}</h1>
          <p>{post.Description}</p>
        </div>
      ))}
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/dashboard'>Dash</Link>
        </li>
       
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
       
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
