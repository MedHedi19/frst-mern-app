import React from "react";
import { Link } from "react-router-dom";
import authStore from "../store/authStore.js";
function Home() {
  const store = authStore();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Home</h1>
      <p className="mb-4">Welcome to the Home page.</p>
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-5 py-2 px-4 rounded mb-2">
          <Link to="/ShowNotes">Show Data</Link>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-5 py-2 px-4 rounded mb-2">
          <Link to="/AddNotes">Add Data</Link>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-5 py-2 px-4 rounded">
          <Link to={store.loggedIn === true ? "/logout" : "/login"}>
            {store.loggedIn === true ? "logout" : "login"}
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
