import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginFailure, loginRequest, loginSuccess } from "../store/authAction";
import { setAuth } from "../store/authReducer";
import authStore from "../store/authStore";

function LoginForm() {
  const store = authStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch()
  const loginForm = {
    email,
    password
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setAuth(loginRequest()));
    try {
      const result = await axios.post("http://localhost:3000/login", loginForm, {
        withCredentials: true,
      });
      if (result.status === 200) {
        enqueueSnackbar("Logged in successfully", { variant: "success" });
        dispatch(setAuth(loginSuccess(loginForm)));
        navigate("/");
      }
    } catch (err) {
      dispatch(setAuth(loginFailure(err.message)));
      console.log(err.message);
      enqueueSnackbar("Error", { variant: "error" });
    }
  };
  return (
    <div className="grid grid-cols-1  h-screen w-full">
      <div className=" flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8"
          onSubmit={handleLogin}
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Login
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              onChange={(e) => { setEmail(e.target.value) }}
              value={email}
              type="email"
              name="email"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              onChange={(e) => { setPassword(e.target.value) }}
              value={password}
              type="password"
              name="password"
            />
          </div>
          <div className="flex justify-between text-gray-400 hover:text-teal-500 py-2">
            <Link to="/signup">Create An Account</Link>
          </div>
          <button
            className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
