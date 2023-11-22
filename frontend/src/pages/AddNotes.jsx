import axios from "axios";
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function AddNotes() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      body,
    };

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/notes", data).then(() => {
        setLoading(false);
        enqueueSnackbar("Note Created successfully", { variant: "success" });
        setTimeout(() => {
          navigate("/ShowNotes");
        }, 2000);
      });

      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      enqueueSnackbar("Error", { variant: "error" });
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto mt-4">
          <BackButton />

          <h1 className="flex justify-center text-3xl font-bold mb-4">
            ADD NOTE
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-lg font-semibold">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full border rounded-md p-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="body" className="block text-lg font-semibold">
                Body
              </label>
              <textarea
                id="body"
                className="w-full border rounded-md p-2"
                rows="4"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
              >
                Add Note
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddNotes;
