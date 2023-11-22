import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './components/RequireAuth';
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
  return (
    <div className="App">
      <SnackbarProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ShowNotes' element={<RequireAuth><ShowNotes /></RequireAuth>} />
          <Route path='/AddNotes' element={<RequireAuth><AddNotes /></RequireAuth>} />
          <Route path="/DeleteNotes/:id" element={<RequireAuth><DeleteNotes /></RequireAuth>} />
          <Route path="/EditNotes/:id" element={<RequireAuth><EditNotes /></RequireAuth>} />
          <Route path="/NotesDetails/:id" element={<RequireAuth><NotesDetails /></RequireAuth>} />
          <Route path="/ForbidenPage" element={<ForbidenPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </SnackbarProvider>
    </div>
  );
}

export default App;
