import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Blog.css";

const Blogs = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  // Fetch data when the component mounts
  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);

      if (response.status === 200) {
        setData(response.data);
      } else {
        setError("Failed to fetch the blogs! Please try again later.");
      }
    } catch (error) {
      setError("Failed to fetch blogs! Please try again later.");
    }
  };

  console.log(data);
  return (
    <div>
      {/* Display error if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Check if blogs data is available */}
      {data.length > 0 ? (
        // Render the list of blogs if data is available
        data.map((ele, index) => (
          <>
          <div key={index} className="Blogs">
            <h1>{ele.title}</h1>
            
            <p>{ele.content}</p>
            <p>Posted By: {ele.author ? ele.author.username : "Unknown"}</p>
            <p>Published On: 22/10/24</p>
          </div>
          </>
        ))
      ) : (
        // If no blogs are available, show this message
        <p>No blogs available at the moment.</p>
      )}
    </div>
  );
};

export default Blogs;
