import React from "react";
import "./BackButton.css";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    window.history.back();
  };
  const HomePage = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-between max-w-screen-xl mx-auto p-5">
      <button className="button-53" role="button" onClick={goBack}>
        🡸 Previous Page
      </button>
      <button className="button-53" role="button" onClick={HomePage}>
        Home Page
      </button>
    </div>
  );
}

export default BackButton;
