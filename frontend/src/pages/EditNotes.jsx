import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function EditNotes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [note, setNote] = useState({});
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/notes/${id}`)
      .then((res) => {
        setNote(res.data.note);
        setTitle(res.data.note.title);
        setBody(res.data.note.body);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleEdit = async () => {
    try {
      const data = {
        title,
        body,
      };

      await axios.put(`http://localhost:3000/notes/${id}`, data);
      enqueueSnackbar('Note edited successfully', { variant: 'success' });
      setTimeout(() => {
        navigate('/ShowNotes');
      }, 1000);
    } catch (error) {
      console.error(error.message);
      enqueueSnackbar('Error editing note', { variant: 'error' });
    }
  };

  // Function to check if any changes were made
  const checkChanges = () => {
    return title !== note.title || body !== note.body;
  };

  // Update the isDirty state when there are changes
  useEffect(() => {
    setIsDirty(checkChanges());
  }, [title, body, note]);

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto mt-4">
          <BackButton />

          <h1 className="flex justify-center text-3xl font-bold my-4">EDIT NOTE</h1>

          <div>
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
              {isDirty ? (
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => {
                    enqueueSnackbar('No changes made.', { variant: 'warning' });
                  }}
                  className="bg-gray-400 cursor-not-allowed text-white font-semibold py-2 px-4 rounded-md"
                  disabled
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditNotes;
