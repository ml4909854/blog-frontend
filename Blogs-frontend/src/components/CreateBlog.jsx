import React, { useState } from "react";
import "./createBlog.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
const navigate = useNavigate()
  // Handle input changes for both title and content
  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Clear previous error message

    try {
      // Assuming you have a JWT token for authentication (replace with actual token)
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/blogs/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Sending token for authentication
          },
        }
      );

      if (response.status === 201) {
        setSubmitted(true);
 
        alert("Blog created successfully!");
      
        // Optionally, reset the form
        setData({
          title: "",
          content: "",
          
        });
       navigate("/blogs")
      }
    } catch (error) {
      // Handle error more gracefully and display the message from the server response
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Failed to create blog! Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="createBlog">
      {/* Display error message if any */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Title input */}
        <input
          type="text"
          name="title"
          value={data.title}
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <br />

        {/* Content textarea */}
        <textarea
          onChange={handleChange}
          value={data.content}
          name="content"
          placeholder="Content"
          minLength={0}
          maxLength={100}
          required
        ></textarea>
        <br />

        {/* Submit button */}
        <button type="submit" disabled={submitted}>
          {submitted ? "Submitted" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
