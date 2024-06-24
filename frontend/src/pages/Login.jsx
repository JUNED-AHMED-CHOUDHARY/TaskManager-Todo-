import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";

const Login = ({ isAuthenticated, setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    await axios
      .post(
        "http://localhost:4000/api/v1/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setEmail("");
        setPassword("");
        setIsAuthenticated(true);
        toast.success(res.data.message);
      })
      .catch((err) => {toast.error(err.response.data.message)});
  };


  if (isAuthenticated) {
    return <Navigate to={"/"}/>
  }

  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="flex flex-col gap-6 bg-cyan-100 h-fit p-6 rounded-lg shadow-lg">
        <label className="flex gap-5 items-center">
          <p className="text-xl font-medium">Enter email :</p>
          <input
            type="text"
            placeholder="abc@gmail.com"
            className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            name="email"
            value={email}
            onChange={emailHandler}
          />
        </label>

        <label className="flex gap-5 items-center">
          <p className="text-xl font-medium">Enter password :</p>
          <input
            type="password"
            placeholder="eg:- 123456"
            className="rounded-md py-3 px-4 bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            name="password"
            value={password}
            onChange={passwordHandler}
          />
        </label>

        <div className="flex gap-3 items-center font-bold">
          <p className="text-gray-700">Not registered ?</p>
          <Link to={"/signup"} className="underline text-blue-800 underline-offset-4">Signup</Link>
        </div>

        <button
          className="bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 font-medium text-xl"
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
