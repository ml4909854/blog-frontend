import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // State to manage form data
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  // State to manage error messages
  const [error, setError] = useState("");

  // State to manage loading state
  const [loading, setLoading] = useState(false);

  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function to handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Function to handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // Clear any previous errors
    setError("");

    // Prevent multiple submissions
    if (loading) return;

    // Set loading to true
    setLoading(true);

    try {
      // Send a POST request to the login endpoint
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, data);

      // If login is successful, navigate to the createBlog page
      if (response.status === 201) {
        console.log(response.data)
        localStorage.setItem("token" , response.data.token)
        localStorage.setItem("userId" , response.data.userId)
        localStorage.setItem("username" , response.data.username)
        navigate("/blogs");
        alert("Login successful! Create a new blog.");
      }
    } catch (error) {
      // Handle errors and set an appropriate error message
      setError(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Login error:", error); // Log the error for debugging
    } finally {
      // Reset loading state
      setLoading(false);
    }
  }

  return (
    <div className="loginContainer">
      <h1 className="heading">Login Form</h1>

      {/* Display error message if any */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          {/* Username input */}
          <input
            type="text"
            onChange={handleChange}
            placeholder="Username"
            name="username"
            value={data.username}
            required
          />
          <br />

          {/* Password input */}
          <input
            type="text"
            onChange={handleChange}
            placeholder="Password"
            name="password"
            value={data.password}
            required
          />
          <br />

          {/* Submit button */}
          <button className="button" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;