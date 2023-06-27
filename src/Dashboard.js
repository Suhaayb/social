import { useEffect, useState } from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import Posts from './Posts';

import { collection, addDoc } from "firebase/firestore";
import { db } from "./config/firebase";

const Dashboard = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true'
  );
  const [Title, setTitle] = useState(''); // Changed from array to regular state variable
  const [Description, setDescription] = useState(''); // Changed from array to regular state variable

  // Create posts
  const createPost = async (e) => {
    e.preventDefault(); // Prevents the form from submitting and refreshing the page

    if (Title && Description) {
      await addDoc(collection(db, "Posts"), {
        Title: Title,
        Description: Description,
      });

      // Clear the input fields after creating the post
      setTitle('');
      setDescription('');
    } else {
      console.log("Missing required fields");
    }
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('authenticated');
    if (loggedInUser) {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return <Navigate replace to='/login' />;
  } else {
    return (
      <div>
        <p>Welcome to your Dashboard</p>
        <h1 className="mt-2 mb-4 flex justify-center">Create a post</h1>

        <div className="flex justify-center max-h-8">
          <form>
            <div>
              <label className="flex justify-start">Title</label>
              <input
                className="rounded-md border border-2 border-slate-500"
                type="text"
                id="title"
                placeholder="Title..."
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="mt-2 flex justify-start">Description</label>
              <textarea
                className="rounded-md border border-2 border-slate-500"
                id="description"
                value={Description}
                placeholder="Description..."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button
              className="rounded-lg font-bold bg-blue-300 p-1 mt-2"
              type="submit"
              onClick={createPost}
            >
              Create post
            </button>
          </form>
        </div>
        <Posts />
      </div>
    );
  }
};

export default Dashboard;
