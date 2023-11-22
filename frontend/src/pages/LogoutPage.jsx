import React, { useEffect } from "react";
import authStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function LogoutPage() {
  const navigate = useNavigate();
  const store = authStore();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    store.logout();
    enqueueSnackbar("logged out", { variant: "success" });
  }, []);
  setTimeout(() => {
    navigate("/");
  }, 2000);
  return <></>;
}

export default LogoutPage;
