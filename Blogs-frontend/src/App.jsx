import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateBlog from "./components/CreateBlog";
import Navbar from "./Navbar/Navbar";
import PrivateRouter from "./components/PrivateRouter";
import MyBlogs from "./components/MyBlogs";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/createBlog"
              element={
                <PrivateRouter>
                  <CreateBlog />
                </PrivateRouter>
              }
            />
            <Route
              path="/my-blogs"
              element={
                <PrivateRouter>
                  <MyBlogs />
                </PrivateRouter>
              }
            />
            
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
