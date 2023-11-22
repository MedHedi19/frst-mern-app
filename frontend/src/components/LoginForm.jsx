import React from "react";
import authStore from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function LoginForm() {
  const store = authStore();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await store.login();
      if (result.status === 200) {
        enqueueSnackbar("Logged in successfully", { variant: "success" });
        navigate("/");
      }
    } catch (err) {
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
              onChange={store.updateLoginForm}
              value={store.loginForm.email}
              name="email"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              onChange={store.updateLoginForm}
              value={store.loginForm.password}
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
