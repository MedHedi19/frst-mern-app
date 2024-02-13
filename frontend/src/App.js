import { SnackbarProvider } from 'notistack';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddNotes from './pages/AddNotes';
import DeleteNotes from './pages/DeleteNotes';
import EditNotes from './pages/EditNotes';
import ForbidenPage from './pages/ForbidenPage';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFoundPage from './pages/NotFoundPage';
import NotesDetails from './pages/NotesDetails';
import ShowNotes from './pages/ShowNotes';
import SignupPage from './pages/SignupPage';



function App() {
  const user = useSelector(state => state.auth.isAuthenticated);
  return (
    <div className="App">
      <SnackbarProvider>
        <Routes>
          {user ? (
            <>
              <Route path='/ShowNotes' element={<ShowNotes />} />
              <Route path='/AddNotes' element={<AddNotes />} />
              <Route path="/DeleteNotes/:id" element={<DeleteNotes />} />
              <Route path="/EditNotes/:id" element={<EditNotes />} />
              <Route path="/NotesDetails/:id" element={<NotesDetails />} />
              <Route path="/ForbidenPage" element={<ForbidenPage />} />
              <Route path='/' element={<Home />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </>
          )}
        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
