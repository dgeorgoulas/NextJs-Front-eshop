
"use client";
import { useState } from "react";
import axios from "axios"; 
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import { UserContext } from "@/context/AuthContext";
import { useContext } from 'react';
 


const Login = () => {
 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { setUserData } = useContext(UserContext);


  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      
      const response = await axios.post("http://localhost:8080/auth/signin", {
        username,
        password,
        
      });
      console.log(response.data);
      
      const { id, accessToken } = response.data;

      
      setUserData({ id, accessToken });

       router.push("/");
    } catch (error) {
      setError(error);
      console.error("Login failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  };
   const goToRegister = () => {
    router.push('/register'); 
  };

  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg   max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center"> Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm text-center font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-center font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-black rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <button
            onClick={goToRegister}
            className="mt-2 text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>

      
        );
};

export default Login;
