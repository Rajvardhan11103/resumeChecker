import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <header className="nav">
      <div className="nav-inner container">
        <Link to="/" className="brand">ResumeChecker</Link>
        <nav className="nav-links">
          {!token && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="btn-outline">Register</Link>
            </>
          )}
          {token && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
