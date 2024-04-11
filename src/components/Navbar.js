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
            <span className="self-center whitespace-nowrap dark:text-cyan-400 hover:text-violet-700 font-extrabold text-2xl">
            APEX BLOG
          </span>            
          </div>
            <div className="hidden md:block">
              <div className="ml-20 flex items-baseline space-x-4 ">
              <Link to="/home" class="md:px-4 md:py-2 text-violet-700 hover:text-violet-800 font-semibold text-lg">Home</Link>
              <Link to="/about" class="md:px-4 md:py-2 text-cyan-400 hover:text-cyan-500 font-semibold text-lg">About</Link>
              <Link to="/blogs" class="md:px-4 md:py-2 text-cyan-400 hover:text-cyan-500 font-semibold text-lg">Blogs</Link>
              <Link to="/contactUS" class="md:px-4 md:py-2 text-cyan-400 hover:text-cyan-500 font-semibold text-lg">Contact US</Link>
              </div>
            </div>
          </div>
    {!isAuthenticated ? (
          <div className="hidden md:flex">
            <Link to="/login"> 
            <button className="text-gray-600 hover:text-gray-700 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
            <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5 2a1 1 0 00-1 1v3H2a2 2 0 00-2 2v8a2 2 0 002 2h1v3a1 1 0 001 1h2a1 1 0 001-1v-3h6v3a1 1 0 001 1h2a1 1 0 001-1v-3h1a2 2 0 002-2V8a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H5zm1 5v9h8V7H6zm2 2h4v5H8V9z" clip-rule="evenodd" />
                </svg>  
                LOGIN
            </button></Link>
            <Link to="/register">
            <button className="text-gray-600 hover:text-gray-700 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
            <svg
            className="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
            />
            <path
              fillRule="evenodd"
              d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-5a5 5 0 00-5 5h10a5 5 0 00-5-5z"
            />
          </svg>  
          REGISTER
            </button></Link>
          </div>
    ) : (
      <div className="hidden md:flex">
        <button className="text-gray-600 hover:text-gray-800 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
          Button 3
        </button>
        <button className="text-gray-600 hover:text-gray-800 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
          Button 4
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
          <a href="#" className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="#" className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-medium">Service</a>
          <a href="#" className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-medium">About</a>
          <a href="#" className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-medium">Contact</a>
          <a href="#" className="block text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-base font-medium">Blogs</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
