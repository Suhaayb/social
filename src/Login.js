import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db, signInWithGoogle } from './config/firebase';


function Login() {
 

  return (
    <div className='App'>
      <div className='Login-left'></div>
      <div className='Login-right'></div>
    </div>
  );
}

export default Login;
