import React from 'react';
import Navbar from './components/Navbar';
import Blogs from "./components/Blogs";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import MyBlogs from "./components/MyBlogs";
import Footer from './components/Footer'
import About from './components/About'
import ContactUs from './components/ContactUs'
import CreateBlog from './components/CreateBlog';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/about" element={<About />}/>
    <Route path="/register" element={<Register />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/blogs" element={<Blogs />}/>
    <Route path="/home" element={<Home />}/>
    <Route path="/" element={<Home />}/>
    <Route path="/myblogs" element={<MyBlogs />}/>
    <Route path="/contactus" element={<ContactUs />}/>
    <Route path="/createblog" element={<CreateBlog />}/>
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;
