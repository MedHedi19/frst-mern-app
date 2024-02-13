import axios from "axios";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

function ShowNotes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleDelete = (id) => {
    navigate(`/DeleteNotes/${id}`);
  };
  const handleAdd = () => {
    navigate(`/AddNotes`);
  };

  const handleEdit = (id) => {
    navigate(`/EditNotes/${id}`);
  };
  const handleShow = (id) => {
    navigate(`/NotesDetails/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/notes")
      .then((res) => {
        setNotes(res.data.notes);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto mt-4">
          <BackButton />

          <h1 className="flex justify-center text-3xl font-bold mb-4">
            OUR NOTES
          </h1>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">TITLE</th>
                <th className="px-4 py-2">BODY</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {notes.map((item, index) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{item.title}</td>
                  <td className="border px-4 py-2">{item.body}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center">
                      <Button
                        color="blue-500"
                        hoverColor="blue-700"
                        name="Delete"
                        onClick={() => handleDelete(item._id)}
                      />
                      <Button
                        color="blue-500"
                        hoverColor="blue-700"
                        name="Add"
                        onClick={handleAdd}
                      />
                      <Button
                        color="blue-500"
                        hoverColor="blue-700"
                        name="Edit"
                        onClick={() => handleEdit(item._id)}
                      />
                      <Button
                        color="blue-500"
                        hoverColor="blue-700"
                        name="Show"
                        onClick={() => handleShow(item._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ShowNotes;
