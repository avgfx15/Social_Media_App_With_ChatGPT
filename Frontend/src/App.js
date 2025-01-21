// src/App.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import RoutesComponent from './Components/RoutesComponent';
import Navbar from './Components/Navbar';

const App = () => {

  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");


  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    alert("You have been logged out.");
    navigate("/signin"); // Redirect to the login route
  };

  return (
    <div>
      <div className='container mt-5'>
        <Navbar />
        <div>
          <RoutesComponent />
        </div>
      </div>
    </div>
  );
};

export default App;
