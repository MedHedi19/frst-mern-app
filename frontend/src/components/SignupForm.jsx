import React from "react";
import authStore from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function SignupForm() {
  const store = authStore();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await store.signup();
      if (result.status === 200) {
        enqueueSnackbar("Signued Up successfully", { variant: "success" });
        navigate("/login");
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
          onSubmit={handleSignup}
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Signup
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Email</label>
            <input
              className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              onChange={store.updateSignupForm}
              value={store.signupForm.email}
              name="email"
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <label>Password</label>
            <input
              className="p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              onChange={store.updateSignupForm}
              value={store.signupForm.password}
              type="password"
              name="password"
            />
          </div>
          <div className="flex justify-between text-gray-400 hover:text-teal-500 py-2">
            <Link to="/login">Already Have An Account?</Link>
          </div>
          <button
            className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            type="submit"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
