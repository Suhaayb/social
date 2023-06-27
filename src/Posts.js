import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from './config/firebase';


function Posts() {
  const [Posts, setPosts] = useState([]);

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
    <div>
      {Posts.map((Posts) => (
        <div>
          <h1>{Posts.Title}</h1>
          <p>{Posts.Description}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;