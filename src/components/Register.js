  import React, { useState } from 'react';
  import photo from './image2.jpeg';
  import { Link, useNavigate } from "react-router-dom";
  import image from "./image5.jpg";

  const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (name === "" || email === "" || password === "") {
        setErrorMessage("Please fill in all fields.");
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };  

    return (
      <div>
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{backgroundImage: `url(${image})`}}>
          <div className="flex items-center justify-center min-h-screen bg-cover bg-center backdrop-filter backdrop-blur-sm bg-opacity-20 w-full h-full">
            <form name="registrationForm" onSubmit={handleSubmit}>
              <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 mt-20">
                <div className="flex flex-col justify-center p-8 md:p-14">
                  <span className="mb-3 text-4xl font-bold text-cyan-400">REGISTER</span>
                  <div className="py-0">
                    <span className="mb-2 text-md text-cyan-400 font-semibold">Name</span>
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="py-5">
                    <span className="mb-2 text-md text-cyan-400 font-semibold">Email</span>
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="mb-2 text-md text-cyan-400 font-semibold">Password</span>
                    <input
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                    />
                  </div>
                  <br/>
                  {errorMessage && <span className="text-cyan-400 mb-8">{errorMessage}</span>}
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full bg-cyan-400 text-white p-4 rounded-lg mb-6 hover:bg-cyan-500 font-semibold">  
                    REGISTER
                  </button>
                  <p className="font-light text-gray-400 mb-8">
                    If you already have an account, just "LOGIN".
                  </p>
                  <Link to="/login">
                  <button type="button" class="flex items-center justify-center w-full bg-violet-600 text-white p-4 rounded-lg mb-6 hover:bg-violet-700 font-semibold">
                  LOGIN
                </button>
                
                  </Link>
                </div>
                <div className="relative">
                  <img
                    src={photo}
                    alt="img"
                    className=" hidden rounded-r-2xl md:block object-cover h-[700px] w-[650px] "
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
