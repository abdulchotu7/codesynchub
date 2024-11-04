import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Send from './pages/Send';
import Display from './pages/Display'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/send" element={<Send />} />
        <Route path="/display" element={<Display />} />

      </Routes>
    </Router>
  );
};

export default App;
