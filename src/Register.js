import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db, signInWithGoogle } from './config/firebase';


function Register() {
 

  return (
    <div className='App'>
      Register
    </div>
  );
}

export default Register;
