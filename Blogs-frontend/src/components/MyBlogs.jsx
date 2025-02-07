import axios from "axios";
import React, { useState, useEffect } from "react";

const MyBlogs = () => {
  
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    console.log(username)
    try {
      let response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/myBlog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setData(response.data);
      }
    } catch (err) {
      setError("Error fetching your blogs");
      console.error("Error:", err);
    }
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      let response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/blogs/delete/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setData(data.filter((blog) => blog._id !== blogId));
      }
    } catch (err) {
      setError("Error deleting the blog");
      console.error("Error:", err);
    }
  };

  const username = localStorage.getItem("username")
  return (
    <div>
      <div>
      <h2>My Blogs</h2>
      <h2>Welcome {username}!</h2>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data.length > 0 ? (
        data.map((blog) => (
          <div key={blog._id} style={{ border: "1px solid #ddd", padding: "15px", margin: "10px 0", borderRadius: "8px" }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>

            {/* Display the actual blog's creation time */}
            <p>Post time: {new Date(blog.createdAt).toLocaleString()}</p>

            <button onClick={() => handleDelete(blog._id)} style={{ background: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px" }}>
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
};

export default MyBlogs;
