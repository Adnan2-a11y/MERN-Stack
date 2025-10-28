import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from 'mdb-react-ui-kit';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Homepage from './components/homepage/Homepage.jsx';
import AuthTabs from './components/Auth/AuthTabs.jsx';
import './styles/Auth.css';



const App = () => {
  return (
    <Router>
      <Routes>
        {/* 🏠 Homepage */}
        <Route path="/" element={<Homepage />} />
        <Route path="/account/login" element={<Login />} />
        <Route path="/account/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;