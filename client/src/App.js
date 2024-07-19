import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Userprofile from './pages/Userprofile';
import Profilepage from './pages/Profilepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofile" element={<Userprofile />} /> 
        <Route path="/profilepage" element={<Profilepage />} /> 

      </Routes>
    </Router>
  );
}

export default App;
