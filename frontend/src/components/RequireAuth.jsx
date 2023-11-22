import React, { useEffect } from "react";
import authStore from "../store/authStore";
import { Navigate } from "react-router-dom";

function RequireAuth(props) {
  const store = authStore();
  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  }, []);
  if (store.loggedIn === null) {
    return <div>Loading</div>;
  }

  if (store.loggedIn === false) {
    return <Navigate to="/ForbidenPage" />;
  }

  return <div>{props.children}</div>;
}

export default RequireAuth;
