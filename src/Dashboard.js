import { useEffect, useState } from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';


const Dashboard = () => {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true'
  );

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
       
      </div>
    );
  }
};

export default Dashboard;