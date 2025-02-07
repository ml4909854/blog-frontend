import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  // State to manage form data
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "",
  });

  // State to manage error messages
  const [error, setError] = useState("");

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
    setError("");

    try {
      
      // Send a POST request to the registration endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        data
      );

      // If registration is successful, set submitted to true and navigate to the login page
      if (response.status === 201) {
        alert("Registration sucessful. Please login")
        navigate("/login");
        
      }
    } catch (error) {
      // Handle errors and set an appropriate error message
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  }

  return (
    <div className="signUpContainer">
      <h1 className="heading">Sign Up Form</h1>

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

          {/* Role selection dropdown */}
          <select
            onChange={handleChange}
            name="role"
            value={data.role}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="author">Author</option>
            <option value="reader">Reader</option>
          </select>
          <br />

          {/* Submit button */}
          <button className="button" type="submit">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
