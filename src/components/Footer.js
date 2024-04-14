import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/Actions/login_Type";

const Footer = () => {

  return (
    

<footer class="bg-white rounded-2xl shadow-xl m-4 dark:bg-cyan-400">
<div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
  <span class=" text-white text-lg font-semibold">© 2023 <a>APEX BLOG</a> .
</span>
<ul class="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
    <li>
        <Link to="/Home" class=" me-4 md:me-6 text-white">Home</Link>
    </li>
    <li>
    <Link to="/About" class=" me-4 md:me-6 text-white">About</Link>
    </li>
    <li>
    <Link to="/blogs" class=" me-4 md:me-6 text-white">Blogs</Link>
    </li>
    <li>
    <Link to="/contactus" class=" text-white">Contact US</Link>
    </li>
</ul>
</div>
</footer>

  );
};

export default Footer;
