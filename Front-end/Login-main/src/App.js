import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./page/Login";
import CadastroWho from "./page/CadastroWho";
import Espectador from "./page/Espectador";
import Artista from "./page/Artista";
import Evento from "./page/Evento";
import Evento_show from "./page/Evento_show";
import Inicio from "./page/Inicio";
import LoginWho from "./page/LoginWho";
import Login2 from "./page/Login2";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginWho />} />
        <Route exact path="login/" element={<Login />} />
        <Route exact path="/login2" element={<Login2 />} />
        <Route exact path="/cadastro" element={<CadastroWho />} />
        <Route exact path="/espectador" element={<Espectador />} />
        <Route exact path="/artista" element={<Artista />} />
        <Route exact path="/evento" element={<Evento />} />
        <Route exact path="/evento_show" element={<Evento_show />} />
        <Route exact path="/inicio" element={<Inicio />} />
      </Routes>
    </Router>
  );
}

export default App;
