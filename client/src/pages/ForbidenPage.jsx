import React from "react";
import { Link } from "react-router-dom";

function ForbidenPage() {
  return (
    <div className="bg-purple-800 h-screen p-10">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="text-5xl font-semibold text-red-500" data-content="404">
          403 - ACCESS DENIED
        </div>

        <div className="text-2xl font-bold text-blue-500">
          Oops, You don't have permission to access this page.
        </div>
        <div className="text-base text-center m-6 p-5 text-white">
          A web server may return a 403 Forbidden HTTP status code in response
          to a request from a client for a web page or resource to indicate that
          the server can be reached and understood the request, but refuses to
          take any further action. Status code 403 responses are the result of
          the web server being configured to deny access, for some reason, to
          the requested resource by the client.
        </div>

        <div className="flex ">
          <Link
            className="mx-2 font-semibold border-2 border-red-500  text-red-500  no-underline text-uppercase px-6 py-3 rounded-full transition duration-200 ease-in-out hover:text-white hover:bg-red-500"
            to="/"
          >
            Home
          </Link>
          <Link
            className="mx-2 font-semibold border-2 border-red-500  text-red-500  no-underline text-uppercase px-6 py-3 rounded-full transition duration-200 ease-in-out hover:text-white hover:bg-red-500"
            to="/login"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForbidenPage;
