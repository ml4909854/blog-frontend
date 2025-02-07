import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get token from localStorage

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="navbar">
      <Link className="link" to="/">Home</Link>
      <Link className="link" to="/blogs">Blogs</Link>
      {token && <Link className="link" to="/createBlog">Create Blog</Link>}
      {token && <Link className="link" to="/my-blogs">My Blogs</Link>}

      {/* Show Login & Signup when user is NOT logged in */}
      {!token ? (
        <>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/signup">Signup</Link>
        </>
      ) : (
        <button className="link logout-btn" onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;
