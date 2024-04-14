import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Actions/login_Type";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <nav className="bg-white shadow fixed w-full top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
            <Link to="/">
            <span className="self-center whitespace-nowrap dark:text-cyan-400 hover:text-violet-700 font-extrabold text-2xl">
            APEX BLOG
          </span></Link>            
          </div>
            <div className="hidden md:block">
              <div className="ml-20 flex items-baseline space-x-4 ">
              <Link to="/home" class="md:px-4 md:py-2 text-violet-700 hover:text-cyan-500 font-semibold text-lg">Home</Link>
              <Link to="/about" class="md:px-4 md:py-2 text-violet-700 hover:text-cyan-500 font-semibold text-lg">About</Link>
              <Link to="/blogs" class="md:px-4 md:py-2 text-violet-700 hover:text-cyan-500 font-semibold text-lg">Blogs</Link>
              <Link to="/contactUS" class="md:px-4 md:py-2 text-violet-700 hover:text-cyan-500 font-semibold text-lg">Contact US</Link>
              </div>
            </div>
          </div>
    {!isAuthenticated ? (
      <div className="hidden md:flex">
      <Link to="/login">
        <button className="bg-violet-700 hover:bg-violet-800 text-white font-bold selection:inline-flex items-center justify-center p-2 rounded-md focus:outline-none w-[100px]">
          LOGIN
        </button>
      </Link>
      <Link to="/register">
        <button className="bg-cyan-500  hover:bg-cyan-600 text-white font-bold inline-flex items-center justify-center p-2 rounded-md focus:outline-none ml-2 w-[100px]">
          REGISTER
        </button>
      </Link>
    </div>
    
    ) : (
      <div className="hidden md:flex space-x-2">
  <Link to="/myblogs">
    <button className="bg-violet-700 hover:bg-violet-800 text-white font-bold inline-flex items-center justify-center p-2 rounded-md focus:outline-none w-[100px]">
      MY BLOGS
    </button>
  </Link>
  <Link to="/createblog">
  <button className="bg-violet-700 hover:bg-violet-800 text-white font-bold inline-flex items-center justify-center p-2 rounded-md focus:outline-none w-[100px]">
    ADD BLOG
  </button></Link>
  <button onClick={handleLogout} className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold inline-flex items-center justify-center p-2 rounded-md focus:outline-none w-[100px]">
    LOGOUT
  </button>
</div>

    )}
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
              {menuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${menuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link to="/home" className="block text-violet-700 hover:text-cyan-500 px-3 py-2 rounded-md text-base font-medium">Home</Link>
        <Link to="/about" className="block text-violet-700 hover:text-cyan-500 px-3 py-2 rounded-md text-base font-medium">About</Link>
        <Link to="/blogs" className="block text-violet-700 hover:text-cyan-500 px-3 py-2 rounded-md text-base font-medium">Blogs</Link>
        <Link to="/contactUS" className="block text-violet-700 hover:text-cyan-500 px-3 py-2 rounded-md text-base font-medium">Contact US</Link>

        </div>    
      </div>
    </nav>
  );
};

export default Navbar;
