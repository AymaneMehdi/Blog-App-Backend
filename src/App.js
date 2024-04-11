import React from 'react';
import Navbar from './components/Navbar';
import Blogs from "./components/Blogs";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/register" element={<Register />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/blogs" element={<Blogs />}/>
    <Route path="/home" element={<Home />}/>
    <Route path="/" element={<Home />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
