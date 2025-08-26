// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top px-4 shadow">
      <Link className="navbar-brand fw-bold" to="/dashboard">Asset Manager</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/asset">Assets</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/category">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
