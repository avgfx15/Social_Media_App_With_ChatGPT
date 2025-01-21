import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {


  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");


  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    alert("You have been logged out.");
    navigate("/signin"); // Redirect to the login route
  };

  return (
    <div>
         <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <Link className='navbar-brand' to='/'>
            Home
          </Link>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' to='/signin'>
                  Sign In
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/signup'>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          {authToken && (
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      )}
        </nav>
    </div>
  )
}

export default Navbar