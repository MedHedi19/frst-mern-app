import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../store/authAction";
import { setAuth } from "../store/authReducer";

function LogoutPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch()

  const logout = async () => {
    try {
      await axios.get("http://localhost:3000/logout")
      dispatch(setAuth(LOGOUT()));

    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    }
  }
  useEffect(() => {
    logout();
    enqueueSnackbar("logged out", { variant: "success" });
  }, []);
  setTimeout(() => {
    navigate("/");
  }, 2000);
  return <></>;
}

export default LogoutPage;
