import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function DeleteNotes() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the note ID from the route parameters
  const { enqueueSnackbar } = useSnackbar();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // Fetch the specific note data using the ID
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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      enqueueSnackbar('Note deleted successfully', { variant: 'success' });
      setTimeout(() => {
        navigate('/ShowNotes');
      }, 1000);
    } catch (error) {
      console.error(error.message);
      enqueueSnackbar('Error deleting note', { variant: 'error' });
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto mt-4">
          <BackButton />

          <h1 className="flex justify-center text-3xl font-bold my-4">ARE YOU SURE YOU WANT TO DELETE THIS NOTE??</h1>

          {note && (
            <div>
              <p>
                <strong>Title:</strong> {note.title}
              </p>
              <p>
                <strong>Body:</strong> {note.body}
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Delete Note
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DeleteNotes;
