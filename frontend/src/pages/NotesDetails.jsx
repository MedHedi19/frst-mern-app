import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function NotesDetails() {
  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    navigate(`/DeleteNotes/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/EditNotes/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/notes/${id}`)
      .then((res) => {
        setNote(res.data.note);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="m-10">
          <BackButton />
          <div className="flex justify-center items-center">
            <div className="max-w-sm min-w-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="p-5">
                <h5 className="flex justify-center items-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {note.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {note.body}
                </p>
                <div className="flex justify-center items-center">
                  <Button
                    color="blue-500"
                    hoverColor="blue-700"
                    name="Delete"
                    onClick={() => handleDelete(id)}
                  />
                  <Button
                    color="blue-500"
                    hoverColor="blue-700"
                    name="Edit"
                    onClick={() => handleEdit(id)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesDetails;
