      import React, { useState } from 'react';
      import { useDispatch, useSelector } from 'react-redux';
      import photo from './image1.png';
      import { Link } from "react-router-dom";
      import { useNavigate } from 'react-router-dom';
      import { loginFailure } from '../redux/Actions/login_Type';
      import { loginSuccess } from '../redux/Actions/login_Type';
      import { fetchUserSuccess } from '../redux/Actions/login_Type';
      import image from "./image5.jpg";

      const Login = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const dispatch = useDispatch();
        const navigate = useNavigate(); 
        const [errorMessage, setErrorMessage] = useState(""); 

        const handleSubmit = async (e) => {
          e.preventDefault();  
          try {
            const response = await fetch("http://localhost:8000/login", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
            });
            const data = await response.json();
        
            if (!response.ok) {
              throw new Error(data.message); 
            } else {
              dispatch(loginSuccess(data.token));
              try {
                const token = data.token;
                const response = await fetch('http://localhost:8000/user/getOneUser', {
                  method: 'GET',
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                });
              
                if (!response.ok) {
                  throw new Error("Failed to fetch user data");
                }
              
                const userData = await response.json();
                dispatch(fetchUserSuccess(userData));
              
              } catch (error) {
                console.error('Error fetching user data:', error);
              }
              navigate("/");  
            }
          } catch (error) {
            setErrorMessage("Invalid Email or Incorrect Password."); 
            dispatch(loginFailure(error.message)); 
          }
        };
        


        return (
          <div>
          <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${image})`}}>
          <div className="flex items-center justify-center min-h-screen bg-cover bg-center backdrop-filter backdrop-blur-sm bg-opacity-20 w-full h-full">
          <form onSubmit={handleSubmit}>
          <div
            class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 mt-32"
          >
            <div class="flex flex-col justify-center p-8 md:p-11 ">
              <span class="mb-3 text-4xl font-bold text-violet-600">LOGIN</span>

              <div class="py-0">
                <span class="mb-2 text-md text-violet-600 font-semibold" >Email</span>
                <input
                  class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div class="py-5">
                <span class="mb-2 text-md text-violet-600 font-semibold">Password</span>
                <input
                  class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
              {errorMessage && <span className="text-violet-600 mb-8">{errorMessage}</span>}
              <button class="flex items-center justify-center w-full bg-violet-600 text-white p-4 rounded-lg mb-6 hover:bg-violet-700 font-semibold">
    <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5 2a1 1 0 00-1 1v3H2a2 2 0 00-2 2v8a2 2 0 002 2h1v3a1 1 0 001 1h2a1 1 0 001-1v-3h6v3a1 1 0 001 1h2a1 1 0 001-1v-3h1a2 2 0 002-2V8a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H5zm1 5v9h8V7H6zm2 2h4v5H8V9z" clip-rule="evenodd" />
    </svg>
    LOGIN
  </button>
              <p class="font-light text-gray-400 mb-8">
              If you are not registered yet, click "REGISTER".
              </p>
              <Link to="/register">
              <button
              type="button"
              className="flex items-center justify-center w-full bg-cyan-400 text-white p-4 rounded-lg mb-6 hover:bg-cyan-500 font-semibold"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
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
            </button>
              </Link>
            </div>
            <div class="relative">
              <img
                src={photo}
                alt="img"
                class=" hidden rounded-r-2xl md:block object-cover h-[700px] w-[650px] "
              />
            </div>
          </div>  
          </form>
          </div>
        </div>
        </div>
        );
      };

      export default Login;