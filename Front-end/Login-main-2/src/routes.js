import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Espectador from './page/Espectador';
import Artista from './page/Artista';
import Home from './page/Home';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/home" element={<Home />}/>
        <Route exact path="/espectador" element={<Espectador />}/>
        <Route exact path="/artista" element={<Artista />}/>
      </Routes>
    </Router>
  );
}

export default AppRoutes;